import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import Login from "./components/login-popup/Login";
import Navbar from "./components/navbar/navbar"
import {useSelector} from "react-redux"
import Step from "./components/steps/steps";
const Inner=()=>{
  const loginstatus=useSelector(state=>state.main.loginstatus);
return <>
  <Navbar/>
  {loginstatus?<Login/>:<></>}
  <Body/>
  <Step/>
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
