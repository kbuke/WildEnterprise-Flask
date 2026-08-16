import { useForm } from "react-hook-form";
import type { PatchHotelType } from "../../Types/HotelTypes";
import { useFetchSpecificHotel } from "../../Hooks/HotelHooks/useFetchSpecificHotel";
import { PopUp } from "../../Components/PopUp";
import { Forms } from "../../Components/Forms";
import { usePatchHotel } from "../../Hooks/HotelHooks/usePatchHotel";
import { HotelInputs } from "../../AdminLayout/AdminPages/AdminHotel/HotelInputs";

type PatchHotelInfoType = {
    onClose: () => void,
    hotelId: number
}

export function PatchHotelInfo({
    onClose,
    hotelId
}: PatchHotelInfoType){
    
    const specificData = useFetchSpecificHotel(hotelId)
    const specificHotel = specificData.hotel

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PatchHotelType>({
        defaultValues: {
            name: specificHotel?.name,
            location: specificHotel?.location,
            img: specificHotel?.img,
            info: specificHotel?.info
        }
    })

    const {mutate, isPending} = usePatchHotel(hotelId)

    const onSubmit = (formData: PatchHotelType) => {
        mutate(formData, {
            onSuccess: () => onClose()
        })
    }

    return(
        <PopUp 
            children={<Forms 
                title={`Edit Hotel Info`}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                fields={<HotelInputs 
                    postOrPatch="Patch"
                    register={register}
                    errors={errors}
                />}
                submitButtonTitle="Edit Hotel"
                isPending={isPending}
            />}
        />
    )
}