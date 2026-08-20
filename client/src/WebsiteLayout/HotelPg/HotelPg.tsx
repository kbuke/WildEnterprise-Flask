import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useFetchSpecificHotel } from "../../Hooks/HotelHooks/useFetchSpecificHotel"
import { useForm } from "react-hook-form"
import { DateInputs } from "../../Components/DateInputs"
import { TextInputs } from "../../Components/textInputs"
import { useAvailability } from "../../Hooks/GeneralHooks/useAvailability"
import { NumberRoomSelector } from "./Components/NumberRoomSelector"
import { ConfirmBooking } from "./Components/ConfirmBooking"
import { PopUp } from "../../Components/PopUp"

type AvailabilityFormType = {
    arrivalDate: string
    departureDate: string
    partySize: number
}

export function HotelPg(){

    const [selectedRooms, setSelectedRooms] =
        useState<Record<number, number>>({})
    
    const [confirmBooking, setConfirmBooking] = useState<boolean>(false)

    const { id } = useParams()

    const hotelId = Number(id)

    const {
        hotel: selectedHotel
    } = useFetchSpecificHotel(hotelId)

    const {
        register,
        handleSubmit,
        watch
    } = useForm<AvailabilityFormType>()

    const [searchParams, setSearchParams] =
        useState<AvailabilityFormType | null>(null)

    const {
        data: availability,
        isLoading,
        isError
    } = useAvailability(
        searchParams
            ? {
                hotelId,
                ...searchParams,
                partySize: Number(searchParams.partySize)
            }
            : null
    )

    const onSubmit = (formData: AvailabilityFormType) => {
        setSearchParams(formData)

        // Reset previous room selections
        setSelectedRooms({})
    }

    /*
        Calculate the total cost of ALL selected rooms.

        Example:

        Double Room:
        2 × R800 = R1600

        Single Room:
        1 × R500 = R500

        Total = R2100
    */
    const totalRoomPrice = useMemo(() => {

        if (!availability) {
            return 0
        }

        return availability.rooms.reduce(
            (total, roomAvailability) => {

                const quantity =
                    selectedRooms[roomAvailability.room.id] ?? 0

                return total +
                    quantity * roomAvailability.total_price
            },
            0
        )

    }, [availability, selectedRooms])

    const arrivalDate = watch("arrivalDate")
    const departureDate = watch("departureDate")
    const guests = watch("partySize")

    console.log(`Arrival Date: ${arrivalDate} to Departure Date ${departureDate}`)

    return(
        <section>
            {confirmBooking && selectedHotel &&
                <PopUp 
                    children={
                        <ConfirmBooking 
                            arrivalDate={arrivalDate}
                            departureDate={departureDate}
                            hotelName={selectedHotel?.name}
                            guests={guests}
                            totalPrice={totalRoomPrice}
                            selectedRooms = {selectedRooms}
                        />
                    }
                />
            }

            <h1>
                Welcome {selectedHotel?.name}
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-blue-800/80 w-full text-white p-12"
            >

                <h1 className="mb-6">
                    Book A Stay at {selectedHotel?.name}
                </h1>

                <DateInputs
                    label="Arrival Date"
                    extraClasses=""
                    register={register("arrivalDate", {
                        required: "Arrival date is required"
                    })}
                    inputType="Start Date"
                />

                <DateInputs
                    label="Departure Date"
                    extraClasses=""
                    register={register("departureDate", {
                        required: "Departure date is required"
                    })}
                    inputType="End Date"
                />

                <TextInputs
                    textType="text"
                    placeholder="Please enter how many people"
                    extraClasses="border-b w-160"
                    register={register("partySize", {
                        required: "Party size is required"
                    })}
                />

                <button
                    type="submit"
                    className="submitFormButton"
                >
                    Check Availability
                </button>

            </form>

            {isLoading &&
                <p>Checking availability...</p>
            }

            {isError &&
                <p>Unable to check availability.</p>
            }

            {availability &&
                <div
                    className="px-12 flex flex-col"
                >

                    <h2>
                        Available Rooms
                    </h2>

                    {availability.rooms.map((roomAvailability) => {

                        const {
                            room,
                            available,
                            total_price
                        } = roomAvailability

                        const {
                            name,
                            img,
                            max_people
                        } = room

                        /*
                            How many of THIS particular room
                            has the user selected?
                        */
                        const selectedQuantity =
                            selectedRooms[room.id] ?? 0

                        /*
                            Cost of this particular room type.

                            Example:
                            selectedQuantity = 2
                            total_price = 800

                            roomTotal = 1600
                        */
                        const roomTotal =
                            selectedQuantity * total_price

                        return(
                            <div
                                key={room.id}
                                className="mt-4 flex gap-10 items-center ml-12 mr-12"
                            >

                                <img
                                    src={img}
                                    className="h-30 w-30 rounded-full"
                                />

                                <h1>
                                    {name}
                                </h1>

                                <p>
                                    {available} Rooms Available
                                </p>

                                <p>
                                    <span className="font-bold">
                                        ZAR {total_price}
                                    </span>{" "}
                                    per room
                                </p>

                                <p>
                                    <span className="font-bold">
                                        {max_people}
                                    </span>{" "}
                                    People
                                </p>

                                <NumberRoomSelector
                                    selectedRooms={selectedQuantity}
                                    setSelectedRooms={(quantity) => {
                                        setSelectedRooms(prev => ({
                                            ...prev,
                                            [room.id]: quantity
                                        }))
                                    }}
                                    availableRooms={available}
                                />

                                <p>
                                    Room total:{" "}
                                    <span className="font-bold">
                                        ZAR {roomTotal}
                                    </span>
                                </p>

                            </div>
                        )
                    })}

                    {/* Overall booking total */}

                    <div className="mt-8 ml-auto">

                        <p className="text-2xl font-bold">
                            Total: ZAR {totalRoomPrice}
                        </p>

                        <button
                            type="button"
                            className="submitFormButton mt-4"
                            onClick={() => setConfirmBooking(true)}
                        >
                            Confirm Order
                        </button>

                    </div>

                </div>
            }

        </section>
    )
}