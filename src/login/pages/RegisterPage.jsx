import { useEffect } from "react"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { startRegister,setError } from "../../store/"
import { useError, useForm } from "../../hooks"
import { checkFormLogin, checkFormRegister } from "../helpers"

const formData={ 
    Email:'',
    Surname:'',
    Name:'',
    Password:''
}

export const RegisterPage=()=>{

    const {Email,Name,Surname,Password,onInputChange}= useForm(formData)

    const {error} =useSelector(state=>state.auth)
    const dispatch =useDispatch()

    const {ErrorMail,
        setErrorMail,
        ErrorPassword,
        setErrorPassword,
        ErrorName,
        setErrorName,
        ErrorSurname,
        setErrorSurname
    }= useError()

    useEffect(()=>{
        if(error)
        dispatch(setError())
    })

    const onSubmit=(event)=>{

        event.preventDefault()

        if(checkFormRegister({ Name, Surname, setErrorName, setErrorSurname}) && checkFormLogin({Email,Password,setErrorMail,setErrorPassword})){
            dispatch( startRegister({ Email, Password,Name,Surname }) );
        }
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="fw-bold text-center py-5">Registrese</h2>
                    </div>
                    
                    {
                        (error) && <div className="alert alert-danger" role="alert">
                                Usuario registrado
                            </div>
                    }

                    <form className="col-xs-12" onSubmit={onSubmit}>

                    {(ErrorName)
                        ?<>
                        <div className="mb-6 col-sm-4-auto p-4 text-center border border-danger">
                            <label className="form-label"> Nombre</label>
                            <input type="text" className="form-control" name= "Name" value={Name} onChange={onInputChange}/>
                        </div>
                        <p>Nombre es requerido</p>
                        </>
                        :<div className="mb-6 col-sm-4-auto p-4 text-center">
                            <label className="form-label"> Nombre</label>
                            <input type="text" className="form-control" name= "Name" value={Name} onChange={onInputChange}/>
                        </div>
                    }

                    {(ErrorSurname)
                        ?<>
                        <div className="mb-6 col-sm-4-auto p-4 text-center border border-danger">
                            <label className="form-label"> Apellido</label>
                            <input type="text" className="form-control" name= "Surname" value={Surname} onChange={onInputChange}/>
                        </div>
                        <p>Apellido es requerido</p>
                        </>
                        :<div className="mb-6 col-sm-4-auto p-4 text-center ">
                            <label className="form-label"> Apellido</label>
                            <input type="text" className="form-control" name= "Surname" value={Surname} onChange={onInputChange}/>
                        </div>
                    }

                    {(ErrorMail)
                        ?<>
                            <div className="mb-6 col-sm-4-auto p-4 text-center border border-danger">
                                <label className="form-label"> Mail</label>
                                <input type="email" className="form-control" name= "Email" value={Email} onChange={onInputChange}/>
                            </div> <p>Mail es requerido</p>
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
                                <span id="passwordHelpInline" className="form-text">
                                    Debe tener 8 caracteres, por lo menos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.
                                </span>
                            </div>
                            :<>
                                <div className="mb-6 col-sm-4-auto p-4 text-center border  border-danger">
                                    <label className="form-label"> Password</label>
                                    <input type="password" className="form-control" name= "Password" value={Password} onChange={onInputChange}/>
                                    <span id="passwordHelpInline" className="form-text">
                                        Debe tener 8 caracteres, por lo menos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.
                                    </span>
                                </div>
                                <p>Contraseña es requerido</p>
                            </>
                        }

                        <div className="mb-6 col-sm-4-auto p-4 text-center">
                            <button type="submit" className="btn btn-primary" > Registrarse</button>
                        </div>
                        
                        <div className="mb-6 col-sm-4-auto  p-5 text-center">
                            <span> Tienes cuenta? </span> <Link to={"/auth/login"}>Iniciar sesión</Link>
                        </div>
 
                    </form>
                </div>
            </div>
        </>
    )
}