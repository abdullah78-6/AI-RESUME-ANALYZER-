import Login from "./components/login-popup/Login";
import Navbar from "./components/navbar/navbar"
import {useSelector} from "react-redux"
const Inner=()=>{
  const loginstatus=useSelector(state=>state.main.loginstatus);
return <>
  <Navbar/>
  {loginstatus?<Login/>:<></>}
</>
}
function App() {
  return (
    <>
    <Inner/>
  
    </>
  )
}

export default App
