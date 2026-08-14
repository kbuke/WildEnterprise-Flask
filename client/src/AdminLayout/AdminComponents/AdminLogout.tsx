import { useNavigate } from "react-router-dom";
import { useAdminLogout } from "../../Hooks/AdminHooks/useAdminLogout";

export function AdminLogout(){
    const navigate = useNavigate()
    const adminLogout = useAdminLogout()

    const handleLogout = () => {
        adminLogout.mutate(undefined, {
            onSuccess: () => {
                navigate("/adminlogin")
            },
            onError: (error) => {
                console.log("Logout error:", error)
            }
        })
    }

    return(
        <button
            className="redButton"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}