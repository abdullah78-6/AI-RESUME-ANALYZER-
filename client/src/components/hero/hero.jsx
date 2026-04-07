import { useEffect, useState } from "react";
import upload from "../../assets";
import {Document,Page,pdfjs} from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import { control } from "../../redux/slice";
import axios from "axios";
import { useRef } from "react";
import {ClipLoader} from "react-spinners";
pdfjs.GlobalWorkerOptions.workerSrc=workerSrc
// cloudinary abdullah02@gmail.com
// mongodb abdullahqidwai7@gmail.com
const Hero=()=>{
    const fileref=useRef();
const [cloudurl,setcloudurl]=useState(null);
const [loading,setloading]=useState(false);
    const[pdf,setpdf]=useState([]);
    const[image,setimage]=useState(false);
    const dispatch=useDispatch();
    const url="http://localhost:9000"
    const fetchresume=async()=>{
        try {
            const response2=await axios.get(`${url}/api/cv/get`);
            if(response2.data.status){
                setpdf(response2.data.ans);
                if(response2.data.ans.length>0){
                    setcloudurl(response2.data.ans[0].filename);
                    setimage({type:"application/pdf"});
                }
            }
            
        } catch (error) {
            console.log("fetch error",error);
            
        }
    }
    useEffect(()=>{
        fetchresume();

    },[]);
    const Sendtobackend=async(file)=>{
        if(file){
            setloading(true);
           const formdata=new FormData();
           formdata.append("cv",file);
           const response=await axios.post(`${url}/api/cv/add`,formdata);
           const response2=await axios.get(`${url}/api/cv/get`);
           if(response2.data.status){
            // setpdf((prev)=>[...prev,response2.data.ans])
            setpdf(response2.data.ans);
            setloading(false);
            console.log("this is your pdf ",pdf);
            
           }
             if(response.data.success){
                setloading(false);
                toast.success(response.data.message);
                setcloudurl(response.data.url);
                setimage(file);
             }
             else{
                setloading(false);
                toast.error(response.data.message);
             }
            
        }
        
        

    }
    const deleteresume=async(id)=>{
        setimage(null);
        setcloudurl(null);
        setloading(true);
        const newurl=url;
        const response=await axios.delete(`${newurl}/api/cv/del`,{
            data:{id}
        })
        if(response.data.success){
            toast.error(response.data.result);
            setpdf([]);
            setloading(false);
        }
        else{
            toast.error(response.data.result);
            setloading(false);
        }
        
        
    }
    
    

    
    return <div className="mt-10">
        <h1 className="text-center">HERO SECION </h1>
        {loading?<ClipLoader color="darkgreen" size={40}/>:<></>}
          
   {/* {image?<button onClick={deleteresume} className="p-2 bg-red-600  ml-7 rounded-2xl text-white hover:bg-red-900 transition ease-in-out duration-150">REMOVE RESUME</button>:<></>} */}
        <div>
            
                 
             {pdf.map((item,index)=>(
                <div key={index}>
                    {image?
                    <div>
                        <h1 className="text-red-700 text-2xl capitalize font-semibold">NOTE: remove old resume before adding new one </h1>
                        <button onClick={()=>deleteresume(item._id)} className="p-2 bg-red-600  ml-7 rounded-2xl text-white hover:bg-red-900 transition ease-in-out duration-150">REMOVE RESUME</button>
                    </div>:<></>}
                    {image && image?.type==="application/pdf" &&(
                <Document file={{url:cloudurl}} >
                    <Page pageNumber={1} width={150} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Document>
             )}
             {image&& image?.type?.startsWith("image/")&&(
                <img className="w-30" src={URL.createObjectURL(image)}/>
             )}

                </div>
             ))}
            
             {!image&&(
                
                <img src={upload.uploadarea} className="w-30" onClick={()=>fileref.current.click()} />
                
                
             )}

            
        <input ref={fileref} onChange={(e)=>Sendtobackend(e.target.files[0])} type="file" id="pdf" className="hidden" accept="application/pdf,image/*"/>
        </div>
    </div>

}
export default Hero;