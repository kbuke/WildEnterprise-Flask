import { useMutation } from "@tanstack/react-query";
import type { CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import { patchInstance } from "../../Requests/patchInstance";
import { queryClient } from "../../ReactQuery/queryClient";

export function usePatchInstance<T>(){
    return useMutation<
        CrudRequestMessageType,
        Error,
        {
            endpoint: string
            values: T
            queryKeys: unknown[][]
        }
    >({
        mutationFn: ({endpoint, values}) =>
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
