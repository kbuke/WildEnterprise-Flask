import { useMutation } from "@tanstack/react-query";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { PostHotelType } from "../../Types/HotelTypes";
import { queryClient } from "../../ReactQuery/queryClient";

async function postHotel({
    name,
    location,
    img,
    info,
    email,
    password
}: PostHotelType): Promise<CrudRequestMessageType>{
    const res = await fetch("/api/hotels", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            name,
            location,
            img,
            info,
            email,
            password
        })
    })
    if(!res.ok){
        const errorBody: CrudRequestErrorType = await res.json().catch(() => ({
            error: "Something went wrong, please try again"
        }))
        throw new Error(errorBody.error)
    }
    return res.json()
}

export function usePostHotel(){
    return useMutation({
        mutationFn: postHotel,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hotels"]
            })
        }
    })
}