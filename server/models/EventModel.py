from models.NameImgInfoModel import NameImgInfoModel

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.serialize_relations import serialize_relations

class EventModel(NameImgInfoModel):
    __tablename__ = "events"

    site_id = one_to_many_fk("sites", True)
    site = one_to_many_back_populates("SiteModel", "events", delete_orphan=False)

    no_of_tickets = db.Column(db.Integer, nullable = False)

    bookings = one_to_many_back_populates("EventBookingModel", "event")

    serialize_rules = (
        serialize_relations("site", ["events"]) +
        serialize_relations("bookings", ["event"])
    )