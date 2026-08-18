import type { CrudRequestErrorType } from "../Types/CrudMessageTypes"

export async function apiRequest<TResponse>(
    endpoint: string,
    options?: RequestInit
): Promise<TResponse> {
    const response = await fetch(`/api/${endpoint}`, {
        credentials: "include",
        ...options
    })

    if(!response.ok){
        const errorBody: CrudRequestErrorType = await response.json().catch(() => ({
            error: "Something went wrong, please try again"
        }))

        throw new Error(errorBody.error)
    }
    return response.json()
}