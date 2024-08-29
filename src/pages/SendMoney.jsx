import React from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const notify = (message) => toast(message);
    let navigate = useNavigate();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    return (<div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex p-6 flex-col space-y-1.5 p-6">
                    <h1 className="text-3xl font-bold text-center">
                        Send Money
                    </h1>
                </div>
                <div className="p-6">
                    <div className="flex space-x-4 items-center">
                        <div className="rounded-full bg-green-500 w-12 h-12 flex items-center justify-center">
                            <span className="text-2xl text-white">
                                {name[0].toUpperCase()}
                            </span> </div>
                        <h2 className="text-2xl font-semibold">{name}</h2>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="amount">Amount (in Rs)</label>
                        <input type="text" className="w-full h-10 rounded-md border border-input bg-background px-4 py-3 text-sm" placeholder="Enter amount" onChange={(e) => {
                            setAmount(e.target.value);
                        }} />
                    </div>
                    <div>
                        <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={async () => {
                            try {
                                const token = localStorage.getItem("token");
                                if (!token) {
                                    notify("User not authenticated");
                                    navigate("/signin")
                                    return;
                                }
                                const amountNumber = parseFloat(amount);
                                if (isNaN(amountNumber) || amountNumber <= 0) {
                                    notify("Please enter a valid positive amount");
                                    return;
                                }
                                const response = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
                                    to: id,
                                    amount: amountNumber
                                }, {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                console.log(response.data)
                                notify(`Successfully transferred ₹ ${JSON.stringify(response.data.amount)} from your account`);
                                setTimeout(() => { navigate("/dashboard") }, 3000)
                            } catch (error) {
                                console.log(error);
                                notify(`Transaction unsuccessfull ${JSON.stringify(error.response.data.msg)}`);
                                setTimeout(() => { navigate("/dashboard") }, 3000)
                            }
                        }} >Initiate Money</button>
                    </div>

                </div>
            </div>
        </div>
        <ToastContainer />
    </div>)
}