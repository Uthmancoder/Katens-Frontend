import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from '../../src/assets/google.png'
import { ToastContainer, toast } from "react-toastify"
const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [loading, setloading] = useState(false)
    const [loggedIn, setloggedIn] = useState(false) 
    const navigate = useNavigate()
    const { handleSubmit, handleBlur, handleChange, touched, errors, values } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Must be a valid email").required("Email field is required"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                    "Password must contain at least one letter, one number, and one symbol"
                )
                .required("This input field is required"),
        }),
        onSubmit: async (values) => {
            setloading(true);
            try {
                const response = await axios.post("http://localhost:5100/Api/Users/signin", values);
                console.log("response gotten from server : ", response.data);
                toast.success(response.data.message);
                localStorage.setItem("Username", response.data.Username);
                setloggedIn(true);
                localStorage.setItem("loggedIn", true);
                setTimeout(() => {
                    navigate("/")
                }, 3000);
            } catch (error) {
                console.log(error.response.data);
                toast.error(error.response.data.message);
            } finally {
                setloading(false);
            }
        }
    })
    const handlePass = () => {
        setShowPass(!showPass)
    }

    return (
        <div className="bg-[#142030] w-full h-screen text-center py-8 flex items-center justify-center ">
            <div>

            </div>
            <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto p-4 bg-[#5469d4] shadow-xl">
                <h2 className="text-slate-100 text-3xl md:text-3xl font-bold font-serif">Welcome Back!</h2>
                <p className="text-slate-300 font-semibold">Sign up now to become a new member.</p>
                <p className="font-semibold text-slate-400">Login to access your account</p>
                <div className="grid text-start my-2">
                    <label className="font-semibold text-slate-300" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={touched.email && errors.email ? "p-1 border-2 border-red-500 invaCr w-full rounded-md outline-none" : "p-1 focus:ring-2 ring-[#5469d4] w-full rounded-sm outline-none"}
                        type="text"
                        placeholder="Enter Your email..."
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {touched.email && errors.email && (
                        <small className="text-red-500">{errors.email}</small>
                    )}
                </div>
                <div className="grid text-start my-2">
                    <label className="font-semibold text-slate-300" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center justify-center relative">
                        <input
                            className={touched.password && errors.password ? "p-1 border-2 border-red-500 invaCr w-full rounded-md outline-none" : "p-1 focus:ring-2 ring-[#5469d4] w-full rounded-sm outline-none"}
                            type={showPass ? "text" : "password"}
                            placeholder="Enter Your password..."
                            name="password"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <div onClick={handlePass} className="absolute right-2 top-2">{showPass ? <FaEye /> : <FaEyeSlash />}</div>
                    </div>
                    {touched.password && errors.password && (
                        <small className="text-red-500">{errors.password}</small>
                    )}
                </div>
                <button className="bg-slate-300 shadow-xl border-slate-200 border w-full  mx-auto py-2 mt-2 text-slate-600 rounded-sm font-semibold" >{loading ? "Loading..." : "Log In"}</button>

                <small>Don't have an account <Link className="text-slate-800 font-bold mt-2" to="/signup">Sign up</Link></small>

                <div className="flex items-center my-2 gap-2 justify-centermy-4">
                    <hr className="w-[50%] border-slate-400 " />
                    <span className="text-sm">Or</span>
                    <hr className="w-[50%]  border-slate-400 " />
                </div>

                <div>
                    <button className="border p-1 rounded-sm border-slate-400 bg-slate-100 w-full flex items-center gap-4 justify-center"><img className="w-[40px]" src={google} alt="google" />Login with Google</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Login