import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormGetValues,
    UseFormRegister
} from "react-hook-form"

export type PostOrPatchType<
    T extends FieldValues,
    D extends FieldValues
> = {
    postOrPatch: "Post" | "Patch",
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    dependantArray?: D[]
    getValues: UseFormGetValues<T>
}