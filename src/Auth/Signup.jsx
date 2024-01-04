import { useState } from 'react';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from '../../src/assets/google.png'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
const SignUp = () => {
  const [showPass, setShowPass] = useState(false)
  const [loading, setloading] = useState(false)
  const [confirmPass, setconfirmPass] = useState(false)
  const { handleSubmit, handleBlur, handleChange, handleReset, touched, errors, values } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(6, 'Username too short').required('Username is required'),
      email: yup.string().email('Must be a valid email').required('Email is required'),
      password: yup.string().min(6, 'Password too short').required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      setloading(true)
      const UserDetails = {
        Username: values.username,
        Email: values.email,
        Password: values.password,
        Image: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
      }
      try {
        const response = await axios.post("https://ultimate-app.onrender.com/Api/Users/signup", UserDetails)
        console.log("response gotten from server : ", response.data)
        toast.success(response.data.message)
      } catch (error) {
        console.log(error.response.data)
        toast.error(error.response.data.message)
      } finally {
        setloading(false)
      }

    },
  });

  const handlePass = () => {
    setShowPass(!showPass)
  }
  const handleConfirmPass = () => {
    setconfirmPass(!confirmPass)
  }

  return (
    <div className="bg-[#142030] w-full h-screen lg:h-screen  text-center py-8 flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto p-4 bg-[#5469d4] shadow-xl">
        <h2 className="text-slate-100 text-2xl md:text-3xl font-bold font-serif">Join us today!!</h2>
        <p className="text-slate-300 font-semibold">Sign up now to become a new member.</p>
        {/* Username Field */}
        <div className="grid text-start my-2">
          <label className="font-semibold text-slate-300" htmlFor="username">
            Username
          </label>
          <input
            className={
              touched.username && errors.username
                ? "p-1 border-2 border-red-500 invaCr w-full rounded-md outline-none"
                : "p-1 focus:ring-2 ring-[#5469d4] w-full rounded-sm outline-none"
            }
            type="text"
            placeholder="Enter Your Username..."
            name="username"
            id="username"
            onChange={handleChange}
            onBlur={handleBlur}
            onReset={handleReset}
            value={values.username}
          />
          <div className="text-red-500">
            {touched.username && errors.username && (
              <small className="text-[AD3734]">{errors.username}</small>
            )}
          </div>

        </div>
        {/* Email Field */}
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
            onReset={handleReset}
            value={values.email}
          />
          {touched.email && errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>
        {/* Password field */}
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
              onReset={handleReset}
              value={values.password}
            />
            <div onClick={handlePass} className="absolute right-2 top-2">{showPass ? <FaEye /> : <FaEyeSlash />}</div>
          </div>
          {touched.password && errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
        </div>
        {/* confirm-Password field */}
        <div className="grid text-start my-2">
          <label className="font-semibold text-slate-300" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="flex items-center justify-center relative">
            <input
              className={touched.confirmPassword && errors.confirmPassword ? "p-1 border-2 border-red-500 invaCr w-full rounded-md outline-none" : "p-1 focus:ring-2 ring-[#5469d4] w-full rounded-sm outline-none"}
              type={confirmPass ? "text" : "password"}
              placeholder="Confirm  Your password..."
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              onReset={handleReset}
              value={values.confirmPassword}
            />
            <div onClick={handleConfirmPass} className="absolute right-2 top-2">{confirmPass ? <FaEye /> : <FaEyeSlash />}</div>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <small className="text-red-500">{errors.confirmPassword}</small>
          )}
        </div>

        <button className="bg-slate-300 shadow-xl border-slate-200 border w-full  mx-auto py-2 mt-2 text-slate-600 rounded-sm font-semibold" >{loading ? "Loading..." : "Sign Up"}</button>

        <small >Alredy have an account <Link to="/login" className="text-slate-800 font-bold mt-2"  >Login Here</Link></small>

        <div className="flex items-center my-4 gap-2 justify-centermy-4">
          <hr className="w-[50%] border-slate-400 " />
          <span className="text-sm">Or</span>
          <hr className="w-[50%]  border-slate-400 " />
        </div>

        <div className="bg-ehite">
          <button className="border p-1 bg-white shadow rounded-sm border-slate-400 w-full flex items-center  justify-center"><img className="w-[40px]" src={google} alt="google" /><span className="justify-center">Sign Up with Google</span></button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
export default SignUp