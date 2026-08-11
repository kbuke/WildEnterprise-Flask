from flask import request, session
from flask_restful import Resource

from models.HotelModels.HotelModel import HotelModel

class HotelLogin(Resource):
    def post(self):
        data = request.get_json()
        hotel = HotelModel.query.filter_by(email=data.get("email")).first()

        if not hotel or not hotel.authenticate(data.get("password", "")):
            return {"error": "Invalid email or password"}, 401

        session["hotel_id"] = hotel.id
        return hotel.to_dict(), 200 

class HotelLogout(Resource):
    def delete(self):
        session.pop("hotel_id", None)
        return {}, 204 

class HotelCheckSession(Resource):
    def get(self):
        hotel = HotelModel.query.get(session.get("hotel_id"))
        if not hotel:
            return {"error": "Not logged in"}, 401 
        return hotel.to_dict(), 200