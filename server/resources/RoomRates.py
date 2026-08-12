from models.HotelModels.RoomRateModel import RoomRateModel
from resources.BaseResource import BaseResource

from decorators.require_hotel_login import require_hotel_login
from functions.check_hotel_ownership import check_hotel_ownership

from flask import request, session

class AllRoomRates(BaseResource):
    model = RoomRateModel

    field_map = {
        "name": "name",
        "startDate": "start_date",
        "endDate": "end_date",
        "modifier": "modifier_type",
        "value": "value",
        "roomId": "room_id",
        "priority": "priority"
    }

    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        return self.post_instance()

class SpecificRoomRates(BaseResource):
    model = RoomRateModel

    field_map = {
        "name": "name",
        "startDate": "start_date",
        "endDate": "end_date",
        "modifier": "modifier_type",
        "value": "value",
        "roomId": "room_id",
        "priority": "priority"
    }

    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        return self.delete_instance(id)