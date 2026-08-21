from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.RoomBookingModel import get_available_rooms

def get_hotel_available_capacity(
        hotel_id,
        arrival_date,
        departure_date,
        exclude_booking_id=None
):
    rooms = RoomModel.query.filter_by(hotel_id = hotel_id).all()

    total_capacity = 0

    for room in rooms:
        available = get_available_rooms(
            room.id,
            arrival_date,
            departure_date,
            exclude_booking_id=exclude_booking_id
        )

        total_capacity += available * room.max_people

    return total_capacity