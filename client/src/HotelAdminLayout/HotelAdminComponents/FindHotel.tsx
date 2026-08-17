import { useLocation } from "react-router-dom"
import { useFetchSpecificHotel } from "../../Hooks/HotelHooks/useFetchSpecificHotel"


export function FindHotel(){
    const specificLocation = useLocation()
    const {id} = specificLocation.state

    const {hotel} = useFetchSpecificHotel(id)

    return hotel
}