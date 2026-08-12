from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from relational_functions.one_to_many import one_to_many_fk, one_to_many_rltshp

class LeadTimeRuleModel(db.Model, SerializerMixin):
    """
    This model is used to determine discounts or premiums based on when the user makes a booking 
    If for example a user books 2 days before their stay they receive a premium charge 
    If they book 3 months in advance the cost is 5% less than premium
    """
    __tablename__ = "lead_time_rules"

    id = db.Column(db.Integer, primary_key = True)
    min_days = db.Column(db.Integer, nullable = False)
    max_days = db.Column(db.Integer, nullable = True)
    multiplier = db.Column(db.Integer, nullable = False)
    label = db.Column(db.String, nullable = False)

    hotel_id = one_to_many_fk("hotels", False)
    hotel = one_to_many_rltshp("HotelModel", "lead_times")

    room_id = one_to_many_fk("rooms", True)
    room = one_to_many_rltshp("RoomModel", "lead_times")

    serialize_rules = (
        "-hotel.lead_times",
        "-hotel.rooms",
        "-hotel.discounts",

        "-room.lead_times",
        "-room.hotel",
        "-room.discounts",
    )

