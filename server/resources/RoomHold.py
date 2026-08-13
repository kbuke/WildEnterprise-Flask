# resources/RoomHold.py
import uuid
from flask import request
from flask_restful import Resource

from config import db
from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.RoomBookingModel import get_available_rooms
from models.HotelModels.RoomHoldModel import RoomHoldModel
from datetime import date

class CreateHold(Resource):
    def post(self):
        data = request.get_json() or {}
        try:
            room_id = int(data["roomId"])
            quantity = int(data.get("quantity", 1))
            arrival = date.fromisoformat(data["arrivalDate"])
            departure = date.fromisoformat(data["departureDate"])
        except (KeyError, ValueError):
            return {"error": "roomId, arrivalDate, departureDate required"}, 400

        room = RoomModel.query.get(room_id)
        if not room:
            return {"error": f"Room {room_id} not found"}, 404

        available = get_available_rooms(room_id, arrival, departure)
        if available < quantity:
            return {"error": f"Only {available} of '{room.name}' available"}, 400

        session_token = data.get("sessionToken") or str(uuid.uuid4())

        hold = RoomHoldModel(
            room_id=room_id,
            quantity=quantity,
            arrival_date=arrival,
            departure_date=departure,
            session_token=session_token,
        )
        db.session.add(hold)
        db.session.commit()

        return {**hold.to_dict(), "sessionToken": session_token}, 201