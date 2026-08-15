import { useForm } from "react-hook-form"
import { TextInputs } from "./textInputs"
import type { AdminLoginType } from "../Types/AdminTypes"
import { useNavigate } from "react-router-dom"
import { usePostHotelAdminLogin } from "../Hooks/HotelHooks/useHotelAdminLogin"
import { usePostAdminLogin } from "../Hooks/AdminHooks/useAdminLogin"
import { LoadingIcon } from "./LoadingIcon"

type LoginPgType = {
    pgType: "Hotel" | "Admin",
}

export function LoginComponent({
    pgType
}: LoginPgType){
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AdminLoginType>()

    const login = pgType === "Hotel" ? usePostHotelAdminLogin() : usePostAdminLogin()

    const onSubmit = (formData: AdminLoginType) => {
        login.mutate(formData, {
            onSuccess: () => {
                navigate(`${pgType === "Hotel" ? "/hoteladmindashboard" : "/admindashboard"}`)
            }
        })
    }

    return(
        <section
            className="adminLoginSection"
            style={{
                backgroundImage: `url(${pgType === "Hotel"
                    ? "/AdminHotelBgImg.jpg"
                    : "/AdminSignInBg.jpg"
                })`
            }}
        >
            <div
                className="adminLoginDiv"
            >
                <form
                    className="adminLoginForm"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {login.error
                        ? <div className="bg-gray-600 text-center rounded mb-6 flex items-center justify-center p-2">
                            <p className="text-red-400 font-bold">
                                Incorrect Email/Password Combination
                            </p>
                        </div>
                        : null
                    } 

                    <h1
                        className="formHeader
                        mb-10
                        "
                    >
                        {pgType === "Hotel" ? "Hotel Admin" : "Admin"} Login
                    </h1>                  

                    <TextInputs 
                        textType="email"
                        placeholder="Please enter your email"
                        extraClasses={`adminLoginInputs`}
                        register={register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                        error = {errors.email}
                        errorExtraClass="mb-10"
                    />

                    <TextInputs 
                        textType="password"
                        placeholder="Please enter your password"
                        extraClasses={`adminLoginInputs`}
                        register={register("password", {
                            required: "Please enter a password"
                        })}
                        error={errors.password}
                        errorExtraClass="mb-10"
                    />

                    {login.isPending
                        ? <LoadingIcon />
                        :
                        <button
                            className="submitFormButton lg:w-[30%] lg:self-center lg:h-14 lg:text-xl"
                            type="submit"
                        >
                            Login
                        </button>
                    }
                </form>
            </div>
        </section>
    )
}