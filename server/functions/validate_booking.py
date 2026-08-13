# functions/validate_booking.py
from datetime import date
from models.HotelModels.BookingModel import BookingModel

def find_matching_booking(email, booking_ref):
    """
    Confirms a booking exists matching this email + booking_ref, and that the
    stay has already ended. Returns (booking, None) on success, or
    (None, (response_dict, status_code)) on failure.
    """
    booking = BookingModel.query.filter_by(email=email, booking_ref=booking_ref).first()

    if not booking:
        return None, ({"error": "Incorrect email or booking reference."}, 404)

    if date.today() < booking.departure_date:
        return None, (
            {
                "error": f"Please complete your stay before leaving a review. "
                         f"You can review us from {booking.departure_date}."
            },
            400,
        )

    return booking, None

