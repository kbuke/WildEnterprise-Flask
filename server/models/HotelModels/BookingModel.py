from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import date, timedelta

from config import db

from functions.serialize_relations import serialize_relations

import uuid # use this to generate a random booking reference

from functions import validate_email

from datetime import date, timedelta

from relational_functions.one_to_many import one_to_many_back_populates

from functions.validate_email import validate_email


def calculate_deposit_date(context):
    arrival = context.get_current_parameters()["arrival_date"]
    two_weeks_before = arrival - timedelta(weeks=2)
    today = date.today()
    return two_weeks_before if two_weeks_before > today else today


def calculate_remainder_date(context):
    return context.get_current_parameters()["arrival_date"]


class BookingModel(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    booking_ref = db.Column(db.String, unique=True, nullable=False,
                             default=lambda: f"WE-{uuid.uuid4().hex[:8].upper()}")
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    arrival_date = db.Column(db.Date, nullable=False)
    departure_date = db.Column(db.Date, nullable=False)
    date_of_deposit_charge = db.Column(db.Date, nullable=False, default=calculate_deposit_date)
    date_of_remainder_charge = db.Column(db.Date, nullable=False, default=calculate_remainder_date)

    room_bookings = one_to_many_back_populates("RoomBookingModel", "booking")

    serialize_rules = serialize_relations("room_bookings", ["booking", "room"])

    @validates("email")
    def validate_email(self, key, value):
        return validate_email(value)

    @validates("arrival_date", "departure_date")
    def validate_booking_dates(self, key, value):
        if key == "arrival_date":
            if value < date.today():
                raise ValueError("You can not book a trip in the past")
        elif key == "departure_date":
            if self.arrival_date and value <= self.arrival_date:
                raise ValueError("Departure date must be after arrival date")
        return value