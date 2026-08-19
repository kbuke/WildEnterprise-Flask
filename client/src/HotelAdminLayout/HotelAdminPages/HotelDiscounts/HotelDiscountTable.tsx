import type { FetchDiscountTypes } from "../../../Types/DiscountTypes"

type HotelDiscountTablePropType = {
    discounts: FetchDiscountTypes[]
    hotelName: string
    setDiscountAction: (
        value: "Post" | "Patch" | "Delete" | null
    ) => void

    setSelectedDiscount: (
        value: FetchDiscountTypes | null
    ) => void
}

export function HotelDiscountTable({
    discounts,
    hotelName,
    setDiscountAction,
    setSelectedDiscount
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
        "Stay End",
        "Actions"
    ]

    const tableContents = (
        input: string | number | null | undefined
    ) => {
        return (
            <td className="p-12">
                {input ?? "N/A"}
            </td>
        )
    }

    return (
        <div>
            <h2>
                Current {hotelName} Discounts
            </h2>

            <table className="mt-10 w-[96%]">
                <thead className="bg-black text-white">
                    <tr>
                        {tableHeaders.map((header) => (
                            <th
                                key={header}
                                className="p-4"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {discounts.map((discount) => (
                        <tr
                            key={discount.id}
                            className="border-b"
                        >
                            {tableContents(discount.name)}

                            {tableContents(
                                discount.code
                                    ? discount.code
                                    : "N/A"
                            )}

                            {tableContents(
                                discount.room_id
                                    ? "False"
                                    : "True"
                            )}

                            {tableContents(
                                discount.room_id
                                    ? discount.room_id
                                    : "N/A"
                            )}

                            {tableContents(
                                discount.percentage_off
                            )}

                            {tableContents(
                                discount.booking_start_date
                                    ? discount.booking_start_date
                                    : "N/A"
                            )}

                            {tableContents(
                                discount.booking_end_date
                                    ? discount.booking_end_date
                                    : "N/A"
                            )}

                            {tableContents(
                                discount.stay_start_date
                                    ? discount.stay_start_date
                                    : "N/A"
                            )}

                            {tableContents(
                                discount.stay_end_date
                                    ? discount.stay_end_date
                                    : "N/A"
                            )}

                            <td className="p-4">
                                <button
                                    className="submitFormButton mb-4 w-30"
                                    onClick={() => {
                                        setDiscountAction("Patch")
                                        setSelectedDiscount(discount)
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="redButton"
                                    onClick={() => {
                                        setSelectedDiscount(discount)
                                        setDiscountAction("Delete")
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}