from models.HotelModels.DiscountModel import DiscountModel
from config import db

from datetime import date

def get_applicable_discount(room, arrival_date, booking_date=None, code=None):
    booking_date = booking_date or date.today()

    query = DiscountModel.query.filter(
        db.or_(
            DiscountModel.room_id == room.id,                                          # room-specific
            db.and_(DiscountModel.room_id.is_(None), DiscountModel.hotel_id == room.hotel_id),  # hotel-wide
        ),
        db.or_(DiscountModel.booking_start_date.is_(None), DiscountModel.booking_start_date <= booking_date),
        db.or_(DiscountModel.booking_end_date.is_(None), DiscountModel.booking_end_date >= booking_date),
        db.or_(DiscountModel.stay_start_date.is_(None), DiscountModel.stay_start_date <= arrival_date),
        db.or_(DiscountModel.stay_end_date.is_(None), DiscountModel.stay_end_date >= arrival_date),
    )

    if code:
        query = query.filter(DiscountModel.code == code)
    else:
        query = query.filter(DiscountModel.code.is_(None))

    discounts = query.all()
    return max(discounts, key=lambda d: d.percentage_off, default=None)