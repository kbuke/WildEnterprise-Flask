import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../ReactQuery/queryClient";

async function deleteAdminSession(): Promise<void>{
    const res = await fetch(`/api/admin/logout`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!res.ok){
        throw new Error("Failed to log out")
    }
}

export function useAdminLogout(){
    return useMutation({
        mutationFn: deleteAdminSession,
        onSuccess: () => {
            queryClient.setQueryData(["adminSession"], {is_admin: false})
        }
    })
}