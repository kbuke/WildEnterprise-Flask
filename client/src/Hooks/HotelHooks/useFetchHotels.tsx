import { useQuery } from "@tanstack/react-query";
import type { FetchHotelsType } from "../../Types/HotelTypes";

async function fetchHotels(): Promise<FetchHotelsType[]> {
    const response = await fetch("/api/hotels")

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchHotels(){
    const {
        data = [],
        error,
        isError,
        isLoading,
        isPending
    } = useQuery<FetchHotelsType[], Error>({
        queryKey: ["hotels"],
        queryFn: fetchHotels
    })

    return {
        hotels: data,
        error,
        isError,
        isLoading,
        isPending
    }
}