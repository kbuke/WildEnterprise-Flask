import type { ReactNode } from "react"
import { LoadingIcon } from "./LoadingIcon"

type FormType = {
    title: string
    onClose: () => void
    onSubmit: () => void
    fields: ReactNode
    submitButtonTitle?: string,
    isPending: boolean
}

export function Forms({
    title,
    onClose,
    onSubmit,
    fields,
    submitButtonTitle,
    isPending
}: FormType){
    return(
        <form
            className="bg-white h-[90%] w-[90%] lg:h-[80%] lg:w-[60%] self-center rounded overflow-y-auto" 
            onSubmit={onSubmit}
        >
            <div
                className="flex items-center py-4 px-12 justify-between border-b-2 sticky z-50 top-0 bg-white"
            >
                <h1
                    className="text-xl lg:text-3xl font-bold"
                >
                    {title}
                </h1>

                <button
                    type="button"
                    onClick={onClose}
                    className="redButton"
                >
                    Cancel
                </button>
            </div>

            {isPending
                ? <LoadingIcon />
                :
                <>
                    <div
                        className="px-12 flex flex-col flex-1 justify-center mt-4"
                    >
                        {fields}
                    </div>

                    <button
                        className="submitFormButton ml-12 mb-10"
                        type="submit"
                    >
                        {submitButtonTitle}
                    </button>
                </>
            }
        </form>
    )
}