import { useNavigate } from "react-router-dom";
export function SignOut(){
    let navigate=useNavigate();
    return(
        <div className="absolute right-2 top-2 border-2 p-6 rounded-md bg-slate-50">
        <ul className="space-y-2 cursor-pointer text-lg">
            <li onClick={()=>{
                navigate("/update")
            }}>
                Update Profile
            </li>
            <li onClick={()=>{
                localStorage.removeItem("token");
                navigate("/signin")
            }}>Sign Out</li>
        </ul>
    </div>
    )
}