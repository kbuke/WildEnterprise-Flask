from flask import request, session
from flask_restful import Resource

from sqlalchemy.exc import IntegrityError

from config import db
from models.HotelModels.ReviewModel import ReviewModel
from resources.BaseResource import BaseResource

from functions.validate_booking import find_matching_booking
from functions.verify_review_owner import verify_review_owner


class AllReviews(BaseResource):
    model = ReviewModel

    field_map = {
        "rating": "rating",
        "title": "title",
        "review": "review",
        "email": "email",
    }

    def get(self):
        return self.get_all()

    def post(self):
        data = request.get_json()
        if not data:
            return {"error": "Missing JSON data"}, 400

        required = ["email", "bookingRef", "rating"]
        missing = [f for f in required if f not in data]
        if missing:
            return {"error": f"Missing fields: {', '.join(missing)}"}, 400

        booking, error = find_matching_booking(data["email"], data["bookingRef"])
        if error:
            return error

        existing = ReviewModel.query.filter_by(booking_id=booking.id).first()
        if existing:
            return {"error": "A review has already been submitted for this booking."}, 400

        if not booking.room_bookings:
            return {"error": "This booking has no rooms associated with it."}, 400

        hotel_id = booking.room_bookings[0].room.hotel_id
        booking_id = booking.id


        try:
            new_review = ReviewModel(
                rating=data["rating"],
                title=data.get("title"),
                review=data.get("review"),
                email=data["email"],
                booking_id=booking_id,
                hotel_id=hotel_id,
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 201
        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400


class SpecificReviews(BaseResource):
    model = ReviewModel

    field_map = {
        "rating": "rating",
        "title": "title",
        "review": "review",
    }

    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        data = request.get_json() or {}

        required = ["email", "bookingRef"]
        missing = [f for f in required if f not in data]
        if missing:
            return {"error": f"Missing fields: {', '.join(missing)}"}, 400

        review, error = verify_review_owner(id, data["email"], data["bookingRef"])
        if error:
            return error

        # only pass through fields this endpoint is actually meant to edit —
        # strips email/bookingRef so they can't overwrite the stored identity
        editable_data = {k: v for k, v in data.items() if k in self.field_map}
        return self.patch_instance(id, editable_data)

    def delete(self, id):
        review = ReviewModel.query.get(id)
        if not review:
            return {"error": f"Review {id} not found"}, 404

        data = request.get_json(silent=True) or {}

        # Path 1: the guest who wrote it, proven via email + bookingRef
        if "email" in data and "bookingRef" in data:
            _, error = verify_review_owner(id, data["email"], data["bookingRef"])
            if error:
                return error
            return self.delete_instance(id)

        # Path 2: the owning hotel, moderating via their logged-in session
        if session.get("hotel_id") == review.hotel_id:
            return self.delete_instance(id)

        return {"error": "Unauthorized"}, 401