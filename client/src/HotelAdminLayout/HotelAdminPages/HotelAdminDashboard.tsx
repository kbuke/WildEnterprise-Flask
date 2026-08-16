import { LoadingIcon } from "../../Components/LoadingIcon"
import { useCheckHotelAdminSession } from "../../Hooks/HotelHooks/useCheckHotelAdminSession"

export function HotelAdmonDashboard(){
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
            className="py-6"
        >
            Hotel Logged In
        </div>
    )
}