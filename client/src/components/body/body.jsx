import {toast} from "react-toastify";
import axios from "axios"
import { useState } from "react";
import { control } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Body=()=>{
    const [data,setdata]=useState([]);
    const token=useSelector(state=>state.main.token);
    const[form,setform]=useState(false);
    const url="http://localhost:9000/api/cv/mak";
    useEffect(()=>{
        const fileurl=localStorage.getItem("url");
        if(fileurl){
            setdata([fileurl]);
        }

    },[]);
    const[name,setname]=useState("");
    const[address,setaddress]=useState("");
    const[phonenumber,setphonenumber]=useState("");
    const[email,setemail]=useState("");    
    const[company,setcompany]=useState("");
    const Maker=async(e)=>{
        e.preventDefault();
        if(!token){
            toast.error("User Login Required");
            return ;
        }
    const response=await axios.post(url,{
            name,
            email,
            address,
            phonenumber,
            company
        });
        if(response.data.status){
            console.log(response.data.ans);
            setdata([...data,response.data.ans.data.file_url]);
            localStorage.setItem("url",response.data.ans.data.file_url);
        }
        else{
            toast.error(response.data.ans);
        }
        
        
    }
    return <div className="font-semibold bg-gradient-to-t to-green-100 from-green-200 flex flex-col justify-center items-center mt-10 ml-9 mr-9 rounded-4xl py-9" >
        <div className="text-center mt-10 text-green-700 ">
            <h1 className="text-4xl  capitalize">land your dream job with</h1>
            <p className="text-gray-900 capitalize text-4xl mt-3">ai-powered resumes.</p>
        </div>
        <div className="mt-5 text-center text-gray-900 capitalize">
            <p>analyze your professional resumes with </p>
            <p>ai-powered assistance</p>
        </div>
        <div className="text-gray-900 capitalize flex gap-3 flex-wrap justify-center items-center mt-3">
            <div className="">
                
                <a href="#sc" className="text-sm cursor-pointer text-gray-100 border bg-green-700 p-2 rounded-3xl  capitalize hover:bg-white hover:text-green-700 transition ease-in-out duration-200 ">start now </a>
            </div>
            <div>
                {/* <a href="#sc" className="text-sm cursor-pointer text-gray-100 border bg-green-700 p-2 rounded-3xl  capitalize hover:bg-white hover:text-green-700 transition ease-in-out duration-200">try demo</a>
                 */}
                 <button type="button" onClick={()=>setform(true)} className="text-sm cursor-pointer text-gray-100 border bg-green-700 p-2 rounded-3xl  capitalize hover:bg-white hover:text-green-700 transition ease-in-out duration-200">Create Resume</button>
            </div>
        </div>
        {form?<div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl">
    
    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4">
        create ats freindly job resume
    </p>

    <div className="flex justify-end">
        <h1 
            className="cursor-pointer text-red-700 text-xl sm:text-2xl font-bold"
            onClick={()=>setform(false)}
        >
            X
        </h1>
    </div>

    <form onSubmit={Maker} className="space-y-4 sm:space-y-5">
        
        <div className="flex flex-col">
            <label htmlFor="name" className="text-sm sm:text-base font-medium mb-1">name</label>
            <input 
                onChange={(e)=>setname(e.target.value)} 
                type="text" 
                placeholder="enter name" 
                required 
                className="border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="email" className="text-sm sm:text-base font-medium mb-1">email</label>
            <input 
                onChange={(e)=>setemail(e.target.value)} 
                type="text" 
                placeholder="enter email" 
                required
                className="border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="number" className="text-sm sm:text-base font-medium mb-1">phone number</label>
            <input 
                onChange={(e)=>setphonenumber(e.target.value)} 
                type="number" 
                placeholder="enter number" 
                required
                className="border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="address" className="text-sm sm:text-base font-medium mb-1">address</label>
            <input 
                onChange={(e)=>setaddress(e.target.value)} 
                type="text" 
                placeholder="enter address" 
                required
                className="border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="company" className="text-sm sm:text-base font-medium mb-1">company</label>
            <input 
                onChange={(e)=>setcompany(e.target.value)} 
                type="text" 
                placeholder="enter company" 
                required
                className="border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <div>
            <button className="w-full bg-green-700 hover:bg-green-800 transition text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold">
                create resume
            </button>
        </div>

    </form>

    <div className="mt-4 space-y-2">
        {data.map((url,index)=> {
           return (
            <div key={index} className="text-center">
                <a 
                    href={url} 
                    target="_blank" 
                    className="text-blue-600 hover:underline text-sm sm:text-base"
                >
                    Go to resume
                </a>
            </div>
           )
        })}
    </div>

</div>:<></>}
    </div>

}
export default Body;