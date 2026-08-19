import { useForm } from "react-hook-form"
import type { PostPatchLeadTimeType, FetchLeadTimeType } from "../../../../Types/LeadTimesType"
import type { FetchRoomType } from "../../../../Types/RoomTypes"
import { useEffect } from "react"
import { usePatchInstance } from "../../../../Hooks/GeneralHooks/usePatchInstance"
import { PopUp } from "../../../../Components/PopUp"
import { Forms } from "../../../../Components/Forms"
import { LeadTimeInputs } from "./LeadTimeInputs"

type PatchLeadTimesPropType = {
    chosenLeadTime: FetchLeadTimeType,
    hotelId: number,
    onClose: () => void,
    rooms: FetchRoomType[],
    leadTimes: FetchLeadTimeType[]
}

export function PatchLeadTimes({
    chosenLeadTime,
    hotelId,
    onClose,
    rooms,
    leadTimes
}: PatchLeadTimesPropType){
    const {id, label} = chosenLeadTime

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        getValues
    } = useForm<PostPatchLeadTimeType>()

    useEffect(() => {
        if(chosenLeadTime){
            reset({
                label: chosenLeadTime.label,
                roomId: chosenLeadTime.room_id,
                multiplier: chosenLeadTime.multiplier,
                minDays: chosenLeadTime.min_days,
                maxDays: chosenLeadTime.max_days
            })
        }
    }, [chosenLeadTime, reset])

    const {mutate, isPending} = usePatchInstance<PostPatchLeadTimeType>()

    const onSubmit = (formData: PostPatchLeadTimeType) => {
        mutate({
            endpoint: `/leadtimes/${id}`,
            values: formData,
            queryKeys: [
                ["hotels"]
            ]
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return(
        <PopUp 
            children={
                <Forms 
                    title={`Edit ${label}`}
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields={
                        <LeadTimeInputs 
                            postOrPatch="Patch"
                            register={register}
                            errors={errors}
                            dependantArray={rooms}
                            getValues={getValues}
                            checkArray={leadTimes}
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