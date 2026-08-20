import { useQuery } from "@tanstack/react-query"
import type { AvailabilityResponseType } from "../../Types/RoomTypes"
import { getAvailability } from "../../Requests/getAvailability"

type AvailabilityParams = {
    hotelId: number
    arrivalDate: string
    departureDate: string
    partySize: number
}

export function useAvailability(
    params: AvailabilityParams | null
) {
    return useQuery<AvailabilityResponseType, Error>({
        queryKey: [
            "availability",
            params?.hotelId,
            params?.arrivalDate,
            params?.departureDate,
            params?.partySize
        ],
        queryFn: () => getAvailability(params!),
        enabled: !!params
    })
}