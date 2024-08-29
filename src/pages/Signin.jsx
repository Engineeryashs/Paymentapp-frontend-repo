import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function Signin() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    function notify(message){
        toast(message)
    }
    let navigate=useNavigate();
    return (<div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to sign in your account"} />
                <InputBox label={"Email"} placeholder={"Email address"} onChange={(e) => {
                    setUserName(e.target.value);
                    console.log(userName);
                }} />
                <InputBox label={"Password"} placeholder={"Password"} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <div className="pt-4">
                    <Button label={"Sign in"} onClick={async ()=>{
                         if (!userName || !password) {
                            notify("Please fill in all fields.");
                            return;
                        }
                        try {
                            console.log("hi"+BACKEND_URL)
                            let response=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                                userName,
                                password
                            })
                             localStorage.setItem("token",response.data.token)
                             setTimeout(()=>{
                                navigate("/dashboard")
                             },3000)
                             notify("Welcome back user!!!")
                        } catch (error) {
                            console.error(error.response)
                             notify(error.response.data.msg);
                        }
                      
                    }} />
                </div>
                <BottomWarning label={"Don't have an account"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
        <ToastContainer/>
    </div>)
}