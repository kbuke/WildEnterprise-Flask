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
    lead_times: [],
    discounts: []
}

export type PostRoomType = {
    name: string,
    img: string,
    noOfRooms: string,
    maxPeople: string,
    basePrice: string,
    hotelId?: number,
}
