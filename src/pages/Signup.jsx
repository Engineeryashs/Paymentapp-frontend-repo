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
{/*
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"*/}

export function Signup() {
    const [name, setName] = useState("");
    const [lastName, setlastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    function notify(message) {
        toast(message)
    }
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder={"John"} onChange={(e) => {
                        setName(e.target.value)
                        console.log(name)
                    }} />
                    <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e) => {
                        setlastName(e.target.value)
                    }} />
                    <InputBox label={"Email"} placeholder={"johndoe5@example.com"} onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                    <InputBox label={"Password"} placeholder={"Abc123@"} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={async () => {
                            if (!name || !lastName || !userName || !password) {
                                notify("Please fill in all fields.");
                                return;
                            }
                            if(password.length>=15||password.length<=8){
                                notify("Password must be between 8 and 15 characters")
                                return;
                            }
                            try {
                                console.log({
                                    name,
                                    lastName,
                                    userName,
                                    password
                                })
                                let result = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                                    name,
                                    lastName,
                                    userName,
                                    password,
                                })

                                console.log(result.data)
                                localStorage.setItem("token", result.data.token);
                                setTimeout(() => {
                                    navigate("/dashboard")
                                },3000)
                                notify("Account created succesfully, welcome");
                            }
                            catch (error) {
                                console.error("error occured:", error.response ? error.response.data : error.message)
                                notify("Error in creating account " + JSON.stringify(error.response.data.msg))
                            }

                        }} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
            <ToastContainer />
        </div>)
}