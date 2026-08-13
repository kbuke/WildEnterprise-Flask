
from flask import request
from flask_restful import Resource
from datetime import date

from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.RoomBookingModel import get_available_rooms, get_booked_quantity
from functions.holds import get_active_hold_quantity
from functions.pricing import price_stay
from functions.room_suggestions import suggest_room_combinations

class SearchAvailability(Resource):
    def get(self):
        try:
            hotel_id = int(request.args["hotelId"])
            arrival = date.fromisoformat(request.args["arrivalDate"])
            departure = date.fromisoformat(request.args["departureDate"])
            party_size = int(request.args.get("partySize", 1))
        except (KeyError, ValueError):
            return {"error": "hotelId, arrivalDate, departureDate, partySize (query params) required"}, 400

        if departure <= arrival:
            return {"error": "departureDate must be after arrivalDate"}, 400

        rooms = RoomModel.query.filter_by(hotel_id=hotel_id).all()
        direct_fits = []

        for room in rooms:
            if room.max_people < party_size:
                continue

            booked = get_booked_quantity(room.id, arrival, departure)
            held = get_active_hold_quantity(room.id, arrival, departure)
            raw_available = room.no_of_rooms - booked
            truly_available = raw_available - held

            if truly_available <= 0:
                continue

            direct_fits.append({
                "room": room.to_dict(),
                "available": truly_available,
                "contested": truly_available < raw_available,  # someone else is currently holding it
                "total_price": price_stay(room, arrival, departure),
            })

        response = {"direct_fits": direct_fits}

        if not direct_fits:
            response["combinations"] = suggest_room_combinations(hotel_id, arrival, departure, party_size)

        return response, 200