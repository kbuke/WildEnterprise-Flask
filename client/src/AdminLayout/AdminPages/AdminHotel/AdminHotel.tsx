import { useState } from "react"
import { LoadingIcon } from "../../../Components/LoadingIcon"
import { useFetchHotels } from "../../../Hooks/HotelHooks/useFetchHotels"
import { AdminCategoriesLayout } from "../../AdminComponents/AdminCategoriesLayout"
import { PostHotel } from "./PostHotel"

export function AdminHotel(){
    const [addHotel, setAddHotel] = useState<Boolean>(false)

    const {hotels, isError, isLoading, error, isPending} = useFetchHotels()

    console.log(addHotel)

    return(
        <section>
            {isPending && <LoadingIcon />}

            <AdminCategoriesLayout 
                categoryTitle="Hotels"
                instanceArrays={hotels}
                setAction={() => setAddHotel(true)}
            />

            {addHotel &&
                <PostHotel 
                    onClose={() => setAddHotel(false)}
                />
            }
        </section>
    )
}