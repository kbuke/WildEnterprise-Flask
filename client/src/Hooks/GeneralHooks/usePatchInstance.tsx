import { useMutation } from "@tanstack/react-query";
import type { CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import { patchInstance } from "../../Requests/patchInstance";
import { queryClient } from "../../ReactQuery/queryClient";
import type { MutationVariables } from "../../Types/MutationTypes";

export function usePatchInstance<T>() {
    return useMutation<
        CrudRequestMessageType,
        Error,
        MutationVariables<T>
    >({
        mutationFn: ({ endpoint, values }) =>
            patchInstance(endpoint, values),

        onSuccess: (_, variables) => {
            variables.queryKeys.forEach(queryKey => {
                queryClient.invalidateQueries({
                    queryKey
                })
            })
        }
    })
}
