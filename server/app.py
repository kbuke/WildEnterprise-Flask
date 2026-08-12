from config import app, api

from resources.Hotel import AllHotels, SpecificHotel, HotelChageCredentials
from resources.HotelLogin import HotelLogin, HotelLogout, HotelCheckSession
from resources.AdminLogin import AdminLogin, AdminLogout, AdminCheckSession
from resources.Room import AllRooms, SpecificRoom
from resources.Discount import AllDiscounts, SpecificDiscount
from resources.LeadTimeRule import AllLeadTimeRule, SpecificLeadTimeRule
from resources.RoomRates import AllRoomRates, SpecificRoomRates
from resources.Booking import AllBookings, SpecificBookings, CreateBooking, ChangeBookingDates, ChangeBookingRoomQuantity
from resources.RoomBooking import AllRoomBookings, SpecificRoomBooking

api.add_resource(AllHotels, "/hotels")
api.add_resource(SpecificHotel, "/hotels/<int:id>")
api.add_resource(HotelChageCredentials, "/hotelcredentials/<int:id>")

api.add_resource(HotelLogin, "/hoteladmin/login")
api.add_resource(HotelLogout, "/hoteladmin/logout")
api.add_resource(HotelCheckSession, "/hoteladmin/checksession")

api.add_resource(AdminLogin, "/admin/login")
api.add_resource(AdminLogout, "/admin/logout")
api.add_resource(AdminCheckSession, "/admin/checksession")

api.add_resource(AllRooms, "/rooms")
api.add_resource(SpecificRoom, "/rooms/<int:id>")

api.add_resource(AllDiscounts, "/discounts")
api.add_resource(SpecificDiscount, "/discounts/<int:id>")

api.add_resource(AllLeadTimeRule, "/leadtimes")
api.add_resource(SpecificLeadTimeRule, "/leadtimes/<int:id>")

api.add_resource(AllRoomRates, "/roomrates")
api.add_resource(SpecificRoomRates, "/roomrates/<int:id>")

api.add_resource(AllBookings, "/bookings")
api.add_resource(CreateBooking, "/bookings/create")
api.add_resource(SpecificBookings, "/bookings/<int:id>")
api.add_resource(ChangeBookingDates, "/bookings/<int:id>/edit")

api.add_resource(AllRoomBookings, "/roombookings")
api.add_resource(SpecificRoomBooking, "/roombookings/<int:id>")
api.add_resource(ChangeBookingRoomQuantity, "/roombookings/<int:id>/quantity")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)