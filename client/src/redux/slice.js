import {createSlice} from "@reduxjs/toolkit"
const cvslice=createSlice({
    name:"analyzer",
    initialState:{loginstatus:false,navclass:"",input:"text",statelog:"signin",logindata:{
     name:"",
     email:"",
     password:""   
    },token:"",backendemail:""},
    reducers:{
        setlogin(state,action){
            state.loginstatus=action.payload;
        },
        setnav(state,action){
            state.navclass=action.payload;
        },
        setloginds(state,action){
            const {name,value}=action.payload;
            state.logindata[name]=value;
        },
        setstatelog(state,action){
            state.statelog=action.payload;

        },
        setinput(state,action){
            state.input=action.payload;
        },
        settoken(state,action){
            state.token=action.payload;
        },
        setbackendemail(state,action){
            state.backendemail=action.payload;
        }
        

    }
})
export const control=cvslice.actions;
export default cvslice.reducer;