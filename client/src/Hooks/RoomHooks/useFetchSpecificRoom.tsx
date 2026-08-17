import { useQuery } from "@tanstack/react-query";
import type { FetchRoomType } from "../../Types/RoomTypes";

async function getSpecificRoom(id: number): Promise<FetchRoomType>{
    const response = await fetch(`/api/rooms/${id}`)

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchSpecificRoom(id:number){
    const {
        data, error, isError, isLoading, isPending
    } = useQuery<FetchRoomType, Error>({
        queryKey: ["rooms", id],
        queryFn: () => getSpecificRoom(id)
    })

    return {
        room: data,
        error,
        isError,
        isLoading,
        isPending
    }
}