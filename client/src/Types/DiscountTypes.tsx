import type { FetchRoomType } from "./RoomTypes"

export type FetchDiscountTypes = {
    name: string,
    code?: string,
    percentage_off: number,
    booking_start_date?: string,
    booking_end_date?: string,
    stay_start_date?: string,
    stay_end_date?: string,
    hotel_Id: number,
    room_id?: number
}

export type PostPatchDiscountType = {
    name: string,
    code?: string | null,
    bookingStart?: string | null,
    bookingEnd?: string | null,
    stayStart?: string | null,
    stayEnd?: string | null,
    roomId?: number | null,
    percentageOff: number,
    hotelId: number
}