import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface TextAreaType{
    placeholder: string,
    extraClasses?: string,
    register: UseFormRegisterReturn
    error?: FieldError
    label?: string
}

export function TextArea({
    placeholder,
    extraClasses,
    register,
    error,
    label
}: TextAreaType){
    return(
        <div>
            <p
                className="font-bold"
            >
                {label}
            </p>
            <textarea 
                placeholder={placeholder}
                className={`border w-[40%] px-4 py-2 rounded h-60 ${error ? null : extraClasses}`}
                {...register}
            />
            {error &&
                <p
                    className="text-red-600"
                >
                    {error.message}
                </p>
            }
        </div>
    )
}