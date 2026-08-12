from flask_mail import Message
from config import mail 

def send_guest_confirmation(booking):
    msg = Message(
        subject = f"Booking Confirmed - {booking.booking_ref}",
        recipients=[booking.email],
        body = (
            f"Hi {booking.name}, \n\n"
            f"Your booking is confirmed. \n"
            f"Arrival: {booking.arrival_date} \n"
            f"Departure: {booking.departure_date} \n"
        )
    )
    mail.send(msg)

def send_hotel_notification(booking):
    hotel_emails = {rb.room.hotel.email for rb in booking.room_bookings}
    for email in hotel_emails:
        msg = Message(
            subject=f"New Booking - {booking.booking_ref}",
            recipients=[email],
            body=(
                f"New guest booking received. \n"
                f"Guest: {booking.name}\n"
                f"Reference: {booking.booking_ref}\n"
                f"Arrival: {booking.arrival_date}\n"
                f"Departure: {booking.departure_date}"
            )
        )
        mail.send(msg)