type ValidateNameWithIdProps<T extends { id: number; name: string }> = {
    id: number
    name: string
    checkArray: T[]
    idKey: keyof T

    instanceCat: string
    catTitle: string
}

export function validateNameWithId<T extends { id: number; name: string }>({
    id,
    name,
    checkArray,
    idKey,
    instanceCat,
    catTitle
}: ValidateNameWithIdProps<T>) {

    const exists = checkArray.some(instance =>
        instance[idKey] === id &&
        instance.name.toLowerCase() === name.toLowerCase()
    )

    if (exists) {
        return `This ${instanceCat} already has this ${catTitle}`
    }

    return true
}