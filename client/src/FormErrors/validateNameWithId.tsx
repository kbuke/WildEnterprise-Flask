type ValidateNameWithIdProps<
    T extends {
        id: number
        name?: string
        label?: string
    }
> = {
    id: number
    name: string
    checkArray: T[]
    idKey: keyof T
    instanceCat: string
    catTitle: string
}

export function validateNameWithId<
    T extends {
        id: number
        name?: string
        label?: string
    }
>({
    id,
    name,
    checkArray,
    idKey,
    instanceCat,
    catTitle
}: ValidateNameWithIdProps<T>) {

    const exists = checkArray.some(instance => {

        const instanceName = instance.name ?? instance.label

        return (
            instance[idKey] === id &&
            instanceName?.toLowerCase() === name.toLowerCase()
        )
    })

    if (exists) {
        return `This ${instanceCat} already has this ${catTitle}`
    }

    return true
}