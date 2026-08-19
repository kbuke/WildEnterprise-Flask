import { TextInputs } from "../../../../Components/textInputs";
import { validateNameWithId } from "../../../../FormErrors/validateNameWithId";
import type { PostOrPatchType } from "../../../../Types/PostOrPatchType";
import type { FetchRoomType, PostRoomType } from "../../../../Types/RoomTypes";
import type { FieldValues } from "react-hook-form";

type RoomInputProps = PostOrPatchType<
    PostRoomType,
    FieldValues,
    FetchRoomType
> & {
    hotelId: number
}

export function RoomInputs({
    postOrPatch,
    register,
    errors,
    getValues,
    checkArray,
    hotelId
}: RoomInputProps){
    console.log(checkArray)
    return(
        <>
            <TextInputs 
                textType="text"
                placeholder="Please enter room name"
                extraClasses=""
                label="Enter room name:"
                register={register("name", {
                    required: "Room name is required",

                    validate: (value) => {
                        if(!value) return 

                        return validateNameWithId({
                            id: hotelId,
                            name: value,
                            checkArray: checkArray ?? [],
                            idKey: "hotel_id",
                            instanceCat: "Hotel",
                            catTitle: "Room Type"
                        })
                    }
                })}
                error={errors.name}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter room image"
                extraClasses=""
                label="Enter room image:"
                register={register("img", {
                    required: "Room image is required"
                })}
                error={errors.img}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter how many of these types of rooms there are"
                extraClasses=""
                label="Enter how many rooms of this type"
                register={register("noOfRooms", {
                    required: "Number of rooms is required"
                })}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter how many peopl can stay in this room"
                extraClasses=""
                label="Enter room capacity"
                register={register("maxPeople", {
                    required: "Max capacity required"
                })}
            />

            <TextInputs 
                textType="text"
                placeholder="Please enter base price of room"
                extraClasses=""
                label="Enter base price of room (ZAR)"
                register={register("basePrice", {
                    required: "Please enter base price"
                })}
            />
        </>
    )
}