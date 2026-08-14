import { Outlet } from "react-router-dom";
import { AdminNav } from "./AdminComponents/AdminNav";

export function AdminLayout(){
    return(
        <>
            <AdminNav />
            <Outlet />
        </>
    )
}