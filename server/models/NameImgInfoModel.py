from config import db

from sqlalchemy_serializer import SerializerMixin

class NameImgInfoModel(db.Model, SerializerMixin):
    __abstract__ = True # must set abstract to true for inheritace

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False)