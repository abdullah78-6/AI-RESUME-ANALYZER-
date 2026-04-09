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
    const token=useSelector(state=>state.main.token);
    const url="http://localhost:9000"
    const [file,setfile]=useState();
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
    const Sendtobackend=async()=>{
        if(!token){
            toast.error("USER LOGIN REQUIRED");
            return ;
        }
        if(!file){
            toast.error("PLEASE UPLOAD RESUME")
            return ;
        }
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
            setfile("");
            
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
      <div className="flex justify-center items-center">
        {loading?<ClipLoader color="darkgreen" size={50}  />:<></>}
        </div>  
          
   {/* {image?<button onClick={deleteresume} className="p-2 bg-red-600  ml-7 rounded-2xl text-white hover:bg-red-900 transition ease-in-out duration-150">REMOVE RESUME</button>:<></>} */}
        <div className="flex justify-center items-center gap-2 flex-col mt-5">
            
                 
             {pdf.map((item,index)=>(
                <div key={index}>
                    {image?
                    <div className="flex justify-center items-center flex-col gap-15">
                        <h1 className="text-red-700 text-xl capitalize font-semibold">NOTE: remove old resume before adding new one. </h1>
                        <button onClick={()=>deleteresume(item._id)} className="p-2 bg-red-600  ml-7 rounded-2xl text-white hover:bg-red-900 transition ease-in-out duration-150">REMOVE RESUME</button>
                    </div>:<></>}
                    {image && image?.type==="application/pdf" &&(
                        <div className="flex justify-center items-center  mt-5">
                <Document  file={{url:cloudurl}} >
                    <Page   pageNumber={1} width={250} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Document>
                </div>
             )}
             {image&& image?.type?.startsWith("image/")&&(
                <img className="w-30" src={URL.createObjectURL(image)}/>
             )}

                </div>
             ))}
        
          {!file ?  
            <div>
             {!image&&(
                
               <img   src={upload.uploadarea} className="w-30" onClick={()=>fileref.current.click()} />
                
                
             )}
             </div>:<></>}
             {file?
             <Document  file={{url:URL.createObjectURL(file)}} >
                    <Page   pageNumber={1} width={250} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Document>:<></>}

            
        <input ref={fileref} onChange={(e)=>setfile(e.target.files[0])} type="file" id="pdf" className="hidden" accept="application/pdf,image/*"/>
        <div>
            <button onClick={Sendtobackend} className="font-semibold mt-3 bg-pink-600 p-3 rounded-3xl text-white hover:bg-pink-900 transition ease-in-out duration-200 ">ANALYZE RESUME</button>
        </div>
        </div>
    </div>

}
export default Hero;