import { useMutation } from "@tanstack/react-query";
import type { CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import type { MutationVariables } from "../../Types/MutationTypes";
import { postInstance } from "../../Requests/postInstance";
import { queryClient } from "../../ReactQuery/queryClient";

export function usePostInsatnce<
    TRequest,
    TResponse = CrudRequestMessageType
>() {
    return useMutation<
        TResponse,
        Error,
        MutationVariables<TRequest>
    >({
        mutationFn: ({ endpoint, values }) =>
            postInstance<TRequest, TResponse>(endpoint, values),

        onSuccess: (_, variables) => {
            variables.queryKeys.forEach(queryKey => {
                queryClient.invalidateQueries({
                    queryKey
                })
            })
        }
    })
}



