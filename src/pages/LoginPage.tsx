import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { login } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })
    .required();
const LoginPage = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data: LoginBody) => {
        try {
            setLoading(true)
            const res = await login();
            const users: User[] = res.data
            const user = users.find(
                (user) => user.email === data.email && user.password === data.password);
            if (user) {
                if (user.role !== "admin") {
                    setMessage("Login successful!");
                    navigate('/products')
                } else{
                    navigate('/admin') 
                }
            }
            else {
                setMessage("Email or password is incorrect.");
            }
        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
        finally { setLoading(false) }
    };
    const messageClass = message === "Login successful!" ? "text-blue-500" : "text-red-500";
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input {...register("email")} id="email" name="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input {...register("password")} id="password" name="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className={`flex w-full justify-center rounded-md  ${loading && "bg-gray-600"}  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Sign in</button>
                    </div>
                </form>
                {message && (
                    <p className={`mt-4 text-center text-sm ${messageClass}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default LoginPage