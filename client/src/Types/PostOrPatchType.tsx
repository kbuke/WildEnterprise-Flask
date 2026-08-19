import type {
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister
} from "react-hook-form"

export type PostOrPatchType<
    T extends FieldValues,
    // Give D and C default values so they are not necessary
    D extends FieldValues = FieldValues, 
    C extends FieldValues = FieldValues
> = {
    postOrPatch: "Post" | "Patch"
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    dependantArray?: D[]
    getValues: UseFormGetValues<T>
    checkArray?: C[]
}