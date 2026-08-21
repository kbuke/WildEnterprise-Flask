import { Link } from "react-router-dom"
import { LoadingIcon } from "../../Components/LoadingIcon"
import { useCheckHotelAdminSession } from "../../Hooks/HotelHooks/useCheckHotelAdminSession"
import { HotelBookingTable } from "./HotelBookingTable"

type HotelEditableObjectType = {
    tag: string,
    icon: string,
    info: string,
    link: string
}

export function HotelAdmonDashboard(){
    const {data, isLoading} = useCheckHotelAdminSession()
    if(isLoading){
        return <LoadingIcon />
    }

    if(!data?.is_hotel_admin){
        return null
    }

    const {
        id,
        name, 
        slug,
        img,
        bookings
    } = data

    console.log(data)

    const hotelEditablesObject = ({
        tag,
        icon,
        info,
        link
    }: HotelEditableObjectType) => {
        return(
            {
                tag: tag,
                icon: icon,
                info: info,
                link: link
            }
        )
    }

    const hotelEditableArray = [
        hotelEditablesObject({
            tag: "Discounts", 
            icon:"/discounts.png",
            info: "Create, delete, and edit existing discounts for your hotel.",
            link: `/${slug}/discounts`
        }),

        hotelEditablesObject({
            tag: "Rooms",
            icon: "/rooms.png",
            info:"Create, edit and delete information on your rooms.",
            link: `/${slug}/rooms`
        }),

        hotelEditablesObject({
            tag: "Lead Times",
            icon: "/leadTimes.png",
            info:"Set rates dependant on the time given before guests arrival",
            link: `/${slug}/leadtimes`
        })
    ]

    
    return(
        <div
            className="py-6 px-12"
        >
            <img 
                src={img}
                className="h-50 w-50 rounded-full justify-self-center mb-10"
            />
            <h1
                className="text-center mb-10 uppercase font-bold text-3xl"
            >
                Welcome {name}
            </h1>

            <div
                className="grid grid-cols-3 gap-10"
            >
                {hotelEditableArray.map((hotelDependant, index) => {
                    const {
                        tag, icon, info, link
                    } = hotelDependant

                    return(
                        <Link
                            key={index}
                            className="bg-gray-200 p-10 flex flex-col items-center rounded-lg cursor-pointer"
                            to={link}
                            state={{id}}
                        >
                            <img 
                                src={icon}
                                className="h-24"
                            />

                            <h2
                                className="font-bold uppercase text-xl mt-4"
                            >
                                {tag}
                            </h2>

                            <p
                                className="mt-2"
                            >
                                {info}
                            </p>
                        </Link>
                    )
                })}
            </div>

            {bookings?.length > 0 &&
                <HotelBookingTable 
                    name={name}
                    bookings={bookings}
                />
            }

            {bookings?.length === 0 && 
                <p>No Bookings to Display</p>
            }
        </div>
    )
}