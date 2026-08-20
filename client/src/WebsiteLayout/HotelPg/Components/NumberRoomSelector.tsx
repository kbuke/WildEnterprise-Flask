type NumberRoomSelectorProps = {
    selectedRooms: number,
    setSelectedRooms: (quantity: number) => void,
    availableRooms: number
}

export function NumberRoomSelector({
    selectedRooms,
    setSelectedRooms,
    availableRooms
}: NumberRoomSelectorProps){
    const items = [...Array(availableRooms + 1)].map((_, index) => {
        return(
            <option
                key={index}
                value={index}
            >
                {index}
            </option>
        )
    })
    return(
        <select
            value={selectedRooms}
            onChange={(e) => +
                setSelectedRooms(Number(e.target.value))
            }
        >
            {items}
        </select>
    )
}