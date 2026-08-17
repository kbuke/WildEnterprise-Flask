import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../ReactQuery/queryClient";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";

async function deleteRoom(id:number): Promise<CrudRequestMessageType> {
    const res = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    })
    if(!res.ok){
        const errorBody: CrudRequestErrorType = await res.json().catch(() => ({
            error: "Something went wrong, please try again"
        }))
        throw new Error(errorBody.error)
    }
    return res.json()
}

export function useDeleteRoom(id: number){
    return useMutation({
        mutationFn: () => deleteRoom(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hotels"]
            })
        }
    })
}