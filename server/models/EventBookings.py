from sqlalchemy_serializer import SerializerMixin
from config import db 

import uuid

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

class EventBookingModel(db.Model, SerializerMixin):
    __tablename__ = "event_bookings"

    id = db.Column(db.Integer, primary_key = True)
    booking_ref = db.Column(db.String, unique = True, nullable = False,
                            default = lambda: f"WE-{uuid.uuid4().hex[:6].upper()}")
    name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    no_of_people = db.Column(db.Integer, nullable = False)

    event_id = one_to_many_fk("events", True)
    event = one_to_many_back_populates("EventModel", "bookings", delete_orphan=False)