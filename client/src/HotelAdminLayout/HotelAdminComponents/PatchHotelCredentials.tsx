import { useForm } from "react-hook-form"
import { Forms } from "../../Components/Forms"
import { PopUp } from "../../Components/PopUp"
import { HotelCredentialsInput } from "./HotelCredentialsInput"
import { usePatchHotelCredentials } from "../../Hooks/HotelHooks/usePatchHotelCredentials"
import type { PatchHotelCredentialsType } from "../../Types/HotelTypes"

type PatchHotelCredentialsProps = {
    onClose: () => void,
    hotelId: number
}

export function PatchHotelCredentials({
    onClose, 
    hotelId
}: PatchHotelCredentialsProps){

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<PatchHotelCredentialsType>()

    const {mutate, isPending} = usePatchHotelCredentials(hotelId)

    const onSubmit = (formData: PatchHotelCredentialsType) => {
        mutate(formData, {
            onSuccess: () => onClose()
        })
    }

    return(
        <PopUp 
            children={<Forms 
                title="Edit email and password"
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                fields={<HotelCredentialsInput 
                    register={register}
                    errors={errors}
                />}
                submitButtonTitle="Edit Hotel Credentials"
                isPending={isPending}
            />}
        />
    )
}