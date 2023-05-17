import { useState } from "react"

export const useError=()=>{
    const [ErrorMail,setErrorMail] =useState(false)
    const [ErrorPassword,setErrorPassword] =useState(false)
    const [ErrorName,setErrorName] =useState(false)
    const [ErrorSurname,setErrorSurname] =useState(false)

    return{
        ErrorMail,
        setErrorMail,
        ErrorPassword,
        setErrorPassword,
        ErrorName,
        setErrorName,
        ErrorSurname,
        setErrorSurname
    }
}
