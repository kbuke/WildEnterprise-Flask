import { useForm } from "react-hook-form";
import { useFetchSpecificRoom } from "../../../../Hooks/RoomHooks/useFetchSpecificRoom";
import type { PatchDeleteCloseType } from "../../../../Types/PatchDeleteCloseType";
import type { FetchRoomType, PostRoomType } from "../../../../Types/RoomTypes";
import { PopUp } from "../../../../Components/PopUp";
import { Forms } from "../../../../Components/Forms";
import { RoomInputs } from "./RoomInputs";
import { useEffect } from "react";
import { usePatchInstance } from "../../../../Hooks/GeneralHooks/usePatchInstance";

type PatchRoomPropTypes = {
    hotelId: number,
    hotelRooms: FetchRoomType[] 
} & PatchDeleteCloseType

export function PatchRoom({
    onClose,
    name,
    id,
    hotelId,
    hotelRooms
}: PatchRoomPropTypes) {

    const { room: specificRoom } = useFetchSpecificRoom(id)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues
    } = useForm<PostRoomType>()

    useEffect(() => {
        if (specificRoom) {
            reset({
                name: specificRoom.name,
                img: specificRoom.img,
                noOfRooms: String(specificRoom.no_of_rooms),
                maxPeople: String(specificRoom.max_people),
                basePrice: String(specificRoom.base_price)
            })
        }
    }, [specificRoom, reset])

    const { mutate, isPending } = usePatchInstance<PostRoomType>()


    const onSubmit = (formData: PostRoomType) => {
        mutate({
            endpoint: `/rooms/${id}`,
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

    return (
        <PopUp
            children={
                <Forms
                    title={`Edit ${name}`}
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    fields={
                        <RoomInputs
                            postOrPatch="Patch"
                            register={register}
                            errors={errors}
                            getValues={getValues}
                            hotelId={hotelId}
                            checkArray={hotelRooms}
                        />
                    }
                    submitButtonTitle="Edit Room"
                    isPending={isPending}
                />
            }
        />
    )
}