from flask import session
from models.HotelModels.RoomModel import RoomModel

def check_hotel_ownership(dependant_id, dependant_type, model):
    dependant = model.query.get(dependant_id)

    if not dependant:
        return None, ({"error": f"{dependant_type}: {dependant_id} not found"}, 404)

    if dependant.hotel_id != session.get("hotel_id"):
        return None, ({"error": "Unauthorized"}, 403)

    return dependant, None