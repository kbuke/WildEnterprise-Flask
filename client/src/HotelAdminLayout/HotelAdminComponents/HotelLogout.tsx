import { Forms } from "../../Components/Forms";
import { PopUp } from "../../Components/PopUp";
import type { CancelRequestType } from "../../Types/CancelRequestType";
import { useNavigate } from "react-router-dom";
import { usePostHotelAdminLogout } from "../../Hooks/HotelHooks/useHotelAdminLogout";

export function HotelLogout({
    onClose
}: CancelRequestType){

    const navigate = useNavigate()
    const hotelAdminLogout = usePostHotelAdminLogout()

    const handleLogout = () => {
        hotelAdminLogout.mutate(undefined, {
            onSuccess: () => {
                navigate("/hoteladminlogin")
            },
            onError: (error) => {
                console.log("Logout error:", error)
            }
        })
    }

    return(
        <PopUp 
            children = {<Forms 
                title="Logout?"
                onClose={onClose}
                onSubmit={() => handleLogout()}
                submitButtonTitle="Logout"
            />}
        />
    )
}