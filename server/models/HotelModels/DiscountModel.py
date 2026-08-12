from sqlalchemy.orm import validates
from functions.validate_dates import make_date_range_validators
from config import db 
from sqlalchemy_serializer import SerializerMixin
from relational_functions.one_to_many import one_to_many_rltshp, one_to_many_fk

class DiscountModel(db.Model, SerializerMixin):
    __tablename__ = "discounts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    code = db.Column(db.String, nullable=True, unique=True)
    percentage_off = db.Column(db.Float, nullable=False)

    booking_start_date = db.Column(db.Date, nullable=True)
    booking_end_date = db.Column(db.Date, nullable=True)
    stay_start_date = db.Column(db.Date, nullable=True)
    stay_end_date = db.Column(db.Date, nullable=True)

    hotel_id = one_to_many_fk("hotels", False)
    hotel = one_to_many_rltshp("HotelModel", "discounts")

    room_id = one_to_many_fk("rooms", True)
    room = one_to_many_rltshp("RoomModel", "discounts")

    validate_booking_start_date, validate_booking_end_date = make_date_range_validators(
        "booking_start_date", "booking_end_date"
    )
    validate_booking_start_date = validates("booking_start_date")(validate_booking_start_date)
    validate_booking_end_date = validates("booking_end_date")(validate_booking_end_date)

    validate_stay_start_date, validate_stay_end_date = make_date_range_validators(
        "stay_start_date", "stay_end_date"
    )
    validate_stay_start_date = validates("stay_start_date")(validate_stay_start_date)
    validate_stay_end_date = validates("stay_end_date")(validate_stay_end_date)

    serialize_rules = (
        "-hotel.discounts",
        "-hotel.rooms",
        "-room.discounts",
        "-room.hotel",
    )