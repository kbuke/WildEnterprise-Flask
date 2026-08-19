type ValidateValueUniqueProps<T extends { id: number }> = {
    checkArray: T[]
    value: string
    valueTitle: string
    keyChecked: keyof T
    excludeId?: number
}

export function validateValueUniqueness<T extends { id: number }>({
    checkArray,
    value,
    valueTitle,
    keyChecked,
    excludeId
}: ValidateValueUniqueProps<T>) {

    const exists = checkArray.some(instance => {
        // Ignore the instance currently being edited
        if (excludeId !== undefined && instance.id === excludeId) {
            return false
        }

        return instance[keyChecked] === value
    })

    if (exists) {
        return `${valueTitle} "${value}" is already registered`
    }

    return true
}