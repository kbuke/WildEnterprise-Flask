from models.HotelModels.RoomBookingModel import RoomBookingModel
from resources.BaseResource import BaseResource

class AllRoomBookings(BaseResource):
    model = RoomBookingModel

    field_map = {
        "roomId": "room_id",
        "bookingId": "booking_id",
        "quantity": "quantity",
        "priceLocked": "price_locked"
    }

    def get(self):
        return self.get_all()

class SpecificRoomBooking(BaseResource):
    model = RoomBookingModel
    
    field_map = {
        "roomId": "room_id",
        "bookingId": "booking_id",
        "quantity": "quantity",
        "priceLocked": "price_locked"
    }

    def get(self, id):
        return self.get_specific(id)

    def delete(self, id):
        return self.delete_instance(id)