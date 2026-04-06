import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import Login from "./components/login-popup/Login";
import Navbar from "./components/navbar/navbar"
import {useSelector} from "react-redux"
const Inner=()=>{
  const loginstatus=useSelector(state=>state.main.loginstatus);
return <>
  <Navbar/>
  {loginstatus?<Login/>:<></>}
  <Hero/>
  <Footer/>
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
