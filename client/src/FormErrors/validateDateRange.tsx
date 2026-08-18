type DateValidationProps = {
    startDate: string,
    endDate?: string
}

export function validateDateRange({
    startDate, endDate
}: DateValidationProps) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const start = new Date(`${startDate}T00:00:00`)

    if(start < today){
        return "Start Date can not be before today"
    }

    if(endDate){
        const end = new Date(`${endDate}T00:00:00`)
        if(end < start){
            return "End date can not be before start date"
        }
    }

    return true
}