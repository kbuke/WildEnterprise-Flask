import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextInputs } from "../../Components/textInputs";
import type { PatchHotelCredentialsType } from "../../Types/HotelTypes";


type PatchHotelCredential = {
    register: UseFormRegister<PatchHotelCredentialsType>
    errors: FieldErrors<PatchHotelCredentialsType>
}

export function HotelCredentialsInput({
    register,
    errors
}: PatchHotelCredential){
    return(
        <div>
            <TextInputs 
                textType="text"
                placeholder="Leave blank to keep your current email"
                extraClasses=""
                label="New email (optional)"
                register={register("newEmail", {
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address"
                    }
                })}
                error={errors.newEmail}
            />

            <TextInputs 
                textType="password"
                placeholder="Leave blank to keep your current password"
                extraClasses=""
                label="New password (optional)"
                register={register("newPassword", {
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                })}
                error={errors.newPassword}
            />

            <TextInputs 
                textType="password"
                placeholder="Please enter current password"
                extraClasses=""
                label="Current password"
                register={register("currentPassword", {
                    required: "Current password is required"
                })}
                error={errors.currentPassword}
            />
        </div>
    )
}