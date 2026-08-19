import type { CrudRequestMessageType } from "../Types/CrudMessageTypes";
import { apiRequest } from "./apiRequests";

export async function deleteInstance(
    endpoint: string
): Promise<CrudRequestMessageType> {

    return apiRequest<CrudRequestMessageType>(
        endpoint,
        {
            method: "DELETE",
            credentials: "include"
        }
    )
}