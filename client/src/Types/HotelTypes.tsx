import type { FetchDiscountTypes } from "./DiscountTypes"
import type { FetchLeadTimeType } from "./LeadTimesType"
import type { FetchRoomType } from "./RoomTypes"

export type FetchHotelsType = {
    id: number,
    name: string,
    slug: string,
    location: string,
    img: string,
    info: string,
    email: string,

    discounts: FetchDiscountTypes[],
    rooms: FetchRoomType[],
    lead_times: FetchLeadTimeType[]
}

export type PostHotelType = {
    name: string,
    location: string,
    img: string,
    info: string,
    email: string, 
    password: string
}

export type PatchHotelType = {
    name: string,
    location: string,
    img: string,
    info: string
}

export type CheckHotelSessionType = {
    is_hotel_admin: boolean
    lead_times: []
    discounts: []
    reviews: []
    rooms: []
} & FetchHotelsType

export type PatchHotelCredentialsType = {
    newEmail: string,
    newPassword: string,
    currentPassword: string
}

export type HotelRoomType = Pick<
    FetchRoomType,
    "name" | "img" | "no_of_rooms" | "max_people" | "base_price" | "hotel_id" | "id"
>