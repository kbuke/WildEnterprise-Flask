export type PostBookingType = {
    name: string,
    email: string,
    arrivalDate: string,
    departureDate: string,
    rooms: {
        room_id: number,
        quantity: number
    }[]
}

export type CreatedBookingType = {
    id: number,
    booking_ref: string,
    name: string
    email: string
    arrival_date: string,
    departure_date: string
}