import { useSelector } from "react-redux"


export const DatoPage=()=>{

  const {name,apellido,licencia,email} = useSelector((state) => state.auth)

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Información del usuario</h1>
          <div className="row">
            <div className="col-md-6">
              <h4>Nombre: {name}</h4>
              <h4>apellido: {apellido}</h4>
              <h4>Correo: {email}</h4>
              <h4>licencia: {licencia}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return (
      <div></div>
  )
}