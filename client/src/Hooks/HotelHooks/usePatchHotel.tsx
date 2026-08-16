import { useMutation } from "@tanstack/react-query";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { PatchHotelType } from "../../Types/HotelTypes";
import { queryClient } from "../../ReactQuery/queryClient";

async function patchHotel(
    id: number,
    {
        name,
        location,
        img,
        info
    }: PatchHotelType
): Promise<CrudRequestMessageType>{
    const res = await fetch (`/api/hotels/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            name,
            location,
            img,
            info
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

export function usePatchHotel(id: number){
    return useMutation({
        mutationFn: (formData: PatchHotelType) => patchHotel(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hotels"]
            })
        }
    })
}