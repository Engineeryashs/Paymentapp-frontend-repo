import React from "react";
import { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
export function AppBar({taskbar,setTaskBar}) {
    const token = localStorage.getItem("token");
    const [userdname, setUserDName] = useState("");
    const [userdlname, setUserDLName] = useState("");
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    useEffect(function () {
        async function getUserData() {
            let response = await axios.get(`${BACKEND_URL}/api/v1/user/userdata`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.user.name);
            setUserDName(response.data.user.name);
            setUserDLName(response.data.user.lastName);
        }
        getUserData();
    }, [])
    return (<div className="flex justify-between shadow h-14">
        <div className="flex flex-col justify-center ml-4 h-full">
            Payment App
        </div>

        <div className="flex">
            <div className="flex flex-col justify-center mr-4 h-full">
                {`${userdname} ${userdlname}`}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2" onClick={()=>{
              setTaskBar(!taskbar);
            }}>
                <div className="flex flex-col justify-center h-full text-xl cursor-pointer">
                    {userdname[0]}
                </div>
            </div>
        </div>
    </div>)
}