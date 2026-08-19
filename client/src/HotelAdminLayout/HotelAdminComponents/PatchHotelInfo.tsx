import { useForm } from "react-hook-form";
import type { PatchHotelType } from "../../Types/HotelTypes";
import { useFetchSpecificHotel } from "../../Hooks/HotelHooks/useFetchSpecificHotel";
import { PopUp } from "../../Components/PopUp";
import { Forms } from "../../Components/Forms";
import { HotelInputs } from "../../AdminLayout/AdminPages/AdminHotel/HotelInputs";
import { usePatchInstance } from "../../Hooks/GeneralHooks/usePatchInstance";
import { useEffect } from "react";

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
        reset,
        formState: {errors}
    } = useForm<PatchHotelType>()

    useEffect(() => {
        if(specificHotel){
            reset({
                name: specificHotel.name,
                img: specificHotel.img,
                info: specificHotel.info,
                location: specificHotel.location
            })
        }
    }, [specificHotel, reset])

    const {mutate, isPending} = usePatchInstance<PatchHotelType>()

    const onSubmit = (formData: PatchHotelType) => {
        mutate({
            endpoint: `hotels/${hotelId}`,
            values: formData,
            queryKeys: [
                ["hotels", hotelId],
                ["hotelAdminSession"]
            ]
        }, {
            onSuccess: () => {
                onClose();
            }
        });
    };


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
                    currentId={hotelId}
                />}
                submitButtonTitle="Edit Hotel"
                isPending={isPending}
            />}
        />
    )
}