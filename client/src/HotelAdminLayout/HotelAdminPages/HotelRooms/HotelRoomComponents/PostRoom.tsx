import { useForm } from "react-hook-form"
import type { CancelRequestType } from "../../../../Types/CancelRequestType"
import type { FetchRoomType, PostRoomType } from "../../../../Types/RoomTypes"
import { PopUp } from "../../../../Components/PopUp"
import { RoomInputs } from "./RoomInputs"
import { Forms } from "../../../../Components/Forms"
import { usePostInsatnce } from "../../../../Hooks/GeneralHooks/usePostInstance"

type PostRoomPropTypes = {
    hotelName: string,
    onClose: () => void,
    hotelId: number,
    hotelRooms: FetchRoomType[]
}

export function PostRoom({
    hotelName,
    onClose,
    hotelId,
    hotelRooms
}: PostRoomPropTypes) {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<PostRoomType>({
        shouldUnregister: true
    })

    const {
        mutate,
        isPending,
        isError,
        error
    } = usePostInsatnce<PostRoomType>()

    const onSubmit = (formData: PostRoomType) => {

        mutate({
            endpoint: "rooms",
            values: {
                ...formData,
                hotelId: hotelId
            },
            queryKey: ["hotels", formData.hotelId]
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
                    title="Add New Room"
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields={
                        <RoomInputs
                            postOrPatch="Post"
                            register={register}
                            errors={errors}
                            checkArray={hotelRooms}
                            hotelId={hotelId}
                            getValues={getValues}
                        />
                    }
                    submitButtonTitle="Create New Room"
                    isPending={isPending}
                />
            }
        />
    )
}