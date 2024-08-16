import { createSlice } from "@reduxjs/toolkit"


export const authSlice = createSlice({
    
    name: 'auth',
    
    initialState: {
        status: 'checking',//'checking', 'not-authenticated' , 'authenticated'
        email:null,
        userId:null,
        name:null,
        apellido:null,
        licencia:null,
        errorMessage:null,
        error:false,
        token:null,
        rol:null,
        consultas:0
    }, 

    reducers: {
        login:(state,{payload})=>{
            state.status = 'authenticated',
            state.email = payload.usuario.correo,
            state.userId = payload.usuario.uid,
            state.name = payload.usuario.nombre,
            state.apellido=payload.usuario.apellido
            state.error=false,
            state.token=payload.token,
            state.rol=payload.usuario.rol
            if(payload.usuario.consultas){
                state.consultas=payload.usuario.consultas
            }
            if(payload.usuario.licencia){
                state.licencia=payload.usuario.licencia
            }
        },
        logout:(state,{payload})=>{
            state.status='not-authenticated'
            state.email=null,
            state.userId=null,
            state.name=null,
            state.errorMessage=payload?.errorMessage
            state.error=true
            state.error=null
            state.rol=null
        },
        checkingCredentials:(state)=>{
            state.status='checking'
        },
        actualizar:(state,{payload})=>{
            state.consultas=state.consultas+payload.usuario.consultas
        },
        setError:(state)=>{
            state.error=!state.error
        }
    }
})

export const { login,logout,checkingCredentials,setError } = authSlice.actions