from datetime import date

def validate_booking_dates(arrival, departure):
    arrival = date.fromisoformat(arrival)
    if arrival < date.today():
        return {"error": "You can not book a stay in the past"}

    departure = date.fromisoformat()