import { useForm } from "react-hook-form";
import type { CancelRequestType } from "../../../Types/CancelRequestType";
import type { FetchHotelsType, PostHotelType } from "../../../Types/HotelTypes";
import { PopUp } from "../../../Components/PopUp";
import { Forms } from "../../../Components/Forms";
import { HotelInputs } from "./HotelInputs";
import { usePostHotel } from "../../../Hooks/HotelHooks/usePostHotel";

type PostHotelProps = {
    hotelArray: FetchHotelsType[]
} & CancelRequestType

export function PostHotel({
    onClose,
    hotelArray
}: PostHotelProps){
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<PostHotelType>({
        shouldUnregister: true
    })

    const {mutate, isPending, isError, error} = usePostHotel()

    const onSubmit = (formData: PostHotelType) => {
        mutate(formData, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return(
        <PopUp 
            children={<Forms 
                title={"Add New Hotel"}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                fields={<HotelInputs 
                    postOrPatch={"Post"}
                    register={register}
                    errors={errors}
                    arrayCheck={hotelArray}
                />}
                submitButtonTitle="Create New Hotel"
                isPending = {isPending}
            />}
        />
    )
}