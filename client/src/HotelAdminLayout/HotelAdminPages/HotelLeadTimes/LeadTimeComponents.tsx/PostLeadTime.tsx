import { useForm } from "react-hook-form"
import type { FetchLeadTimeType, PostPatchLeadTimeType } from "../../../../Types/LeadTimesType"
import { usePostInsatnce } from "../../../../Hooks/GeneralHooks/usePostInstance"
import { PopUp } from "../../../../Components/PopUp"
import { Forms } from "../../../../Components/Forms"
import { LeadTimeInputs } from "./LeadTimeInputs"
import type { FetchRoomType } from "../../../../Types/RoomTypes"

type PostLeadTimeProps = {
    hotelId: number,
    hotelName: string,
    hotelRooms: FetchRoomType[],
    leadTimes: FetchLeadTimeType[],
    onClose: () => void
}

export function PostLeadTime({
    hotelId,
    hotelName,
    hotelRooms,
    leadTimes,
    onClose
}: PostLeadTimeProps){

    const {
        register,
        getValues,
        handleSubmit,
        formState: {errors}
    } = useForm<PostPatchLeadTimeType>({
        shouldUnregister: true
    })

    const {
        mutate, isPending, isError, error
    } = usePostInsatnce<PostPatchLeadTimeType>()

    const onSubmit = (formData: PostPatchLeadTimeType) => {
        mutate({
            endpoint: "leadtimes",
            values: {
                ...formData,
                maxDays: formData.maxDays || null
            },
            queryKeys: [
                ["hotels", hotelId]
            ]
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
                    title={`Add New Lead-Time to ${hotelName}`}
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields = {
                        <LeadTimeInputs 
                            postOrPatch="Post"
                            register={register}
                            errors={errors}
                            dependantArray={hotelRooms}
                            getValues={getValues}
                            checkArray={leadTimes} //lead times 
                            hotelId={hotelId}
                        />
                    }
                    submitButtonTitle="Create New Lead Time"
                    isPending={isPending}
                />
            }
        />
    )
}