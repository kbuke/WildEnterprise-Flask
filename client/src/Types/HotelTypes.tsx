export type FetchHotelsType = {
    id: number,
    name: string,
    slug: string,
    location: string,
    img: string,
    info: string,
    email: string
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
    id: number
    is_hotel_admin: true
}

export type PatchHotelCredentialsType = {
    newEmail: string,
    newPassword: string,
    currentPassword: string
}