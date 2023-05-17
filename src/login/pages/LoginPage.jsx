import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { startLogin,setError } from "../../store/"
import { useError, useForm } from "../../hooks"
import { checkFormLogin } from "../helpers"

const formData={ 
    Email:'',
    Password:''
}

export const LoginPage=()=>{

    const dispatch =useDispatch()
    const {Email,Password,onInputChange}= useForm(formData)

    const {ErrorMail,
        setErrorMail,
        ErrorPassword,
        setErrorPassword
    }= useError()

    const {error} =useSelector(state=>state.auth)

    useEffect(()=>{
        if(error)
        dispatch(setError())
    },[])

    const onSubmit=(event)=>{

        event.preventDefault()

        if(checkFormLogin({Email,
            Password,
            setErrorMail,
            setErrorPassword,
            })){
            dispatch( startLogin( {Email, Password} ) );
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold text-center py-5">Bienvenido</h1>
                </div>

                {
                    (error) &&
                    <div className="alert alert-danger" role="alert">
                        usuario y/o contraseña incorrectas
                    </div>
                }

                <form onSubmit={onSubmit}>
    
                    {
                        (ErrorMail)
                        ?<>
                            <div className="mb-6 col-sm-4-auto p-4 text-center border border-danger">
                                <label className="form-label"> Mail</label>
                                <input type="email" className="form-control" name= "Email" value={Email} onChange={onInputChange}/>
                            </div> <p>Mail es requerido correctamente</p>
                        </>
                        :<div className="mb-6 col-sm-4-auto p-4 text-center">
                            <label className="form-label"> Mail</label>
                            <input type="email" className="form-control" name= "Email" value={Email} onChange={onInputChange}/>
                        </div>
                    }

                    {
                        (!ErrorPassword)
                        ?<div className="mb-6 col-sm-4-auto p-4 text-center">
                            <label className="form-label"> Password</label>
                            <input type="password" className="form-control" name= "Password" value={Password} onChange={onInputChange}/>
                        </div>
                        :<>
                            <div className="mb-6 col-sm-4-auto p-4 text-center border  border-danger">
                                <label className="form-label"> Password</label>
                                <input type="password" className="form-control" name= "Password" value={Password} onChange={onInputChange}/>
                            </div>
                            <p>Contraseña es requerido</p>
                        </>
                    }

                    <div className="mb-6 col-sm-4-auto p-4 text-center">
                        <button type="submit" className="btn btn-primary" onClick={onSubmit} > Iniciar sesion</button>
                    </div>

                    <div className="my-3 mb-6 col-sm-4-auto p-5 text-center">
                        <span>No tienes cuenta? </span> <Link to={"/auth/register"}>Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}