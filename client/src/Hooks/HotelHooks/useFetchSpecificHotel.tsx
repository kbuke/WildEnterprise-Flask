import { useQuery } from "@tanstack/react-query";
import type { FetchHotelsType } from "../../Types/HotelTypes";

async function getSpecificHotel(id: number): Promise<FetchHotelsType>{
    const response = await fetch(`/api/hotels/${id}`)

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchSpecificHotel(id:number){
    const{
        data, 
        error,
        isError,
        isLoading,
        isPending
    } = useQuery<FetchHotelsType, Error>({
        queryKey: ["hotels", id],
        queryFn: () => getSpecificHotel(id)
    })

    return{
        hotel: data,
        error,
        isError,
        isLoading,
        isPending
    }
}