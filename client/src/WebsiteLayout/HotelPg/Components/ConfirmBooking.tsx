import { useForm } from "react-hook-form"
import { TextInputs } from "../../../Components/textInputs"
import type { CreatedBookingType, PostBookingType } from "../../../Types/BookingTypes"
import { usePostInsatnce } from "../../../Hooks/GeneralHooks/usePostInstance"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../../Components/LoadingIcon"

type ConfirmBookingProps = {
    arrivalDate: string,
    departureDate: string,
    hotelName: string,
    guests: number,
    totalPrice: number,
    selectedRooms: Record<number, number>
}

export function ConfirmBooking({
    arrivalDate,
    departureDate,
    hotelName,
    guests,
    totalPrice,
    selectedRooms
}: ConfirmBookingProps){

    const navigate = useNavigate()

    const rooms = Object.entries(selectedRooms)
        .filter(([_, quantity]) => quantity > 0)
        .map(([roomId, quantity]) => ({
            room_id: Number(roomId),
            quantity
        }))

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PostBookingType>({
        shouldUnregister: true
    })

    const {
        mutate,
        isPending,
        isError,
        error
    } = usePostInsatnce<PostBookingType, CreatedBookingType>()

    const onSubmit = (formData: PostBookingType) => {

        const rooms = Object.entries(selectedRooms)
            .filter(([_, quantity]) => quantity > 0)
            .map(([roomId, quantity]) => ({
                room_id: Number(roomId),
                quantity
            }))

        mutate({
            endpoint: "bookings/create",
            values: {
                ...formData,
                arrivalDate,
                departureDate,
                rooms
            },
            queryKey: ["bookings"]
        }, {
            onSuccess: (data) => {
                navigate(`/${data.booking_ref}/confirmbooking`)
            }
        })
    }

    return(
        <form
            className="bg-white rounded-lg h-[90%] w-[60%] self-center p-12"
            onSubmit={handleSubmit(onSubmit)}
        >
            {isPending &&
                <LoadingIcon />
            }
            <h1>Confirm Booking for {hotelName}</h1>

            <p>
                <span className="font-bold">Arrival: </span> {arrivalDate}
            </p>

            <p>
                <span className="font-bold">Departure: </span> {departureDate}
            </p>

            <p>
                <span className="font-bold">{guests} </span> Guests
            </p>

            <p
                className="mb-10"
            >
                Total Price: <span className="font-bold">ZAR {totalPrice}</span>
            </p>

            <TextInputs 
                textType="text"
                placeholder="Please enter your name"
                extraClasses=""
                register={register("name", {
                    required: "Please enter a value"
                })}
                label="Please enter your name"
                error={errors.name}
            />

            <TextInputs 
                textType="email"
                placeholder="Please enter your email"
                extraClasses=""
                register={register("email", {
                    required: "Please enter a value"
                })}
                label="Please enter your email"
                error={errors.email}
            />

            <div
                className="flex gap-10"
            >
                <button
                    className="submitFormButton"
                    type="submit"
                >
                    Make Booking
                </button>

                <button
                    className="redButton"
                    type="button"
                >
                    Cancel Booking
                </button>
            </div>
        </form>
    )
}