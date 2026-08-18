import type { FetchDiscountTypes } from "../../../Types/DiscountTypes"

type HotelDiscountTablePropType = {
    discounts: FetchDiscountTypes[]
    hotelName: string
}

export function HotelDiscountTable({
    discounts,
    hotelName
}: HotelDiscountTablePropType){

    const tableHeaders = [
        "Name",
        "Code",
        "Hotel Wide",
        "Room",
        "% Off",
        "Booking Start",
        "Booking End",
        "Stay Start",
        "Stay End"
    ]

    const tableContents = (
        input: string
    ) => {
        return(
            <td
                className="p-12"
            >
                {String(input)}
            </td>
        )
    }

    return(
        <div>
            <h2>Current {hotelName} Discounts</h2>

            <table
                className="mt-10 w-[96%]"
            >
                <thead
                    className="bg-black text-white"
                >
                    <tr>
                        {tableHeaders.map((header, index) => {
                            return(
                                <th
                                    key={index}
                                    className=""
                                >
                                    {header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {discounts?.map((discount, index) => {
                        return(
                            <tr
                                key={index}
                                className="border-b"
                            >
                                {tableContents(discount.name)}
                                {tableContents(discount.code ? discount.code : "N/A")}
                                {tableContents(!discount.room_id ? "True" : "False")}
                                {tableContents(discount.room_id ? discount.room_id : "N/A")}
                                {tableContents(discount.percentage_off)}
                                {tableContents(discount.booking_start_date ? discount.booking_start_date : "N/A")}
                                {tableContents(discount.booking_end_date ? discount.booking_end_date : "N/A")}
                                {tableContents(discount.stay_start_date ? discount.stay_start_date : "N/A")}
                                {tableContents(discount.stay_end_date ? discount.stay_end_date : "N/A")}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}