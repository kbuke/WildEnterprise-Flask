import { useForm } from "react-hook-form";
import type { CancelRequestType } from "../../../../Types/CancelRequestType";
import type { PostRoomType } from "../../../../Types/RoomTypes";
import { usePostRoom } from "../../../../Hooks/RoomHooks/usePostRoom";
import { PopUp } from "../../../../Components/PopUp";
import { RoomInputs } from "./RoomInputs";
import { Forms } from "../../../../Components/Forms";

type HotelIdType = {
    id?: number
}

type PostRoomProps = CancelRequestType & HotelIdType

export function PostRoom({
    id,
    onClose
}: PostRoomProps){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PostRoomType>({
        shouldUnregister: true
    })

    const {mutate, isPending, isError, error} = usePostRoom()

    const onSubmit = (formData: PostRoomType) => {
        mutate({
            ...formData,
            hotelId: id
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return(
        <PopUp 
            children={<Forms 
                title={"Add New Room"}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                fields={
                    <RoomInputs 
                        postOrPatch="Post"
                        register={register}
                        errors={errors}
                    />
                }
                submitButtonTitle="Create New Room"
                isPending={isPending}
            />}
        />
    )
}