from config import db

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from functions.str_to_int import str_to_number
from functions.serialize_relations import serialize_relations

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

class RoomModel(db.Model, SerializerMixin):
    """
    This model is for rooms. This model has a OTM relationship with the Hotel Model.
    A hotel can have many types of rooms, and a type of room belongs to one hotel.
    """

    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False, unique = True)
    no_of_rooms = db.Column(db.Integer, nullable = False) # how many of the specific room does this hotel have
    max_people = db.Column(db.Integer, nullable = False)
    base_price = db.Column(db.Float, nullable = False)

    hotel_id = one_to_many_fk("hotels")
    hotel = one_to_many_back_populates("HotelModel", "rooms", False)

    room_bookings = one_to_many_back_populates("RoomBookingModel", "room", False)

    room_rates = one_to_many_back_populates("RoomRateModel", "room")
    lead_times = one_to_many_back_populates("LeadTimeRuleModel", "room")
    discounts = one_to_many_back_populates("DiscountModel", "room", delete_orphan=False)

    @validates("no_of_rooms")
    def validate_room_numbers(self, key, value):
        return str_to_number(value, "int")

    @validates("max_people")
    def validate_number_of_people(self, key, value):
        return str_to_number(value, "int")

    @validates("base_price")
    def validate_room_price(self, key, value):
        return str_to_number(value, "Float")

    serialize_rules = (
        serialize_relations("hotel", ["rooms", "discounts", "lead_times", "reviews"]) +
        serialize_relations("discounts", ["room", "hotel"]) +
        serialize_relations("lead_times", ["hotel", "room"]) + 
        serialize_relations("room_bookings", ["room"])
    )
