from models.HotelModels.DiscountModel import DiscountModel
from resources.BaseResource import BaseResource

from functions.check_hotel_ownership import check_hotel_ownership

from decorators.require_hotel_login import require_hotel_login

from flask import request, session

class AllDiscounts(BaseResource):
    model = DiscountModel

    field_map = {
        "name": "name",
        "code": "code",
        "bookingStart": "booking_start_date",
        "bookingEnd": "booking_end_date",
        "stayStart": "stay_start_date",
        "stayEnd": "stay_end_date",
        "roomId": "room_id",
        "precentageOff": "percentage_off",
        "hotelId": "hotel_id"
    }

    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        data = request.get_json() or {}
        data["hotelId"] = session.get("hotel_id")
        return self.post_instance()

class SpecificDiscount(BaseResource):
    model = DiscountModel

    field_map = {
        "name": "name",
        "code": "code",
        "bookingStart": "booking_start_date",
        "bookingEnd": "booking_end_date",
        "stayStart": "stay_start_date",
        "stayEnd": "stay_end_date",
        "roomId": "room_id",
        "precentageOff": "percentage_off",
        "hotelId": "hotel_id"
    }

    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        discount, error = check_hotel_ownership(id, "Discount", DiscountModel)
        if error:
            return error
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        discount, error = check_hotel_ownership(id, "Discount", DiscountModel)
        if error:
            return error
        return self.delete_instance(id)