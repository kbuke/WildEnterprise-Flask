import { Outlet } from "react-router-dom";
import { HotelAdminNav } from "./HotelAdminComponents/HotelAdminNav";
import { useCheckHotelAdminSession } from "../Hooks/HotelHooks/useCheckHotelAdminSession";
import { LoadingIcon } from "../Components/LoadingIcon";

export function HotelAdminLayout(){
    const {data, isLoading} = useCheckHotelAdminSession()

    if(isLoading){
        return <LoadingIcon />
    }

    if(!data?.is_hotel_admin){
        return null
    }

    const hotelId = data.id
    return(
        <div
            className="grid grid-cols-[1fr_12fr] gap-10"
        >
            <HotelAdminNav 
                id={hotelId}
            />
            <Outlet />
        </div>
    )
}