import re

from config import db, bcrypt

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from functions.validate_slug import validate_slug

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

    serialize_rules = (
        "-_password_hash",
    )

    @validates("slug")
    def validate_slug(self, key, value):
        return validate_slug(value)

    @validates("email")
    def validate_email(self, key, value):
        email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

        if not re.match(email_regex, value):
            raise ValueError(f"{value} is not an email address")
        return value

    @property
    def password_hash(self):
        raise AttributeError("password_hash is not directly readable")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)