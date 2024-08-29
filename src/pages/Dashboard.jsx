import { useEffect } from "react";
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [taskbar,setTaskBar]=useState(false);
    let navigate=useNavigate();
    const token = localStorage.getItem("token");
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    useEffect(function () {
        async function fetchBankBalance() {
            if (!token) {
                navigate("/signin"); 
                return;
            }
            try {
                let result = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBalance(result.data.balance)
            } catch (error) {
              console.log(error);
            } 
        }
        fetchBankBalance();
    }, [])
    return (<div>
        <AppBar taskbar={taskbar} setTaskBar={setTaskBar} />
        <Balance value={balance} taskbar={taskbar} />
        <Users />
    </div>)
}


