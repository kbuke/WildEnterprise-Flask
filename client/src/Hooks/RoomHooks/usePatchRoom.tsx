import { useMutation } from "@tanstack/react-query";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { PatchHotelType } from "../../Types/HotelTypes";
import { queryClient } from "../../ReactQuery/queryClient";
import type { PostRoomType } from "../../Types/RoomTypes";

async function patchRoom(
    id: number,
    {
        name,
        img,
        noOfRooms,
        maxPeople,
        basePrice
    }: PostRoomType
): Promise<CrudRequestMessageType>{
    const res = await fetch (`/api/rooms/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            name,
            location,
            img,
            noOfRooms,
            maxPeople,
            basePrice
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

export function usePatchRoom(id: number){
    return useMutation({
        mutationFn: (formData: PostRoomType) => patchRoom(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hotels"]
            })
        }
    })
}