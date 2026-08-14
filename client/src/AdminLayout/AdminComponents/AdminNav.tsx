import { AdminLogout } from "./AdminLogout";
import { Link } from "react-router-dom";

export function AdminNav(){
    return(
        <div
            className="navBar adminNavBar"
        >
            <Link
                className="text-white uppercase 
                lg:text-4xl font-bold lg:tracking-[2px]"
                to={"/admindashboard"}
            >
                Admin Section
            </Link>

            <AdminLogout />
        </div>
    )
}