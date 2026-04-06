import { useEffect, useState } from "react";
import upload from "../../assets";
import {Document,Page,pdfjs} from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import { control } from "../../redux/slice";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc=workerSrc
// cloudinary abdullah02@gmail.com
// mongodb abdullahqidwai7@gmail.com
const Hero=()=>{
    const [cloudurl,setcloudurl]=useState();
    const image=useSelector(state=>state.main.image);
    const dispatch=useDispatch();
    const url="http://localhost:9000"
    const Sendtobackend=async(file)=>{
        if(file){
            dispatch(control.setimage(file));
           const formdata=new FormData();
           formdata.append("cv",file);
           const response=await axios.post(`${url}/api/cv/add`,formdata);
             if(response.data.success){
                toast.success(response.data.message);
                setcloudurl(response.data.url);
             }
             else{
                toast.error(response.data.message);
             }
            
        }
        
        

    }
    const deleteresume=async()=>{
        dispatch(control.setimage(""));
        toast("IMAGE DELETED FROM BACKEND ");
    }
    
    

    
    return <div className="mt-10">
        <h1 className="text-center">HERO SECION </h1>
        {image?<button onClick={deleteresume} className="p-2 bg-red-600  ml-7 rounded-2xl text-white hover:bg-red-900 transition ease-in-out duration-150">REMOVE RESUME</button>:<></>}
        <div>
            <label htmlFor="pdf">
             {/* {image&& image.type.startsWith("image/")&&(
                <img className="w-30" src={URL.createObjectURL(image)}/>
             )}   */}
             {image && image.type==="application/pdf" &&(
                <Document file={{url:cloudurl}} key={image?.name}>
                    <Page pageNumber={1} width={520} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Document>
             )}
             {!image&&(
                <img src={upload.uploadarea} className="w-30"/>
             )}

            </label>
        <input onChange={(e)=>Sendtobackend(e.target.files[0])} type="file" id="pdf" className="hidden" accept="application/pdf,image/*"/>
        </div>
    </div>

}
export default Hero;