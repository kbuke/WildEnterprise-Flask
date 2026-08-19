import { useState } from "react";
import { CheckBox } from "../../../../Components/CheckBox";
import { TextInputs } from "../../../../Components/textInputs";
import { validateNameWithId } from "../../../../FormErrors/validateNameWithId";
import type { FetchLeadTimeType, PostPatchLeadTimeType } from "../../../../Types/LeadTimesType";
import type { PostOrPatchType } from "../../../../Types/PostOrPatchType";
import type { FetchRoomType } from "../../../../Types/RoomTypes";
import { DropDown } from "../../../../Components/DropDown";

type LeadTimeInputProps = PostOrPatchType<
    PostPatchLeadTimeType,
    FetchRoomType,
    FetchLeadTimeType
> & {
    hotelId: number
}

export function LeadTimeInputs({
    postOrPatch,
    register,
    errors,
    dependantArray,
    getValues,
    checkArray,
    hotelId
}: LeadTimeInputProps){
    console.log(checkArray)

    const [hotelLeadTime, setHotelLeadTime] = useState<boolean>(true)

    return(
        <>
            <TextInputs 
                textType="text"
                placeholder="Please enter lead-times label/title"
                extraClasses=""
                label="Please enter lead-times label/title"
                register={register("label", {
                    required: "Label Name is required",

                    validate: (value) => {
                        if(!value) return

                        return validateNameWithId({
                            id: hotelId,
                            name: value,
                            checkArray: checkArray ?? [],
                            idKey: "hotel_id",
                            instanceCat: "Hotel",
                            catTitle: "Lead Time Label"
                        })
                    }
                })}
                error={errors.label}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter the minimum amount of days before stay-date this is in effect for"
                extraClasses=""
                label="Please enter the minimum amount of days before stay-date this is in effect for"
                register={register("minDays", {
                    required: "Please enter a value"
                })}
                error={errors.minDays}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter the maximum amount of days before stay-date this is in effect for"
                extraClasses=""
                label="Please enter the maximum amount of days before stay-date this is in effect for"
                register={register("maxDays")}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter the surge or reduction %"
                extraClasses=""
                label="Please enter the surge of reduction %"
                register={register("multiplier", {
                    required: "Please enter a value"
                })}
                error={errors.multiplier}
            />

            <div>
                <CheckBox 
                    label="Hotel Wide Lead Time?"
                    tick={hotelLeadTime}
                    setTick={() => setHotelLeadTime(!hotelLeadTime)}
                />

                {!hotelLeadTime &&
                    <DropDown 
                        label="Select Room with lead-time"
                        propArray={dependantArray ?? []}
                        disabledOption="Please select room with lead-time"
                        register={register}
                        name="roomId"
                    />
                }
            </div>
        </>
    )
}

// dont forget roomId is necessary