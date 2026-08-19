import type { CrudRequestMessageType } from "../Types/CrudMessageTypes";
import { apiRequest } from "./apiRequests";

export async function patchInstance<T>(
    endpoint: string,
    values: T,
): Promise<CrudRequestMessageType>{
    return apiRequest<CrudRequestMessageType>(
        endpoint,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(values)
        }
    )
}