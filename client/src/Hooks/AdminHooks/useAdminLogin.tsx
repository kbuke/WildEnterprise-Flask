import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../ReactQuery/queryClient";
import type { AdminLoginType } from "../../Types/AdminTypes";
import type { PostError, PostResponse } from "../../Types/PostMessageType";

async function postAdminLogin({
    email,
    password
}: AdminLoginType): Promise<PostResponse> {
    const res = await fetch(`/api/admin/login`, {
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

export function usePostAdminLogin() {
    return useMutation({
        mutationFn: postAdminLogin,
        onSuccess: () => {
            queryClient.setQueryData(["adminSession"], {is_admin: true})
        }
    });
}