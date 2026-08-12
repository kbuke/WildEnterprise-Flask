from sqlalchemy_serializer import SerializerMixin 
from sqlalchemy.orm import validates

from config import db 

from relational_functions.many_to_many import many_to_many_fk
from relational_functions.one_to_many import one_to_many_back_populates

from functions.serialize_relations import serialize_relations

from models.HotelModels.BookingModel import BookingModel
from models.HotelModels.RoomModel import RoomModel

class RoomBookingModel(db.Model, SerializerMixin):
    """
    This is an "ASSOCIATION OBJECT (not a secondary table), which is a class-model representing the link between two other tables while adding extra data, attribute and methods
    This will check the available rooms over the date range, as well as the locked-in price for said rooms
    """

    __tablename__ = "room_bookings"

    id = db.Column(db.Integer, primary_key = True)
    room_id = many_to_many_fk("rooms")
    booking_id = many_to_many_fk("bookings")
    quantity = db.Column(db.Integer, nullable = False, default = 1)
    unit_price = db.Column(db.Float)    # price for ONE room over the full stay
    price_locked = db.Column(db.Float)  # unit_price * quantity — the actual line-item total

    room = one_to_many_back_populates("RoomModel", "room_bookings", False)
    booking = one_to_many_back_populates("BookingModel", "room_bookings", False)

    serialize_rules = (
        serialize_relations("room", ["room_bookings"]) +
        serialize_relations("booking", ["room_bookings"])
    )

def get_booked_quantity(
        room_id, arrival_date, departure_date, exclude_booking_id = None
):
    query = (
        db.session.query(db.func.coalesce(db.func.sum(RoomBookingModel.quantity), 0))
        .join(BookingModel, RoomBookingModel.booking_id == BookingModel.id)
        .filter(
            RoomBookingModel.room_id == room_id,
            BookingModel.arrival_date < departure_date,
            BookingModel.departure_date > arrival_date
        )
    )

    if exclude_booking_id:
        query = query.filter(BookingModel.id != exclude_booking_id)
    return query.scalar()

def get_available_rooms(
        room_id, arrival_date, departure_date, exclude_booking_id = None
):
    room = RoomModel.query.get(room_id)
    booked = get_booked_quantity(room_id, arrival_date, departure_date, exclude_booking_id)
    return room.no_of_rooms - booked