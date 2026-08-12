from config import db

from datetime import date, timedelta

from models.HotelModels.RoomRateModel import RoomRateModel
from models.HotelModels.LeadTimeRuleModel import LeadTimeRuleModel
from models.HotelModels.DiscountModel import DiscountModel

# Calculate nightly rate
def get_nightly_rate(room, target_date):
    price = room.base_price
    rates = (
        RoomRateModel.query.filter(
            RoomRateModel.room_id == room.id,
            RoomRateModel.start_date <= target_date,
            RoomRateModel.end_date >= target_date
        )
        .order_by(RoomRateModel.priority.asc())
        .all()
    )
    for rate in rates:
        price = rate.value if rate.modifier_type == "fixed" else price * rate.value
    return price

# Calculate any charges/discounts based on timing of stay
def lead_time_multiplier(arrival_date, booking_date = None):
    booking_date = booking_date or date.today()
    lead_days = (arrival_date - booking_date).days

    rule = LeadTimeRuleModel.query.filter(
        LeadTimeRuleModel.min_days <= lead_days,
        db.or_(
            LeadTimeRuleModel.max_days.is_(None),
            LeadTimeRuleModel.max_days >= lead_days
        )
    ).first()

    return rule.multiplier if rule else 1.0

# Calculate any discounts through sales
def get_applicable_discount(room, arrival_date, booking_date=None, code=None):
    booking_date = booking_date or date.today()

    query = DiscountModel.query.filter(
        db.or_(DiscountModel.room_id == room.id, DiscountModel.room_id.is_(None)),
        db.or_(DiscountModel.hotel_id == room.hotel_id, DiscountModel.hotel_id.is_(None)),
        # booking window: only enforced if both bounds are set
        db.or_(DiscountModel.booking_start_date.is_(None), DiscountModel.booking_start_date <= booking_date),
        db.or_(DiscountModel.booking_end_date.is_(None), DiscountModel.booking_end_date >= booking_date),
        # stay window: only enforced if both bounds are set
        db.or_(DiscountModel.stay_start_date.is_(None), DiscountModel.stay_start_date <= arrival_date),
        db.or_(DiscountModel.stay_end_date.is_(None), DiscountModel.stay_end_date >= arrival_date),
    )

    if code:
        query = query.filter(DiscountModel.code == code)
    else:
        query = query.filter(DiscountModel.code.is_(None))

    discounts = query.all()
    return max(discounts, key=lambda d: d.percentage_off, default=None)

   
def price_stay(room, arrival_date, departure_date, booking_date=None, discount_code=None):
    nights = (departure_date - arrival_date).days
    if nights <= 0:
        raise ValueError("departure_date must be after arrival_date")

    base_total = sum(
        get_nightly_rate(room, arrival_date + timedelta(days=n))
        for n in range(nights)
    )

    surge = lead_time_multiplier(arrival_date, booking_date)
    total = base_total * surge

    discount = get_applicable_discount(room, arrival_date, booking_date, discount_code)
    if discount:
        total *= (1 - discount.percentage_off)

    return round(total, 2)