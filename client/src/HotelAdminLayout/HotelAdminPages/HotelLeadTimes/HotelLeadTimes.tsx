import { useState } from "react"
import { FindHotel } from "../../HotelAdminComponents/FindHotel"
import type { FetchLeadTimeType } from "../../../Types/LeadTimesType"
import { PostLeadTime } from "./LeadTimeComponents.tsx/PostLeadTime"
import { LeadTimeTable } from "./LeadTimeComponents.tsx/LeadTimeTable"
import { DeleteLeadTimes } from "./LeadTimeComponents.tsx/DeleteLeadTimes"
import { PatchLeadTimes } from "./LeadTimeComponents.tsx/PatchLeadTimes"

export function HotelLeadTimes(){
    const [leadTimeAction, setLeadTimeAction] = useState<"Post" | "Patch" | "Delete" | null>()
    const [selectedLeadTime, setSelectedLeadTime] = useState<FetchLeadTimeType | null>()

    const hotel =  FindHotel()

    console.log(hotel)

    const hotelName = hotel?.name
    const hotelLeadTimes = hotel?.lead_times
    const hotelId = hotel?.id
    const hotelRooms = hotel?.rooms

    console.log(hotelLeadTimes)

    return(
        <section>
            <div
                className="mt-12 flex items-center gap-12"
            >
                {leadTimeAction === "Post" && hotelId && hotelName && hotelRooms && hotelLeadTimes &&
                    <PostLeadTime 
                        hotelId={hotelId}
                        hotelName={hotelName}
                        hotelRooms={hotelRooms}
                        leadTimes={hotelLeadTimes}
                        onClose={() => setLeadTimeAction(null)}
                    />
                }

                {leadTimeAction === "Delete" && selectedLeadTime &&
                    <DeleteLeadTimes 
                        onClose={() => {
                            setLeadTimeAction(null)
                            setSelectedLeadTime(null)
                        }}
                        name={selectedLeadTime.label}
                        id={selectedLeadTime.id}
                    />
                }

                {leadTimeAction === "Patch" && selectedLeadTime && hotelId && hotelRooms && hotelLeadTimes &&
                    <PatchLeadTimes 
                        chosenLeadTime={selectedLeadTime}
                        hotelId={hotelId}
                        onClose={() => {
                            setSelectedLeadTime(null)
                            setLeadTimeAction(null)
                        }}
                        rooms={hotelRooms}
                        leadTimes={hotelLeadTimes}
                    />
                }

                <h1>
                    Lead Times for {hotelName}
                </h1>

                <button
                    className="submitFormButton"
                    onClick={() => setLeadTimeAction("Post")}
                >
                    Add Lead Time
                </button>
            </div>

            {hotelLeadTimes && hotelLeadTimes.length > 0 && hotelLeadTimes && hotelName && setLeadTimeAction && setSelectedLeadTime &&
                <LeadTimeTable 
                    leadTimes={hotelLeadTimes}
                    hotelName={hotelName}
                    setLeadTimeAction={setLeadTimeAction}
                    setSelectedLeadTime={setSelectedLeadTime}
                />
            }

            {!hotelLeadTimes || hotelLeadTimes.length === 0 &&
                <p>No Lead Times to Display</p>
            }
        </section>
    )
}