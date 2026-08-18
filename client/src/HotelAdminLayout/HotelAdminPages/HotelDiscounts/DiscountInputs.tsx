import { useState } from "react";
import { TextInputs } from "../../../Components/textInputs";
import type { PostPatchDiscountType } from "../../../Types/DiscountTypes";
import type { PostOrPatchType } from "../../../Types/PostOrPatchType";
import { CheckBox } from "../../../Components/CheckBox";
import { DropDown } from "../../../Components/DropDown";
import type { FetchRoomType } from "../../../Types/RoomTypes";
import { DateInputs } from "../../../Components/DateInputs";
import { validateDateRange } from "../../../FormErrors/validateDateRange";

export function DiscountInputs({
    postOrPatch,
    register,
    errors,
    dependantArray,
    getValues
}: PostOrPatchType<PostPatchDiscountType, FetchRoomType>){

    const [stayDateDiscount, setStayDateDiscount] = useState<boolean>(true)
    const [hotelDiscount, setHotelDiscount] = useState<boolean>(true)

    return(
        <>
            <TextInputs 
                textType="text"
                placeholder="Please enter discount title"
                extraClasses=""
                label="Enter discount title"
                register={register("name", {
                    required: "Discount name is required"
                })}
                error={errors.name}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter code"
                extraClasses=""
                label="Enter discount code"
                register={register("code")}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter discount (between 0.01 and 0.99)"
                extraClasses=""
                label="Enter % Off"
                register={register("percentageOff", {
                    required: "Discount amount is required"
                })}
            />

            <div>
                <CheckBox 
                    label="Hotel Wide Discount?"
                    tick={hotelDiscount}
                    setTick={() => setHotelDiscount(!hotelDiscount)}
                />

                {!hotelDiscount &&
                    <DropDown 
                        label="Select Room with the discount"
                        propArray={dependantArray ?? []}
                        disabledOption="Please select room with the discount"
                        register={register}
                        name="roomId"
                    />
                }
            </div>

            <div>
                <CheckBox 
                    label="Discount is based on Date of Stay"
                    tick={stayDateDiscount}
                    setTick={() => setStayDateDiscount(!stayDateDiscount)}
                />

                <DateInputs 
                    inputType="Start Date"
                    label={stayDateDiscount 
                        ? "Enter Stay Date Arrival"
                        : "Enter Booking Date Start"
                    }
                    extraClasses=""
                    register={register(
                        stayDateDiscount ? "stayStart" : "bookingStart",
                        {
                            required: stayDateDiscount
                                ? "Please enter Stay Date"
                                : "Please enter Booking Start Date",
                            
                            validate: (value) => {
                                if(!value) return true

                                return validateDateRange({
                                    startDate: value
                                })
                            }
                        }
                    )}
                    error = {
                        stayDateDiscount
                            ? errors.stayStart
                            : errors.bookingStart
                    }
                />

                <DateInputs 
                    inputType="End Date"
                    label={stayDateDiscount 
                        ? "Enter Stay Date Exit"
                        : "Enter Booking Date End"
                    }
                    extraClasses=""
                    register={register(
                        stayDateDiscount ? "stayEnd" : "bookingEnd",
                        {
                            required: stayDateDiscount
                                ? "Please enter Stay Exit Date"
                                : "Please enter Booking End Date",
                            
                            validate: (value) => {
                                const startDate = stayDateDiscount 
                                    ? getValues("stayStart")
                                    : getValues("bookingStart")

                                if(!value || !startDate) return true
                                
                                return validateDateRange({
                                    startDate,
                                    endDate: value
                                })
                            }
                        }
                    )}
                    error={
                        stayDateDiscount
                            ? errors.stayEnd
                            : errors.bookingEnd   
                    }
                />
            </div>
        </>
    )
}