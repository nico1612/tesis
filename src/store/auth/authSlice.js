import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    
    name: 'auth',
    
    initialState: {
        status: 'checking',//'checking', 'not-authenticated' , 'authenticated'
        email:null,
        userId:null,
        name:null,
        errorMessage:null,
        error:false,
        token:null,
    }, 

    reducers: {
        login:(state,{payload})=>{
            state.status = 'authenticated',
            state.email = payload.email,
            state.userId = payload.userId,
            state.name = payload.name,
            state.error=false
            state.token=payload.token
        },
        logout:(state,{payload})=>{
            state.status='not-authenticated';
            state.email=null,
            state.userId=null,
            state.name=null,
            state.errorMessage=payload?.errorMessage
            state.error=true
            state.error=null
        },
        checkingCredentials:(state)=>{
            state.status='checking'
        },
        setError:(state)=>{
            state.error=!state.error
        }
    }
});

export const { login,logout,checkingCredentials,setError } = authSlice.actions;