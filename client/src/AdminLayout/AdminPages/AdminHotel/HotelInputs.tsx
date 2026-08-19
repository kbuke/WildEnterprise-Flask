import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { TextInputs } from "../../../Components/textInputs"
import type { FetchHotelsType, PatchHotelType, PostHotelType } from "../../../Types/HotelTypes"
import { TextArea } from "../../../Components/TextArea"
import { validateValueUniqueness } from "../../../FormErrors/validateValueUniqueness"

type PostHotelInputType = {
    postOrPatch: "Post" | "Patch",
    register: UseFormRegister<PostHotelType | PatchHotelType>
    errors: FieldErrors<PostHotelType>
    arrayCheck?: FetchHotelsType[]
    currentId?: number
}

export function HotelInputs({
    postOrPatch,
    register,
    errors,
    arrayCheck,
    currentId
}: PostHotelInputType){
    return(
        <>
            <TextInputs 
                textType="text"
                placeholder="Please enter hotel name"
                extraClasses="border-b"
                label="Enter hotel name:"
                register={register("name", {
                    required: "Hotel Name is required",

                    validate: (value) => {
                        if(!value) return

                        return validateValueUniqueness({
                            checkArray: arrayCheck ?? [],
                            value: value,
                            valueTitle: "Hotel",
                            keyChecked: "name",
                            excludeId: currentId
                        })
                    }
                })}
                error={errors.name}
            />

            <TextInputs 
                textType="text"
                placeholder = "Please enter hotels location"
                label="Please enter hotels location:"
                extraClasses="border-b"
                register={register("location", {
                    required: "Hotel location is required"
                })}
                error={errors.location}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter hotels image"
                label="Please enter hotels image:"
                extraClasses="border-b"
                register={register("img", {
                    required: "Hotel image is required",

                    validate: (value) => {
                        if(!value) return 

                        return validateValueUniqueness({
                            checkArray: arrayCheck ?? [],
                            value: value,
                            valueTitle: "Hotel Image",
                            keyChecked: "img",
                            excludeId: currentId
                        })
                    }
                })}
                error={errors.img}
            />

            <TextArea 
                placeholder="Please enter hotel info"
                extraClasses=""
                label="Please enter hotel info"
                register={register("info", {
                    required: "Hotel information is required"
                })}
                error={errors.info}
            />


            {postOrPatch === "Post" &&
                <div>
                    <TextInputs 
                        textType="email"
                        placeholder="Please enter hotels email"
                        label="Please enter hotels email:"
                        extraClasses="border-b"
                        register={register("email", {
                            required: "Hotel email is required"
                        })}
                        error={errors.email}
                    />


                    <TextInputs 
                        textType="password"
                        placeholder="Please enter hotels password:"
                        label="Please enter hotels password"
                        extraClasses="border-b"
                        register={register("password", {
                            required: "Hotel password is required"
                        })}
                        error={errors.password}
                    />
                </div>
            }

        </>
    )
}