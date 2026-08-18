import type {
    FieldValues,
    Path,
    UseFormRegister
} from "react-hook-form"


type DropDownPropType<
    T extends {id: number; name: string},
    F extends FieldValues
> = {
    label: string
    propArray: T[]
    disabledOption: string
    register: UseFormRegister<F>
    name: Path<F>
}

export function DropDown<
    T extends { id: number; name: string },
    F extends FieldValues
>({
    propArray,
    label,
    disabledOption,
    register,
    name
}: DropDownPropType<T, F>) {

    return (
        <div
            className="flex gap-10 mb-10"
        >
            <label
                className="font-bold"
            >
                {label}
            </label>

            <select 
                className="border-b"
                {...register(name)}
                defaultValue=""
            >
                <option
                    value=""
                    disabled
                >
                    {disabledOption}
                </option>

                {propArray.map((instance) => (
                    <option
                        key={instance.id}
                        value={instance.id}
                    >
                        {instance.name}
                    </option>
                ))}
            </select>
        </div>
    )
}