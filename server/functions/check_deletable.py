# functions/check_deletable.py
from models.HotelModels.RoomBookingModel import RoomBookingModel
from models.HotelModels.RoomModel import RoomModel

from config import db

def room_has_bookings(room_id):
    return db.session.query(
        RoomBookingModel.query.filter_by(room_id=room_id).exists()
    ).scalar()

def hotel_has_bookings(hotel_id):
    return db.session.query(
        RoomBookingModel.query
        .join(RoomModel, RoomBookingModel.room_id == RoomModel.id)
        .filter(RoomModel.hotel_id == hotel_id)
        .exists()
    ).scalar()