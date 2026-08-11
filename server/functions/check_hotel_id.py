from flask import session

def check_hotel_id(value):
    if session.get("hotel_id") != id:
        return {"error": "Unauthorized"}, 403