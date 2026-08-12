from flask import request, session

from resources.BaseResource import BaseResource
from models.HotelModels.RoomModel import RoomModel

from decorators.require_hotel_login import require_hotel_login

# from functions.check_room_ownership import check_room_ownership
from functions.check_hotel_ownership import check_hotel_ownership

class AllRooms(BaseResource):
    model = RoomModel

    field_map = {
        "name": "name",
        "img": "img",
        "noOfRooms": "no_of_rooms",
        "maxPeople": "max_people",
        "basePrice": "base_price",
        "hotelId": "hotel_id"
    }

    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        # ***** Force hotel_id to whoever is logged in, do not rely on a client setup for this *****
        data = request.get_json() or {} 
        data["hotelId"] = session.get("hotel_id")
        return self.post_instance()

class SpecificRoom(BaseResource):
    model = RoomModel
    
    field_map = {
        "name": "name",
        "img": "img",
        "noOfRooms": "no_of_rooms",
        "maxPeople": "max_people",
        "basePrice": "base_price",
        "hotelId": "hotel_id"
    }

    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        # room, error = check_room_ownership(id)
        room, error = check_hotel_ownership(id, "Room", RoomModel)
        if error: 
            return error
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        # room, error = check_room_ownership(id)
        room, error = check_hotel_ownership(id, "Room", RoomModel)
        if error:
            return error
        return self.delete_instance(id)