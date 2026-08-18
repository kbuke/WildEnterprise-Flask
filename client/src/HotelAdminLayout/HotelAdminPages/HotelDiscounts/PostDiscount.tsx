import { useForm } from "react-hook-form"
import type { PostPatchDiscountType } from "../../../Types/DiscountTypes"
import { usePostInsatnce } from "../../../Hooks/GeneralHooks/usePostInstance"
import { PopUp } from "../../../Components/PopUp"
import { Forms } from "../../../Components/Forms"
import { DiscountInputs } from "./DiscountInputs"
import type { FetchRoomType } from "../../../Types/RoomTypes"

type PostDiscountPropTypes = {
    hotelName: string
    onClose: () => void
    hotelId: number
    hotelRooms: FetchRoomType[]
}


export function PostDiscount({
    hotelName,
    onClose,
    hotelId,
    hotelRooms
}: PostDiscountPropTypes){

    console.log(hotelRooms)

    const {
        register,
        getValues,
        handleSubmit,
        formState: {errors}
    } = useForm<PostPatchDiscountType>({
        shouldUnregister: true
    })

    const {
        mutate,
        isPending,
        isError,
        error
    } = usePostInsatnce<PostPatchDiscountType>()

    const onSubmit = (formData: PostPatchDiscountType) => {
        mutate({
            endpoint: "discounts",
            values: {
                ...formData,
                code: formData.code || null,
                stayStart: formData.stayStart || null,
                stayEnd: formData.stayEnd || null,
                bookingStart: formData.bookingStart || null,
                bookingEnd: formData.bookingEnd || null,
                hotelId: hotelId
            },
            queryKey: ["hotels", formData.hotelId]
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return(
        <PopUp 
            children = {
                <Forms 
                    title="Add New Discount"
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields={
                        <DiscountInputs 
                            postOrPatch="Post"
                            register={register}
                            errors={errors}
                            dependantArray={hotelRooms}
                            getValues={getValues}
                        />
                    }
                    submitButtonTitle="Create New Discount"
                    isPending={isPending}
                />
            }
        />
    )
}