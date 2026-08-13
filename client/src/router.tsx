import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AdminLoginPg } from "./Pages/AdminLoginPage/AdminLoginPg";
import { AdminPage } from "./Pages/AdminPage/AdminPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/adminlogin", element: <AdminLoginPg />
            },

            {
                path: "/admindashboard", element: <AdminPage />
            }
        ]
    }
])