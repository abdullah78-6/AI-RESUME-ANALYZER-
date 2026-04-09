const Body=()=>{
    return <div className="font-semibold bg-gradient-to-t to-green-100 from-green-200 flex flex-col justify-center items-center mt-10 ml-9 mr-9 rounded-4xl py-9">
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
                
                <button className="text-sm text-gray-100 border bg-green-700 p-2 rounded-3xl  capitalize hover:bg-white hover:text-green-700 transition ease-in-out duration-200 ">start now </button>
            </div>
            <div>
                <button className="text-sm text-gray-100 border bg-green-700 p-2 rounded-3xl  capitalize hover:bg-white hover:text-green-700 transition ease-in-out duration-200">try demo</button>
            </div>
        </div>
    </div>

}
export default Body;