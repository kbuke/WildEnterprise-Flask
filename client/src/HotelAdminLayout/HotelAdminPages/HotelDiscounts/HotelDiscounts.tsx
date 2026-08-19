import { useState } from "react"
import { FindHotel } from "../../HotelAdminComponents/FindHotel"
import { PostDiscount } from "./PostDiscount"
import { HotelDiscountTable } from "./HotelDiscountTable"
import type { FetchDiscountTypes } from "../../../Types/DiscountTypes"
import { PatchDiscount } from "./PatchDiscount"
import { DeleteDiscount } from "./DeleteDiscount"

export function HotelDiscounts(){
    const [discountAction, setDiscountAction] = useState<"Post" | "Patch" | "Delete" | null>()
    const [selectedDiscount, setSelectedDiscount] = useState<FetchDiscountTypes | null>()

    const hotel = FindHotel()

    const discounts = hotel?.discounts
    const hotelName = hotel?.name
    const hotelId = hotel?.id
    const hotelRooms = hotel?.rooms

    return(
        <div
            className="py-12"
        >
            {discountAction === "Post" && hotelId && hotelRooms &&
                <PostDiscount 
                    hotelName={hotelName!}
                    onClose={() => setDiscountAction(null)}
                    hotelId={hotelId}
                    hotelRooms={hotelRooms}
                    discounts={discounts ?? []}
                />
            }

            {discountAction === "Patch" && selectedDiscount && hotelId && hotelRooms && discounts &&
                <PatchDiscount 
                    chosenDiscount={selectedDiscount}
                    hotelId={hotelId}
                    onClose={() => {
                        setDiscountAction(null)
                        setSelectedDiscount(null)
                    }}
                    hotelRooms={hotelRooms}
                    discounts={discounts}
                />
            }

            {discountAction === "Delete" && selectedDiscount &&
                <DeleteDiscount 
                    onClose={() => {
                        setDiscountAction(null)
                        setSelectedDiscount(null)
                    }}
                    name={selectedDiscount.name}
                    id={selectedDiscount.id}
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


            {discounts?.length && !discounts &&
                <p
                    className="mt-4"
                >
                    No discounts to display
                </p>
            }

            {discounts && hotelName && hotelId &&
                <HotelDiscountTable 
                    discounts={discounts}
                    hotelName={hotelName}
                    setDiscountAction={setDiscountAction}
                    setSelectedDiscount={setSelectedDiscount}
                />
            }
        </div>
    )
}