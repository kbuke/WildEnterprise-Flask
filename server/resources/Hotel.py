from resources.BaseResource import BaseResource

from models.HotelModels.HotelModel import HotelModel

from decorators.require_hotel_login import require_hotel_login
from decorators.require_admin_login import require_admin_login

from functions.check_hotel_id_session import check_hotel_id_session
from functions.check_deletable import hotel_has_bookings

from flask import request

from flask_restful import Resource

from config import db

from sqlalchemy.exc import IntegrityError

class AllHotels(BaseResource):
    model = HotelModel

    field_map = {
        "name": "name",
        "location": "location",
        "img": "img",
        "info": "info",
        "email": "email",
        "password": "password_hash"
    }

    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_instance()

class SpecificHotel(BaseResource):
    model = HotelModel
    field_map = { "name": "name", "location": "location", "img": "img", "info": "info" }

    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        error = check_hotel_id_session(id)
        if error:
            return error
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        if hotel_has_bookings(id):
            return {"error": "This hotel has existing bookings and cannot be deleted."}, 409
        return self.delete_instance(id)


class HotelChageCredentials(Resource):
    @require_hotel_login
    def patch(self, id):
        error = check_hotel_id_session(id)
        if error:
            return error

        hotel = HotelModel.query.get(id)
        if not hotel:
            return {"error": f"Hotel {id} not found"}, 404

        data = request.get_json()

        if not data.get("newEmail") and not data.get("newPassword"):
            return {"error": "Please provide a new email or a new password"}, 400

        if not hotel.authenticate(data.get("currentPassword", "")):
            return {"error": "Current password is not correct"}, 401

        try:
            if data.get("newEmail"):
                hotel.email = data["newEmail"]
            if data.get("newPassword"):
                hotel.password_hash = data["newPassword"]

            db.session.commit()
            return hotel.to_dict(), 200

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400