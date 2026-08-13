# models/RoomHoldModel.py
from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta

from relational_functions.one_to_many import one_to_many_fk

class RoomHoldModel(db.Model, SerializerMixin):
    __tablename__ = "room_holds"

    id = db.Column(db.Integer, primary_key=True)
    room_id = one_to_many_fk("rooms")
    quantity = db.Column(db.Integer, nullable=False, default=1)
    arrival_date = db.Column(db.Date, nullable=False)
    departure_date = db.Column(db.Date, nullable=False)
    session_token = db.Column(db.String, nullable=False)  # identifies which browser session holds it
    expires_at = db.Column(db.DateTime, nullable=False,
                            default=lambda: datetime.utcnow() + timedelta(minutes=10))

    room = db.relationship("RoomModel")