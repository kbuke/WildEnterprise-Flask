import { useForm } from "react-hook-form";
import type { PatchDeleteCloseType } from "../../../../Types/PatchDeleteCloseType";
import { useDeleteInstance } from "../../../../Hooks/GeneralHooks/useDeleteInstance";
import { PopUp } from "../../../../Components/PopUp";
import { Forms } from "../../../../Components/Forms";

export function DeleteLeadTimes({
    onClose,
    name,
    id
}: PatchDeleteCloseType){
    const {handleSubmit} = useForm()

    const {mutate, isPending, isError, error} = useDeleteInstance()

    const onSubmit = () => {
        mutate({
            endpoint: `/leadtimes/${id}`,
            queryKeys:[
                ["hotels"],
                ["hotelAdminSession"]
            ]
        }, {
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