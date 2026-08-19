import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AdminLoginPg } from "./IndependantLayouts/AdminLoginPage/AdminLoginPg";
import { AdminHomePg } from "./AdminLayout/AdminPages/AdminHomePg";
import { ProtectedAdminRoute } from "./Components/ProtectedAdminRoute";
import { AdminLayout } from "./AdminLayout/AdminLayout";
import { AdminHotel } from "./AdminLayout/AdminPages/AdminHotel/AdminHotel";
import { HotelAdminLoginPg } from "./IndependantLayouts/HotelAdminLoginPage/HotelAdminLoginPg";
import { HotelAdmonDashboard } from "./HotelAdminLayout/HotelAdminPages/HotelAdminDashboard";
import { HotelAdminLayout } from "./HotelAdminLayout/HotelAdminLayout";
import { HotelDiscounts } from "./HotelAdminLayout/HotelAdminPages/HotelDiscounts/HotelDiscounts";
import { HotelRooms } from "./HotelAdminLayout/HotelAdminPages/HotelRooms/HotelRooms";
import { HotelLeadTimes } from "./HotelAdminLayout/HotelAdminPages/HotelLeadTimes/HotelLeadTimes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/adminlogin", element: <AdminLoginPg />},
            {path: "/hoteladminlogin", element: <HotelAdminLoginPg />},
            {
                element: <ProtectedAdminRoute 
                    type="Admin"
                />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            {
                                path: "/admindashboard",
                                element: <AdminHomePg />
                            },

                            {
                                path: "/adminhotel",
                                element: <AdminHotel />
                            }
                        ]
                    }
                ]
            },
            {
                element: <ProtectedAdminRoute 
                    type="Hotel"
                />,
                children: [
                    {
                        element: <HotelAdminLayout />,
                        children: [
                            {
                                path: "/hoteladmindashboard",
                                element: <HotelAdmonDashboard />
                            },

                            {
                                path: `/:slug/discounts`,
                                element: <HotelDiscounts />
                            },

                            {
                                path: "/:slug/rooms",
                                element: <HotelRooms />
                            },

                            {
                                path: "/:slug/leadtimes",
                                element: <HotelLeadTimes />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])