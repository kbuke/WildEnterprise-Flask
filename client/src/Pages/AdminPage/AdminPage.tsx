import { useNavigate } from "react-router-dom"
import { useAdminLogout } from "../../Hooks/AdminHooks/useAdminLogout"

export function AdminPage(){
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
        <section>
            <h1>Admin Page</h1>

            <button
                className="redButton"
                onClick={handleLogout}
            >
                Logout
            </button>
        </section>
    )
}