from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.serialize_relations import serialize_relations

from functions.validate_email import validate_email


class ReviewModel(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    title = db.Column(db.String(20), nullable = True)
    review = db.Column(db.String(200), nullable = True)
    email = db.Column(db.String, nullable = False)

    hotel_id = one_to_many_fk("hotels")
    hotel = one_to_many_back_populates("HotelModel", "reviews", False)

    # ensure one review per booking
    booking_id = db.Column(db.ForeignKey("bookings.id"), nullable = False, unique = True)
    booking = db.relationship("BookingModel")

    @validates("rating")
    def validate_rating_range(self, key, value):
        if value < 1 or value > 5:
            return {"error": "Rating can not be lower than 1, or higher than 5"}
        return value

    @validates("email")
    def validate_email(self, key, value):
        return validate_email(value)
        
    serialize_rules = (
        serialize_relations("hotel", ["reviews", "rooms", "discounts", "lead_times"]) +
        serialize_relations("booking", ["room_bookings"])
    )