type CheckBoxType = {
    label: string,
    tick: boolean,
    setTick: () => void
}

export function CheckBox({
    label,
    tick,
    setTick
}: CheckBoxType){
    return(
        <div
            className="flex items-center gap-6 mb-10"
        >
            <label
                className="font-bold"
            >
                {label}
            </label>

            <input 
                type="checkbox"
                checked={tick}
                onChange={setTick}
                className="h-6 w-6 cursor-pointer"
            />
        </div>
    )
}