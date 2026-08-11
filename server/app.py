from config import app, api

from resources.Hotel import AllHotels, SpecificHotel, HotelChageCredentials
from resources.HotelLogin import HotelLogin, HotelLogout, HotelCheckSession
from resources.AdminLogin import AdminLogin, AdminLogout, AdminCheckSession

api.add_resource(AllHotels, "/hotels")
api.add_resource(SpecificHotel, "/hotels/<int:id>")
api.add_resource(HotelChageCredentials, "/hotelcredentials/<int:id>")

api.add_resource(HotelLogin, "/hoteladmin/login")
api.add_resource(HotelLogout, "/hoteladmin/logout")
api.add_resource(HotelCheckSession, "/hoteladmin/checksession")

api.add_resource(AdminLogin, "/admin/login")
api.add_resource(AdminLogout, "/admin/logout")
api.add_resource(AdminCheckSession, "/admin/checksession")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)