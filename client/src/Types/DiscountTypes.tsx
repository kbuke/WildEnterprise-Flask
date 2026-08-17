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