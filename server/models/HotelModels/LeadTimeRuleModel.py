from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from relational_functions.one_to_many import one_to_many_fk, one_to_many_rltshp, one_to_many_back_populates

from functions.serialize_relations import serialize_relations

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

    # hotel = db.relationship("HotelModel", back_populates="lead_times")
    hotel = one_to_many_back_populates("HotelModel", "lead_times", False)


    room_id = one_to_many_fk("rooms", True)
    # room = one_to_many_rltshp("RoomModel", "lead_times")
    room = one_to_many_back_populates("RoomModel", "lead_times", False)

    serialize_rules = (
        serialize_relations("hotel", ["lead_times", "rooms", "discounts"]) + 
        serialize_relations("room", ["lead_times", "hotel", "discounts"])
    )

