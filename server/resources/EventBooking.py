from flask import request, make_response
from flask_restful import Resource

from config import db 

from models.EventModel import EventModel
from models.EventBookings import EventBookingModel

from sqlalchemy.exc import IntegrityError

from resources.BaseResource import BaseResource

class AllEventBookings(BaseResource):
    model = EventBookingModel

    def get(self):
        return self.get_all()

class PostEventBooking(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {"error": "Missing JSON Data"}, 404 

        required = [
            "name", "email", "noOfPeople", "eventId"
        ]

        missing = [field for field in required if field not in data]

        event_id = int(data["eventId"])

        event = EventModel.query.get(event_id)

        if not event:
            return {
                "error": "Event does not exist"
            }

        tickets_left = event.no_of_tickets

        if missing:
            return{
                "error": f"Missing fields: {', '.join(missing)}"
            }, 400

        try:
            party_size = int(data["noOfPeople"])
        except(ValueError, TypeError):
            return{
                "error": "Party size must be a number"
            }, 400

        if party_size < 1:
            return{
                "error": "There must be atleast one guest"
            }, 400 

        if tickets_left < party_size:
            return{
                "error": "Not enough tickets left for this party size"
            }, 400

        try: 
            booking = EventBookingModel(
                name = data["name"],
                email = data["email"],
                no_of_people = party_size,
                event_id = data["eventId"]
            )

            db.session.add(booking)
            db.session.flush()

            event.no_of_tickets -= party_size

            db.session.commit()

            return   booking.to_dict(), 201 
        except (ValueError, IntegrityError) as e:
            db.session.rollback()

            return{
                "error": [str(e)]
            }, 400