import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type DateInputPropsType = {
    inputType: "Start Date" | "End Date"
    label: string
    extraClasses?: string
    register: UseFormRegisterReturn
    error?: FieldError
    errorExtraClass?: string
}

export function DateInputs({
    inputType,
    label,
    extraClasses,
    register,
    error,
    errorExtraClass
}: DateInputPropsType){

    const dateInput = <div>
        <input 
            type="date"
            className={`${label? "border-b w-[90%] lg:w-[40%]" : extraClasses} ${error ? "mb-0" : "mb-10"}`}
            {...register}
        />

        {error &&
            <p
                className={`text-red-400 mb-4 ${errorExtraClass}`}
            >
                {error.message}
            </p>
        }
    </div>

    return(
        label
            ? <div>
                <label
                    className="font-bold"
                >
                    {label}
                </label>

                {dateInput}
            </div>
            :
            dateInput
    )
}