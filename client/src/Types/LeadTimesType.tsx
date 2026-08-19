export type FetchLeadTimeType = {
    id: number,
    min_days: number,
    max_days?: number,
    multiplier: number,
    label: string,
    hotel_id: number,
    room_id?: number
}

export type PostPatchLeadTimeType = {
    id: number,
    label: string,
    minDays: number,
    maxDays?: number | null,
    multiplier: number,
    hotelId: number,
    roomId?: number
}