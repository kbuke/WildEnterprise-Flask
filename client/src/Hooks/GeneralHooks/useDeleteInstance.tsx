import { useMutation } from "@tanstack/react-query";
import type { CrudRequestMessageType } from "../../Types/CrudMessageTypes";
import { deleteInstance } from "../../Requests/deleteInstance";
import { queryClient } from "../../ReactQuery/queryClient";

export function useDeleteInstance() {
    return useMutation<
        CrudRequestMessageType,
        Error,
        {
            endpoint: string
            queryKeys: unknown[][]
        }
    >({
        mutationFn: ({ endpoint }) =>
            deleteInstance(endpoint),

        onSuccess: (_, variables) => {
            variables.queryKeys.forEach(queryKey => {
                queryClient.invalidateQueries({
                    queryKey
                })
            })
        }
    })
}