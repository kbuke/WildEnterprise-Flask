export type PostBookingType = {
    name: string,
    email: string,
    arrivalDate: string,
    departureDate: string,
    rooms: {
        room_id: number,
        quantity: number
    }[]
    hotelId: number
    partySize: number
}

export type CreatedBookingType = {
    id: number,
    booking_ref: string,
    name: string
    email: string
    arrival_date: string,
    departure_date: string,
    date_of_deposit_charge: string,
    date_of_remainder_charge: string
    room_bookings: CreatedRoomBooking[]
    guests: number
}

export type CreatedRoomBooking = {
    booking_id: number 
    price_locked: number 
    quantity: number 
    room_id: number 
    unit_price: number
}