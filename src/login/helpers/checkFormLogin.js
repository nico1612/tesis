
export const checkFormLogin=({Email,Password,setErrorMail,setErrorPassword})=>{

    let ok=true
    const word='@'

    if (Email===''){
        setErrorMail(true)
        ok=false
    }
    else{
        setErrorMail(false)
    }

    if(Password===''){
        setErrorPassword(true)
        ok=false
    }
    else{
        setErrorPassword(false)
    }

    if(!Email.includes(word)){
        setErrorMail(true)
        ok=false
    }
    else{
        setErrorMail(false)
    }

    return ok
}