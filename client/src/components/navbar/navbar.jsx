import { useDispatch } from "react-redux";
import { control } from "../../redux/slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {toast} from "react-toastify"
const Navbar=()=>{
    const dispatch=useDispatch();
    const navclass=useSelector(state=>state.main.navclass);
    const token=useSelector(state=>state.main.token);
    const backendemail=useSelector(state=>state.main.backendemail);
    useEffect(()=>{
        const tok=localStorage.getItem("token");
        const email=localStorage.getItem("email");
        if(tok){
            dispatch(control.settoken(tok));
            
        }
        if(email){
            
            dispatch(control.setbackendemail(email));
        }

    },[token,backendemail]);
    const Logout=()=>{
        const tok=localStorage.getItem("token");
        const email=localStorage.getItem("email");
        toast.error("Logout Sucessfully");
        if(email){
            localStorage.removeItem("email");
            dispatch(control.setbackendemail(""));
        }
        if(tok){
            localStorage.removeItem("token");
            dispatch(control.settoken(""));
        }
    }
    return <div className="flex justify-between p-3 font-bold shadow-2xl bg-green-900 text-white" >
        <div>
            <h1 className="text-2xl">RESUME-<span className="text-green-300">ANALYZER</span></h1>

        </div>
        <ul className="flex   gap-7 text-xl capitalize">
            <li onClick={()=>dispatch(control.setnav("home"))} className={`cursor-pointer ${navclass==="home"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>home</li>
            <li onClick={()=>dispatch(control.setnav("contact-us"))} className={`cursor-pointer ${navclass==="contact-us"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>contact-us</li>
            <li onClick={()=>dispatch(control.setnav("scancv"))} className={`cursor-pointer ${navclass==="scancv"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>scan-cv</li>
        </ul>
       
            
       
        <div className="flex justify-end gap-9">
            {token?<div className="border-2 rounded-4xl w-9 h-9 text-center">
                <h1 className="uppercase">{backendemail.slice(0,1)}</h1></div>:<></>}
            {!token?<button className="bg-white text-green-500 p-2 rounded-2xl hover:bg-green-600 hover:text-white transition ease-in-out duration-200" onClick={()=>dispatch(control.setlogin(true))}>Login</button>:<button className="bg-red-600 text-white p-2 rounded-2xl hover:bg-white hover:text-red-600 transition ease-in-out duration-200"  onClick={Logout}>Logout</button>}
        </div>
 
    </div>

}
export default Navbar;