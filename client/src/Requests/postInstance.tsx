import type { CrudRequestMessageType } from "../Types/CrudMessageTypes";
import { apiRequest } from "./apiRequests";

export async function postInstance<TRequest, TResponse = CrudRequestMessageType>(
    endpoint: string,
    values: TRequest
): Promise<TResponse> {
    return apiRequest<TResponse>(
        endpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }
    )
}

// export async function postInstance<T>(
//     endpoint: string,
//     values: T
// ): Promise<CrudRequestMessageType> {
//     return apiRequest<CrudRequestMessageType>(
//         endpoint,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(values)
//         }
//     )
// }