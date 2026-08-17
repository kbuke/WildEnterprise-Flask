import { FindHotel } from "../../HotelAdminComponents/FindHotel"

export function HotelDiscounts(){

    const hotel = FindHotel()

    const discounts = hotel?.discounts
    const hotelName = hotel?.name



    console.log(discounts)

    return(
        <div
            className="py-12"
        >
            <div
                className="flex items-center gap-12 py-4 border-b w-[96%]"
            >
                <h2
                    className="uppercase font-bold text-2xl"
                >
                    {hotelName} Discounts
                </h2>

                <button
                    className="submitFormButton"
                >
                    Add Discount
                </button>
            </div>

            {discounts?.length == 0 &&
                <p
                    className="mt-4"
                >
                    No Discounts to display
                </p>
            }
        </div>
    )
}