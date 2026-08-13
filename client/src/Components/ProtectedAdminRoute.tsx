import { Navigate, Outlet } from "react-router-dom";
import { useCheckAdminSession } from "../Hooks/AdminHooks/useCheckAdminSession";

export function ProtectedAdminRoute(){
    const {data, isLoading} = useCheckAdminSession()

    if (isLoading){
        return <div>Loading...</div>
    }

    if(!data?.is_admin){
        return <Navigate to="/adminlogin" replace />
    }

    return <Outlet />
}