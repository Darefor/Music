import React from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const {signup, isLoading, error} = useAuthStore()
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        
        try{
            if(password !== confirmPassword){
                toast.error("Passwords must match.")
                return
            }

            await signup(username, password)
            navigate("/")
        } catch (error){
            console.log(error)
        }

    }

    return (

        <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12">
            <h2 className="flex-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto">Sign up</h2>

            <form onSubmit={handleSignup} className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10">
                <div className="flex flex-col w-full">
                    <label className="md:text-lg">Username: </label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="md:text-lg">Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500
                    "/>
                </div>

                <div className="flex flex-col w-full">
                    <label className="md:text-lg">Confirm Password: </label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full py-2 font-medium rounded-lg transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#403D39] text-[#FFFCF2]"}`}
                >
                    {isLoading ? "Please wait..." : "Sign up"}
                </button>
                <p>Already hava an account? <Link to={"/login"} className="text-[#944424]">Log in</Link></p>
            </form> 
            
        </div>

       
    )
}

export default SignupPage