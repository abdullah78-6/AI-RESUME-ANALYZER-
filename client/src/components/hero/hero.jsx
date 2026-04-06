import { useEffect, useState } from "react";
import upload from "../../assets";
import {Document,Page,pdfjs} from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import { control } from "../../redux/slice";
pdfjs.GlobalWorkerOptions.workerSrc=workerSrc
const Hero=()=>{
    
    const image=useSelector(state=>state.main.image);
    const dispatch=useDispatch();
    
    const Sendtobackend=async(file)=>{
        if(file){
            dispatch(control.setimage(file));
            toast("SEND TO BACKEND");
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
                <Document file={{url:URL.createObjectURL(image)}} key={image?.name}>
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