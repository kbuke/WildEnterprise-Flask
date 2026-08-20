// import type { AvailabilityResponseType } from "../Types/AvailabilityTypes"
import type { AvailabilityResponseType } from "../Types/RoomTypes"

type AvailabilityParams = {
    hotelId: number
    arrivalDate: string
    departureDate: string
    partySize: number
}

export async function getAvailability({
    hotelId,
    arrivalDate,
    departureDate,
    partySize
}: AvailabilityParams): Promise<AvailabilityResponseType> {

    const params = new URLSearchParams({
        hotelId: String(hotelId),
        arrivalDate,
        departureDate,
        partySize: String(partySize)
    })

    const response = await fetch(`/api/availability?${params}`)

    if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}