import type { AdminLoginType } from "../../Types/AdminTypes";
import type { PostResponse, PostError } from "../../Types/PostMessageType";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../ReactQuery/queryClient";

async function postHotelAdminLogin({
    email,
    password
}: AdminLoginType): Promise<PostResponse>{
    const res = await fetch(`/api/hoteladmin/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password})
    })

    if(!res.ok){
        const errorBody: PostError = await res.json().catch(() => ({
            error: "Something went wrong. Please try again"
        }));
        throw new Error(errorBody.error)
    }
    
    return res.json()
}

export function usePostHotelAdminLogin(){
    return useMutation({
        mutationFn: postHotelAdminLogin,
        onSuccess: () => {
            queryClient.setQueryData(["adminSession"], {is_admin: true})
        }
    });
}