# functions/holds.py
from datetime import datetime
from models.HotelModels.RoomHoldModel import RoomHoldModel

def get_active_hold_quantity(room_id, arrival_date, departure_date, exclude_session_token=None):
    query = RoomHoldModel.query.filter(
        RoomHoldModel.room_id == room_id,
        RoomHoldModel.arrival_date < departure_date,
        RoomHoldModel.departure_date > arrival_date,
        RoomHoldModel.expires_at > datetime.utcnow(),  # ignore expired holds automatically
    )
    if exclude_session_token:
        query = query.filter(RoomHoldModel.session_token != exclude_session_token)
    return sum(h.quantity for h in query.all())