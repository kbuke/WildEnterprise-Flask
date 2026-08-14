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
    
    field_map = {
        "name": "name",
        "location": "location",
        "img": "img",
        "info": "info",
    }

    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        check_hotel_id_session(id)
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        check_hotel_id_session(id)
        if hotel_has_bookings(id):
            return {"error": "This hotel has existing bookings and can not be deleted."}
        return self.delete_instance(id)

class HotelChageCredentials(Resource):
    @require_hotel_login
    def patch(self, id):
        check_hotel_id_session(id)

        hotel = HotelModel.query.get(id)
        data = request.get_json()

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