import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AdminLoginPg } from "./IndependantLayouts/AdminLoginPage/AdminLoginPg";
import { AdminHomePg } from "./AdminLayout/AdminPages/AdminHomePg";
import { ProtectedAdminRoute } from "./Components/ProtectedAdminRoute";
import { AdminLayout } from "./AdminLayout/AdminLayout";
import { AdminHotel } from "./AdminLayout/AdminPages/AdminHotel/AdminHotel";
import { HotelAdminLoginPg } from "./IndependantLayouts/HotelAdminLoginPage/HotelAdminLoginPg";
import { HotelAdmonDashboard } from "./HotelAdminLayout/HotelAdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/adminlogin", element: <AdminLoginPg />},
            {path: "/hoteladminlogin", element: <HotelAdminLoginPg />},
            {
                element: <ProtectedAdminRoute />,
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
            {path: "/hoteladmindashboard", element: <HotelAdmonDashboard />}
        ]
    }
])