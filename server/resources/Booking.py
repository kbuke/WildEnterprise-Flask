from flask import request
from flask_restful import Resource

from sqlalchemy.exc import IntegrityError

from config import db

from models.HotelModels.BookingModel import BookingModel
from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.RoomBookingModel import RoomBookingModel, get_available_rooms

from resources.BaseResource import BaseResource

from functions.pricing import price_stay

from datetime import date

from functions.confirmation_email import send_guest_confirmation, send_hotel_notification


class AllBookings(BaseResource):
    model = BookingModel

    field_map = {
        "name": "name",
        "email": "email",
        "arrival": "arrival_date",
        "departure": "departure_date"
    }

    def get(self):
        return self.get_all()


class CreateBooking(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {"error": "Missing JSON data"}, 400

        required = ["name", "email", "arrivalDate", "departureDate", "rooms"]
        missing = [f for f in required if f not in data]
        if missing:
            return {"error": f"Missing fields: {', '.join(missing)}"}, 400

        try:
            arrival = date.fromisoformat(data["arrivalDate"])
            departure = date.fromisoformat(data["departureDate"])
        except ValueError:
            return {"error": "Dates must be in YYYY-MM-DD format"}, 400

        if departure <= arrival:
            return {"error": "departure_date must be after arrival_date"}, 400

        requested_rooms = data["rooms"]
        if not requested_rooms:
            return {"error": "At least one room must be selected"}, 400

        errors = []
        rooms_cache = {}
        for entry in requested_rooms:
            room = RoomModel.query.get(entry["room_id"])
            if not room:
                errors.append(f"Room {entry['room_id']} does not exist")
                continue

            available = get_available_rooms(room.id, arrival, departure)
            if available < entry["quantity"]:
                errors.append(
                    f"Only {available} of '{room.name}' available for those dates "
                    f"(requested {entry['quantity']})"
                )
            rooms_cache[room.id] = room

        if errors:
            return {"error": errors}, 400

        try:
            booking = BookingModel(
                name=data["name"],
                email=data["email"],
                arrival_date=arrival,
                departure_date=departure
            )
            db.session.add(booking)
            db.session.flush()

            for entry in requested_rooms:
                room = rooms_cache[entry["room_id"]]
                unit_price = price_stay(room, arrival, departure)
                db.session.add(RoomBookingModel(
                    room_id=room.id,
                    booking_id=booking.id,
                    quantity=entry["quantity"],
                    unit_price=unit_price,
                    price_locked=unit_price * entry["quantity"]
                ))

            db.session.commit()

            send_guest_confirmation(booking)
            send_hotel_notification(booking)
            
            return booking.to_dict(), 201

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400


class SpecificBookings(BaseResource):
    model = BookingModel

    field_map = {
        "name": "name",
        "email": "email",
        "arrival": "arrival_date",
        "departure": "departure_date"
    }

    def get(self, id):
        return self.get_specific(id)

    def delete(self, id):
        return self.delete_instance(id)


class ChangeBookingDates(Resource):
    def patch(self, id):
        booking = BookingModel.query.get(id)
        if not booking:
            return {"error": f"Booking {id} not found"}, 404

        data = request.get_json() or {}

        try:
            new_arrival = (
                date.fromisoformat(data["arrivalDate"])
                if "arrivalDate" in data
                else booking.arrival_date
            )
            new_departure = (
                date.fromisoformat(data["departureDate"])
                if "departureDate" in data
                else booking.departure_date
            )
        except ValueError:
            return {"error": "arrivalDate and departureDate must be in YYYY-MM-DD format"}, 400

        if new_departure <= new_arrival:
            return {"error": "departure_date must be after arrival_date"}, 400

        errors = []
        for rb in booking.room_bookings:
            available = get_available_rooms(
                rb.room_id, new_arrival, new_departure,
                exclude_booking_id=booking.id
            )
            if available < rb.quantity:
                errors.append(
                    f"Only {available} of '{rb.room.name}' available for those dates "
                    f"(this booking needs {rb.quantity})"
                )

        if errors:
            return {"error": errors}, 400

        try:
            booking.arrival_date = new_arrival
            booking.departure_date = new_departure

            for rb in booking.room_bookings:
                rb.unit_price = price_stay(rb.room, new_arrival, new_departure)
                rb.price_locked = rb.unit_price * rb.quantity

            db.session.commit()
            return booking.to_dict(), 200

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400


class ChangeBookingRoomQuantity(Resource):
    """
    Handles quantity changes for one room already attached to a booking.
    The `id` here is the RoomBookingModel row's id, not the booking's id.
    Dates are untouched — this only ever changes how many of that room type
    this particular booking holds.
    """
    def patch(self, id):
        rb = RoomBookingModel.query.get(id)
        if not rb:
            return {"error": f"Room booking {id} not found"}, 404

        data = request.get_json() or {}
        if "quantity" not in data:
            return {"error": "quantity is required"}, 400

        try:
            new_quantity = int(data["quantity"])
        except (ValueError, TypeError):
            return {"error": "quantity must be a number"}, 400

        if new_quantity <= 0:
            return {"error": "quantity must be at least 1"}, 400

        booking = rb.booking
        available = get_available_rooms(
            rb.room_id, booking.arrival_date, booking.departure_date,
            exclude_booking_id=booking.id
        )
        if available < new_quantity:
            return {
                "error": f"Only {available} of '{rb.room.name}' available "
                         f"(requested {new_quantity})"
            }, 400

        try:
            rb.quantity = new_quantity
            rb.unit_price = price_stay(rb.room, booking.arrival_date, booking.departure_date)
            rb.price_locked = rb.unit_price * new_quantity

            db.session.commit()
            return booking.to_dict(), 200

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400