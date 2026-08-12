import re

from config import db, bcrypt

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from functions.validate_slug import validate_slug
from functions.validate_email import validate_email
from functions.serialize_relations import serialize_relations

from relational_functions.one_to_many import one_to_many_back_populates

class HotelModel(db.Model, SerializerMixin):
    __tablename__ = "hotels"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    slug = db.Column(db.String)
    location = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False, unique = True)
    info = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False, unique = True)
    _password_hash = db.Column("password_hash", db.String, nullable = False)

    rooms = one_to_many_back_populates("RoomModel", "hotel")
    discounts = one_to_many_back_populates("DiscountModel", "hotel")
    lead_times = one_to_many_back_populates("LeadTimeRuleModel", "hotel")

    serialize_rules = (
        serialize_relations("_password_hash") +
        serialize_relations("rooms", ["hotel", "discounts", "lead_times"]) +
        serialize_relations("discounts", ["hotel", "room"]) +
        serialize_relations("lead_times", ["hotel", "room"])
    )

    @validates("slug")
    def validate_slug(self, key, value):
        return validate_slug(value)

    @validates("email")
    def validate_email(self, key, value):
        return validate_email(value)

    @property
    def password_hash(self):
        raise AttributeError("password_hash is not directly readable")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)