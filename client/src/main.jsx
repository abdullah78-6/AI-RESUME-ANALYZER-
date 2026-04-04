import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import Cvstore from './redux/store.js'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Cvstore}>
    <App />
    <ToastContainer  autoClose={3000} pauseOnHover style={{zIndex:9999}}/>
    </Provider>
  </StrictMode>,
)
