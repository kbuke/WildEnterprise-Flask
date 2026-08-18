import { useMutation } from "@tanstack/react-query";
import type { CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { MutationVariables } from "../../Types/MutationTypes";
import { postInstance } from "../../Requests/postInstance";
import { queryClient } from "../../ReactQuery/queryClient";

export function usePostInsatnce<T>(){
    return useMutation<
        CrudRequestMessageType,
        Error,
        MutationVariables<T>
    >({
        mutationFn: ({endpoint, values}) => postInstance(endpoint, values),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: variables.queryKey
            })
        }
    })
}
