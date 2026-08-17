import { useForm } from "react-hook-form";
import { Forms } from "../../../../Components/Forms";
import { PopUp } from "../../../../Components/PopUp";
import type { PatchDeleteCloseType } from "../../../../Types/PatchDeleteCloseType";
import { useDeleteRoom } from "../../../../Hooks/RoomHooks/useDeleteRoom";

export function DeleteRoom({
    onClose,
    name,
    id
}: PatchDeleteCloseType){
    const {handleSubmit} = useForm()

    const {mutate, isPending, isError, error} = useDeleteRoom(id)

    const onSubmit = () => {
        mutate(undefined, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return(
        <PopUp 
            children={<Forms 
                title={`Delete ${name}?`}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                submitButtonTitle={`Delete ${name}`}
                isPending={isPending}
            />}
        />
    )
}