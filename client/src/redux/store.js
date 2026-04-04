import {configureStore} from "@reduxjs/toolkit"
import cvdata from "./slice.js"
const Cvstore=configureStore({
    reducer:{
        main:cvdata
    }
})
export default Cvstore;