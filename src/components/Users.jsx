import { useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
    
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const token=localStorage.getItem("token");
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
            .then((response) => {
                setUsers(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [filter]);

    return (<>
        <div className="font-bold mt-6 mx-2 text-lg">
            Users
        </div>
        <div className="m-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e) => {
                setFilter(e.target.value);
                console.log(filter)
            }}></input>
        </div>
        <div className="m-2">
            {users.map(user => <User key={user._id} user={user} navigate={navigate} />)}
        </div>
    </>)
}

function User({ user ,navigate}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.name} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.name}`);
            }} />
        </div>
    </div>
}