
export const checkFormRegister=({Email,Password,Name,Surname,setErrorMail,setErrorName,setErrorPassword,setErrorSurname})=>{

    let ok=true;

    if(Name===''){
        setErrorName(true)
        ok=false
    }
    else{
        setErrorName(false)
    }
    if(Surname===''){
        setErrorSurname(true)
        ok=false
    }
    else{
        setErrorSurname(false)
    }

    return ok
}