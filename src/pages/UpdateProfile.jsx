import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function UpdateProfile() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    function notify(message) {
        toast(message);
    }

    const handleUpdate = async () => {
        if (!name || !lastName || !password) {
            notify("Please fill in all fields.");
            return;
        }
        if(password.length>=15||password.length<=8){
            notify("Password must be between 8 and 15 characters")
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                notify("You must be logged in to update your profile.");
                setTimeout(() => {
                    navigate("/signin");
                }, 3000); 
                return;
            }

            const result = await axios.put(
                `${BACKEND_URL}/api/v1/user/`,
                { name, lastName, password },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(result.data);
            notify("Updated Profile successfully");
            setTimeout(() => {
                navigate("/dashboard");
            }, 5000);
        } catch (error) {
            console.error("Error occurred:", error.response ? error.response.data : error.message);
            notify("Error in updating profile " + (error.response?.data?.msg || "Unknown error"));
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                    <Heading label={"Update Profile"} />
                    <SubHeading label={"Enter your information to update your profile"} />
                    <InputBox 
                        label={"First Name"} 
                        placeholder={"John"} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <InputBox 
                        label={"Last Name"} 
                        placeholder={"Doe"} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <InputBox 
                        label={"Password"} 
                        placeholder={"Abc123@"} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <div className="pt-4">
                        <Button 
                            label={"Update Profile"} 
                            onClick={handleUpdate} 
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
