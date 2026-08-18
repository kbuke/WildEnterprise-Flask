import { useState } from "react"
import { FindHotel } from "../../HotelAdminComponents/FindHotel"
import { PostDiscount } from "./PostDiscount"
import { HotelDiscountTable } from "./HotelDiscountTable"

export function HotelDiscounts(){
    const [discountAction, setDiscountAction] = useState<"Post" | "Patch" | "Delete" | null>()

    const hotel = FindHotel()

    const discounts = hotel?.discounts
    const hotelName = hotel?.name
    const hotelId = hotel?.id
    const hotelRooms = hotel?.rooms

    return(
        <div
            className="py-12"
        >
            {discountAction === "Post" &&
                <PostDiscount 
                    hotelName={hotelName!}
                    onClose={() => setDiscountAction(null)}
                    hotelId={hotelId!}
                    hotelRooms={hotelRooms!}
                />
            }


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
                    onClick={() => setDiscountAction("Post")}
                >
                    Add Discount
                </button>
            </div>

            {discounts?.length == 0 && !discounts
                ? <p
                    className="mt-4"
                >
                    No Discounts to display
                </p>

                : <HotelDiscountTable 
                    discounts={discounts!}
                    hotelName={hotelName!}
                />
            }
        </div>
    )
}