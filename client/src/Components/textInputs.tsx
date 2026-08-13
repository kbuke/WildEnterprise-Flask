import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type TextInputTypes = {
    textType: "text" | "password" | "email" | "date" | "time",
    placeholder?: string
    extraClasses?: string
    register: UseFormRegisterReturn
    error?: FieldError
    label?: string
    errorExtraClass?: string
}

export function TextInputs({
    textType,
    placeholder,
    extraClasses,
    register,
    error,
    label,
    errorExtraClass
}: TextInputTypes){
    const textInput = <div>
        <input 
            type={textType}
            placeholder={placeholder}
            className={`${label ? null : extraClasses} ${error ? "mb-2" : "mb-10"}`}
            {...register}
        />

        {error &&
            <p
                className={`text-red-400 ${errorExtraClass}`}
            >
                {error.message}
            </p>
        }
    </div>

    return(
        label
            ? <div>
                <p>{label}</p>
                {textInput}
            </div>
            :
            textInput
    )
}