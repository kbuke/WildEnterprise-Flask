import { useMutation } from "@tanstack/react-query";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { PostRoomType } from "../../Types/RoomTypes";
import { queryClient } from "../../ReactQuery/queryClient";

async function postRoom({
    name,
    img,
    noOfRooms,
    maxPeople,
    basePrice,
    hotelId
}: PostRoomType): Promise<CrudRequestMessageType>{
    const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            name,
            img,
            noOfRooms,
            maxPeople,
            basePrice,
            hotelId
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

export function usePostRoom(){
    return useMutation({
        mutationFn: postRoom,
        onSuccess: (_, variables) => {
            console.log("POST successful")
            console.log("Hotel ID from mutation:", variables.hotelId)
            queryClient.invalidateQueries({
                queryKey: ["hotels", variables.hotelId]
            })
        }
    })
}