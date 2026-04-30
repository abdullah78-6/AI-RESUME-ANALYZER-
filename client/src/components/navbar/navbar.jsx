import { useDispatch } from "react-redux";
import { control } from "../../redux/slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {toast} from "react-toastify"
import axios from "axios"
const Navbar=({url})=>{
    const dispatch=useDispatch();
    const navclass=useSelector(state=>state.main.navclass);
    const token=useSelector(state=>state.main.token);
    const backendemail=useSelector(state=>state.main.backendemail);
    // useEffect(()=>{
    //     const tok=localStorage.getItem("token");
    //     const email=localStorage.getItem("email");
    //     if(tok){
    //         dispatch(control.settoken(tok));
            
    //     }
    //     if(email){
            
    //         dispatch(control.setbackendemail(email));
    //     }

    // },[token,backendemail]);
    useEffect(()=>{
        const fetchuser=async()=>{
            try {
                const res=await axios.get(url+"/api/auth/pr",{
                    withCredentials:true
                })
                if(res.data.status){
                    dispatch(control.setbackendemail(res.data.email));
                    dispatch(control.settoken(true));
                }
                else{
                    dispatch(control.setbackendemail(""));
                    dispatch(control.settoken(false));
                }
            } catch (error) {
                dispatch(control.setbackendemail(""));
                dispatch(control.settoken(false));
                
            }
        };
        fetchuser();

    },[]);
    const Logout=async()=>{
        // const tok=localStorage.getItem("token");
        // const email=localStorage.getItem("email");
        // toast.error("Logout Sucessfully");
        // if(email){
        //     localStorage.removeItem("email");
        //     dispatch(control.setbackendemail(""));
        // }
        // if(tok){
        //     localStorage.removeItem("token");
        //     dispatch(control.settoken(""));
        // }
        const response=await axios.post(url+"/api/auth/out",{},{
            withCredentials:true
        });
        if(response.data.status){
            dispatch(control.setbackendemail(""));
            dispatch(control.settoken(false));
        toast.success(response.data.message);

        }
        else{
            toast.error(response.data.message);
        }

    }
    return <div className="flex justify-between p-3 font-semibold shadow-2xl bg-green-900 text-white" >
        <div>
            <h1 className="text-sm md:text-2xl lg:text-2xl xl:text-2xl cursor-pointer">RESUME-<span className="text-green-300 cursor-pointer">ANALYZER</span></h1>

        </div>
        <ul className="  hidden  lg:flex   lg:gap-23 lg:text-xl lg:capitalize md:flex   md:gap-23 md:text-xl md:capitalize xl:flex   xl:gap-23 xl:text-xl xl:capitalize">
            <a href="/" onClick={()=>dispatch(control.setnav("home"))} className={`cursor-pointer ${navclass==="home"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>home</a>
            <a href="#s" onClick={()=>dispatch(control.setnav("contact-us"))} className={`cursor-pointer ${navclass==="contact-us"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>steps</a>
            <a href="#sc" onClick={()=>dispatch(control.setnav("scancv"))} className={`cursor-pointer ${navclass==="scancv"?" border-b-3 border-b-white mb-2  ":"hover:text-green-600 transition ease-in-out duration-200"}`}>scan-cv</a>
        </ul>
       
            
       
        <div className="flex justify-end gap-9">
            {token?<div className="border-2 rounded-4xl w-9 h-9 text-center">
                <h1 className="uppercase cursor-pointer">{backendemail.slice(0,1)}</h1></div>:<></>}
            {!token?<button className="bg-white text-green-500 p-2 rounded-2xl hover:bg-green-600 hover:text-white transition ease-in-out duration-200" onClick={()=>dispatch(control.setlogin(true))}>Login</button>:<button className="bg-red-600 text-white p-2 rounded-2xl hover:bg-white hover:text-red-600 transition ease-in-out duration-200"  onClick={Logout}>Logout</button>}
        </div>
 
    </div>

}
export default Navbar;