import { SignOut } from "./Signout";
export function Balance({value,taskbar}){
    return (
        <div className="relative top-0 left-0"> 
   <div className="flex p-4">
        <div className="text-lg font-bold">Your Balance :</div>
        <div className="text-lg ml-4 font-semibold"> Rs {value}</div>
    </div>
{taskbar&&<SignOut/>}
        </div>
)
}