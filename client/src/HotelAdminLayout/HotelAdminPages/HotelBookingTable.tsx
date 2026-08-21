import type { CreatedBookingType } from "../../Types/BookingTypes"

type HotelBookingTableProps = {
    name: string,
    bookings: CreatedBookingType[]
}

export function HotelBookingTable({
    name,
    bookings
}: HotelBookingTableProps){

    console.log(bookings)

    const tableHeaders = [
        "Booking Ref",
        "Cust. Name",
        "Cust. Email",
        "No. Guests",
        "Arrivale Date",
        "Departure Date",
        "Rooms",
        "Tot. Amount"
    ]

    const tableContents = (
        input: string | number | null | undefined
    ) => {
        return(
            <td
                className="text-center"
            >
                {input ?? "N/A"}
            </td>
        )
    }

    return(
        <div
            className="mt-8 mb-8"
        >
            <h1
                className="font-bold text-2xl uppercase"
            >
                Bookings at {name}
            </h1>

            <table
                className="mt-4"
            >
                <thead>
                    <tr>
                        {tableHeaders.map((header) => {
                            return(
                                <th
                                    key={header}
                                    className="px-12 py-4 bg-black text-white"
                                >
                                    {header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => {

                        const {
                            arrival_date,
                            booking_ref,
                            date_of_deposit_charge,
                            date_of_remainder_charge,
                            departure_date,
                            email,
                            name,
                            room_bookings,
                            guests
                        } = booking

                        console.log(room_bookings)

                        const lockedPrice = room_bookings.reduce((accumulator, item) => {
                            return accumulator + (item.price_locked)
                        }, 0)

                        return(
                            <tr
                                key={booking.id}
                                className="border-b h-12"
                            >
                                {tableContents(booking_ref)}
                                {tableContents(name)}
                                {tableContents(email)}
                                {tableContents(`${guests} Guests`)}
                                {tableContents(arrival_date)}
                                {tableContents(departure_date)}
                                <div></div>
                                {tableContents(`ZAR ${lockedPrice}`)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}