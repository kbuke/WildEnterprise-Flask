type CardPatchDeleteType = {
    setDelete: () => void
    setEdit: () => void
    instanceType: string
}

export function CardEditDelete({
    setDelete,
    setEdit,
    instanceType
}: CardPatchDeleteType){
    return(
        <div
            className="mt-4 flex gap-6 items-center justify-between"
        >
            <button
                className="submitFormButton"
                onClick={setEdit}
            >
                Edit {instanceType}
            </button>

            <button
                className="redButton"
                onClick={setDelete}
            >
                Delete {instanceType}
            </button>
        </div>
    )
}