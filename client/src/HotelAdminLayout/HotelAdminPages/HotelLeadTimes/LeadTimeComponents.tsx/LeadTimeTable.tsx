import type { FetchLeadTimeType } from "../../../../Types/LeadTimesType"

type LeadTimeTableProps = {
    leadTimes: FetchLeadTimeType[],
    hotelName: string,
    setLeadTimeAction: (
        value: "Post" | "Patch" | "Delete" | null
    ) => void

    setSelectedLeadTime: (
        value: FetchLeadTimeType | null
    ) => void
}

export function LeadTimeTable({
    leadTimes,
    hotelName,
    setLeadTimeAction,
    setSelectedLeadTime
}: LeadTimeTableProps){
    const tableHeaders = [
        "Label", "Hotel Wide", "Room", "% Rate", "Min Days", "Max Days", "Actions"
    ]

    const tableContents = (
        input: string | number | null | undefined
    ) => {
        return(
            <td
                className="p-12"
            >
                {input ?? "N/A"}
            </td>
        )
    }

    return(
        <div>
            <h2>
                Current {hotelName} Lead Times
            </h2>

            <table
                className="mt-10 w[96%]"
            >
                <thead
                    className="bg-black text-white"
                >
                    <tr>
                        {tableHeaders.map((header) => {
                            return(
                                <th
                                    className="p-4"
                                    key={header}
                                >
                                    {header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {leadTimes.map((time) => {

                        const {
                            label,
                            room_id,
                            multiplier,
                            min_days,
                            max_days,
                        } = time

                        return(
                            <tr
                                key={time.id}
                                className="border-b"
                            >
                                {tableContents(label)}

                                {tableContents(room_id ? "False" : "True")}

                                {tableContents(room_id ? room_id : "N/A")}

                                {tableContents(multiplier)}

                                {tableContents(min_days)}

                                {tableContents(max_days ? max_days : "N/A")}

                                <td
                                    className="p-4 flex flex-col"
                                >
                                    <button
                                        className="submitFormButton mb-4 w-30"
                                        onClick={() => {
                                            setLeadTimeAction("Patch")
                                            setSelectedLeadTime(time)
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="redButton"
                                        onClick={() => {
                                            setLeadTimeAction("Delete")
                                            setSelectedLeadTime(time)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}