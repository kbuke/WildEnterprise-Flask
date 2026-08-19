import { useForm } from "react-hook-form"
import type { FetchDiscountTypes, PostPatchDiscountType } from "../../../Types/DiscountTypes"
import { useEffect } from "react"
import { usePatchInstance } from "../../../Hooks/GeneralHooks/usePatchInstance"
import { PopUp } from "../../../Components/PopUp"
import { Forms } from "../../../Components/Forms"
import { DiscountInputs } from "./DiscountInputs"
import type { FetchRoomType } from "../../../Types/RoomTypes"

type PatchDiscountPropType = {
    chosenDiscount: FetchDiscountTypes
    hotelId: number,
    onClose: () => void,
    hotelRooms: FetchRoomType[],
    discounts: FetchDiscountTypes[]
}

export function PatchDiscount({
    chosenDiscount,
    hotelId,
    onClose,
    hotelRooms,
    discounts
}: PatchDiscountPropType){
    console.log(chosenDiscount)

    const {id, name} = chosenDiscount

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        getValues
    } = useForm<PostPatchDiscountType>()

    useEffect(() => {
        if(chosenDiscount){
            reset({
                name: name,
                code: chosenDiscount.code,
                percentageOff: chosenDiscount.percentage_off,
                roomId: chosenDiscount.room_id,
                stayStart: chosenDiscount.stay_start_date,
                stayEnd: chosenDiscount.stay_end_date,
                bookingStart: chosenDiscount.booking_start_date,
                bookingEnd: chosenDiscount.booking_end_date
            })
        }
    }, [chosenDiscount, reset])

    const {
        mutate,
        isPending
    } = usePatchInstance<PostPatchDiscountType>()

    const onSubmit = (formData: PostPatchDiscountType) => {
        mutate({
            endpoint: `/discounts/${id}`,
            values: formData,
            queryKeys:[
                ["hotels"]
            ]
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <PopUp 
            children={
                <Forms 
                    title={`Edit ${name}`}
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields={
                        <DiscountInputs 
                            postOrPatch="Patch"
                            register={register}
                            errors={errors}
                            dependantArray={hotelRooms}
                            getValues={getValues}
                            checkArray={discounts}
                            hotelId={hotelId}
                        />
                    }
                    submitButtonTitle="Confirm"
                    isPending={isPending}
                />
            }
        />
    )
}