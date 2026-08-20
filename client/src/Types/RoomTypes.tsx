import type { FetchDiscountTypes } from "./DiscountTypes"
import type { FetchLeadTimeType } from "./LeadTimesType"

export type FetchRoomType = {
    id: number
    name: string,
    img: string,
    no_of_rooms: number,
    max_people: number,
    base_price: number,
    hotel_id: number,
    hotel: [],
    room_bookings: [],
    room_rates: [],
    lead_times: FetchLeadTimeType[],
    discounts: FetchDiscountTypes[]
}

export type PostRoomType = {
    name: string,
    img: string,
    noOfRooms: string,
    maxPeople: string,
    basePrice: string,
    hotelId?: number,
}

export type RoomAvailabilityType = {
    room: FetchRoomType,
    available: number,
    contested: boolean,
    price_per_room: number,
    total_price: number
}

export type AvailabilityResponseType = {
    rooms: RoomAvailabilityType[]
}