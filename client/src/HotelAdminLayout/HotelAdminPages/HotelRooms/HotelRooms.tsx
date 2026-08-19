import { useState } from "react"
import { FindHotel } from "../../HotelAdminComponents/FindHotel"
import { PostRoom } from "./HotelRoomComponents/PostRoom"
import { CardEditDelete } from "../../../Components/CardEditDelete"
import { DeleteRoom } from "./HotelRoomComponents/DeleteRoom"
import { PatchRoom } from "./HotelRoomComponents/PatchRoom"

type labelInfoType = {
    label: string,
    info: string
}

export function HotelRooms(){
    const [roomAction, setRoomAction] = useState<"Post" | "Patch" | "Delete" | null>(null)
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null)
    const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null)

    const hotel = FindHotel()

    const hotelRooms = hotel?.rooms
    const hotelId = hotel?.id
    const hotelName = hotel?.name

    const labelInfo = ({
        label,
        info
    }: labelInfoType) => {
        return(
            <div
                className="flex gap-2"
            >
                <label
                    className="font-bold"
                >
                    {label}
                </label>

                <p>{info}</p>
            </div>
        )
    }

    console.log(roomAction, selectedRoomId, selectedRoomName)

    return(
        <div
            className="py-12"
        >
            {roomAction === "Post" && hotelId && hotelRooms && hotelName &&
                <PostRoom 
                    hotelName={hotelName}
                    onClose={() => setRoomAction(null)}
                    hotelId={hotelId}
                    hotelRooms={hotelRooms}
                />
            }

            {roomAction === "Delete" && selectedRoomId !== null && selectedRoomName !== null &&
                <DeleteRoom 
                    onClose={() => {
                        setRoomAction(null)
                        setSelectedRoomId(null)
                    }}
                    name={selectedRoomName}
                    id={selectedRoomId}
                />
            }

            {roomAction === "Patch" && selectedRoomId !== null && selectedRoomName !== null && hotelId && hotelRooms &&
                <PatchRoom 
                    onClose={() => {
                        setRoomAction(null)
                        setSelectedRoomId(null)
                    }}
                    name={selectedRoomName}
                    id={selectedRoomId}
                    hotelId={hotelId}
                    hotelRooms={hotelRooms}
                />
            }
            
            <div
                className="flex flex-row gap-20 items-center w-[96%] border-b py-4"
            >
                <h2
                    className="uppercase text-2xl font-bold"
                >
                    {hotel?.name} Rooms
                </h2>

                <button
                    className="submitFormButton"
                    onClick={() => setRoomAction("Post")}
                >
                    Add Room
                </button>
            </div>

            {hotelRooms?.length === 0 && <p
                className="mt-4"
            >
                No rooms to display
            </p>}

            <div
                className="mt-4 grid grid-cols-3 gap-20 overflow-x-hidden"
            >
               {hotelRooms?.map((room, index) => {
                console.log(room)
                const {name, img, no_of_rooms, max_people, base_price, id} = room
                return(
                    <div
                        key={index}
                        className="bg-gray-200 rounded flex flex-col w-100"
                    >
                        <img 
                            src={img}
                            className="h-40 rounded-t-lg w-full"
                        />

                        <div
                            className="py-4 px-4"
                        >
                            <h2
                                className="justify-self-center font-bold text-2xl uppercase mb-4 border-b"
                            >
                                {name}
                            </h2>

                            {labelInfo({
                                label: "Number of Rooms: ",
                                info: String(no_of_rooms)
                            })}

                            {labelInfo({
                                label: "Maximum Number of People: ",
                                info: String(max_people)
                            })}

                            {labelInfo({
                                label: "Base Price: ZAR",
                                info: String(base_price)
                            })}
                            

                            <CardEditDelete 
                                setDelete={() => {
                                    setRoomAction("Delete")
                                    setSelectedRoomId(id)
                                    setSelectedRoomName(name)
                                }}
                                
                                setEdit={() => {
                                    setRoomAction("Patch")
                                    setSelectedRoomId(id)
                                    setSelectedRoomName(name)
                                }}

                                instanceType="Room"
                            />
                        </div>
                    </div>
                )
               })} 
            </div>
        </div>
    )
}