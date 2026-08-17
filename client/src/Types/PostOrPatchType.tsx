import type { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form"

export type PostOrPatchType<T extends FieldValues> = {
    postOrPatch: "Post" | "Patch",
    register: UseFormRegister<T>
    errors: FieldErrors<T>
}