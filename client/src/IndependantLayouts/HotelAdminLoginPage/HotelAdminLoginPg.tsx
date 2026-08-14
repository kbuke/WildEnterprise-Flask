import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { AdminLoginType } from "../../Types/AdminTypes"
import { usePostHotelAdminLogin } from "../../Hooks/HotelHooks/useHotelAdminLogin"
import { TextInputs } from "../../Components/textInputs"
import { LoadingIcon } from "../../Components/LoadingIcon"

export function HotelAdminLoginPg(){
    const navigate = useNavigate()

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<AdminLoginType>()

    const postHotelAdminLogin = usePostHotelAdminLogin()

    const onSubmit = (formData: AdminLoginType) => {
        postHotelAdminLogin.mutate(formData, {
            onSuccess: () => {
                navigate("/hoteladmindashboard")
            }
        })
    }

    return(
        <section
            className="adminLoginSection"
            style={{
                backgroundImage: `url(${"/HotelAdminSignInBg.jpeg"})`
            }}
        >
            <div
                className="adminLoginDiv"
            >
                <form
                    className="adminLoginForm"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {postHotelAdminLogin.error
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
                        Admin Login
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

                    {postHotelAdminLogin.isPending
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