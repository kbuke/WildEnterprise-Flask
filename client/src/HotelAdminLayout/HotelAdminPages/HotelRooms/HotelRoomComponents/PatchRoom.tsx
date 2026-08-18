import { useForm } from "react-hook-form";
import { useFetchSpecificRoom } from "../../../../Hooks/RoomHooks/useFetchSpecificRoom";
import type { PatchDeleteCloseType } from "../../../../Types/PatchDeleteCloseType";
import type { PostRoomType } from "../../../../Types/RoomTypes";
import { usePatchRoom } from "../../../../Hooks/RoomHooks/usePatchRoom";
import { PopUp } from "../../../../Components/PopUp";
import { Forms } from "../../../../Components/Forms";
import { RoomInputs } from "./RoomInputs";
import { useEffect } from "react";

export function PatchRoom({
    onClose,
    name,
    id
}: PatchDeleteCloseType) {

    const { room: specificRoom } = useFetchSpecificRoom(id)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
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

    const { mutate, isPending } = usePatchRoom(id)

    const onSubmit = (formData: PostRoomType) => {
        mutate(formData, {
            onSuccess: () => onClose()
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
                        />
                    }
                    submitButtonTitle="Edit Room"
                    isPending={isPending}
                />
            }
        />
    )
}