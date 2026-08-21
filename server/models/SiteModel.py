from config import db 

from sqlalchemy_serializer import SerializerMixin

from models.NameImgInfoModel import NameImgInfoModel

from functions.serialize_relations import serialize_relations

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

class SiteModel(NameImgInfoModel):
    __tablename__ = "sites"

    events = one_to_many_back_populates("EventModel", "site")

    serialize_rules = (
        serialize_relations("events", ["site"]) +
        serialize_relations("events", ["bookings"])
    )