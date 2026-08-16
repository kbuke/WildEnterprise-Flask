import { useMutation } from "@tanstack/react-query";
import type { CrudRequestErrorType, CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { PatchHotelCredentialsType } from "../../Types/HotelTypes";
import { queryClient } from "../../ReactQuery/queryClient";

async function patchHotelCredentials(
    id: number,
    {
        newEmail,
        newPassword,
        currentPassword
    }: PatchHotelCredentialsType
): Promise<CrudRequestMessageType>{
    const res = await fetch(`/api/hotelcredentials/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            newEmail,
            newPassword,
            currentPassword
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

export function usePatchHotelCredentials(id: number){
    return useMutation({
        mutationFn: (formData: PatchHotelCredentialsType) => patchHotelCredentials(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hotels"]
            })
        }
    })
}