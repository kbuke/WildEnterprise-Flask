from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from datetime import date

from config import db 

from relational_functions.one_to_many import one_to_many_rltshp, one_to_many_fk

from functions.validate_dates import make_date_range_validators
from functions.serialize_relations import serialize_relations

from relational_functions.one_to_many import one_to_many_fk, one_to_many_rltshp

class RoomRateModel(db.Model, SerializerMixin):
    """
    Set rates for specific room for things like summer (where the rate may be more expensive) or winter (where it may be cheaper)
    """
    __tablename__ = "room_rates"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date, nullable = False)
    modifier_type = db.Column(db.String, nullable = False)
    value = db.Column(db.Float, nullable = False) # 0.2 means 20% off, 1.1 means 10% increase
    priority = db.Column(db.Integer, nullable = False, default = 0)

    room_id = one_to_many_fk("rooms")
    # room = one_to_many_rltshp("RoomModel", "rates")
    room = db.relationship("RoomModel", back_populates = "room_rates")

    serialize_rules = (
        serialize_relations("room", ["rates", "hotel", "discounts", "lead_times", "room_bookings", "room_rates"])
    )

    validate_start_date, validate_end_date = make_date_range_validators(
        "start_date", "end_date"
    )

    validate_start_date = validates("start_date")(validate_start_date)
    validate_end_date = validates("end_date")(validate_end_date)