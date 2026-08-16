import { Navigate, Outlet } from "react-router-dom";
import { useCheckAdminSession } from "../Hooks/AdminHooks/useCheckAdminSession";
import { useCheckHotelAdminSession } from "../Hooks/HotelHooks/useCheckHotelAdminSession";

type LoginType = {
    type: "Hotel" | "Admin"
}

export function ProtectedAdminRoute({
    type
}: LoginType){
    const adminSession = useCheckAdminSession({ enabled: type === "Admin" })
    const hotelSession = useCheckHotelAdminSession({ enabled: type === "Hotel" })

    const isLoading = type === "Hotel" ? hotelSession.isLoading : adminSession.isLoading
    const isAuthed = type === "Hotel" ? hotelSession.data?.is_hotel_admin : adminSession.data?.is_admin

    if (isLoading){
        return <div>Loading...</div>
    }

    console.log("isAuthed:", isAuthed)

    if (!isAuthed){
        return(
            <Navigate 
                to={type === "Hotel" ? "/hoteladminlogin" : "/adminlogin"}
                replace
            />
        )
    }

    return <Outlet />
}