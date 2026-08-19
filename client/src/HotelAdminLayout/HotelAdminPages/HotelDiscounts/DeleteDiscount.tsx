import { useForm } from "react-hook-form";
import type { PatchDeleteCloseType } from "../../../Types/PatchDeleteCloseType";
import { useDeleteInstance } from "../../../Hooks/GeneralHooks/useDeleteInstance";
import { PopUp } from "../../../Components/PopUp";
import { Forms } from "../../../Components/Forms";

export function DeleteDiscount({
    onClose,
    name,
    id
}: PatchDeleteCloseType){
    const {handleSubmit} = useForm()

    const {mutate, isPending, isError, error} = useDeleteInstance()

    const onSubmit = () => {
        mutate({
            endpoint: `/discounts/${id}`,
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
            children={<Forms 
                title={`Delete ${name}`}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
                submitButtonTitle={`Delete ${name}`}
                isPending={isPending}
            />}
        />
    )
}