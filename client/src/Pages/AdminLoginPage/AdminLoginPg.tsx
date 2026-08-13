import { useForm } from "react-hook-form";
import { TextInputs } from "../../Components/textInputs";
import type { AdminLoginType } from "../../Types/AdminTypes";
import { usePostAdminLogin } from "../../Hooks/AdminHooks/useAdminLogin";
import { useNavigate } from "react-router-dom";

export function AdminLoginPg(){

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AdminLoginType>()

    const postAdminLogin = usePostAdminLogin()

    const onSubmit = (formData: AdminLoginType) => {
        postAdminLogin.mutate(formData, {
            onSuccess: () => {
                navigate("/admindashboard")
            }
        })
    }

    return(
        <section
            className="adminLoginSection"
            style={{
                backgroundImage: `url(${"/AdminSignInBg.jpg"})`
            }}
        >
            <div
                className="adminLoginDiv"
            >
                <form
                    className="adminLoginForm"
                    onSubmit={handleSubmit(onSubmit)}
                >
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

                    <button
                        className="submitFormButton lg:w-[30%] lg:self-center lg:h-14 lg:text-xl"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}