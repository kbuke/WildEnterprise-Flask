from flask import session
from models.HotelModels.RoomModel import RoomModel

def check_room_ownership(room_id):
    """
    Look up an existing room and confirm it belongs to the logged-in hotel.
    Returns (room, None) on success, or (None(response_dict, status_code)) on failure
    """

    room = RoomModel.query.get(room_id)

    if not room:
        return None, ({"error": f"Room {room_id} not found"}, 404)

    if room.hotel_id != session.get("hotel_id"):
        return None, ({"error": "Unauthorized"}, 403)

    return room, None