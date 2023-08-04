import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const url=import.meta.env.VITE_APP_IP
export const SolicitudesPages=()=>{
    const { userId } = useSelector((state) => state.auth);
    const [solicitudes, setSolicitudes] = useState([]);
    const [cambio,setCambio]=useState(false)
  
    useEffect(() => {
      const fetchSolicitudes = async () => {
        try {
          
          const response = await axios.get(`${url}/api/buscar/solicitud/${userId}`);
          if(response.data.results.length > 0){
          setSolicitudes(response.data.results);
          }
         else{
          setSolicitudes(null)
         }
        } catch (error) {
          console.error('Error en la solicitud:', error.message);
          setSolicitudes([]);
        }
      };
  
      fetchSolicitudes();
    }, [cambio]); 
  
    const Aceptar = async({uid}) => {
      // Hacer algo con la solicitud aceptada
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { emisor: uid, receptor: userId,estado:true,mandado:false },
      };
      await axios(`${url}/api/relacion`, options)
      setCambio(!cambio)
      console.log(cambio)
    };
  
    
    const Rechazar = async({uid}) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { emisor: uid, receptor: userId,estado:false,mandado:false },
      };
      await axios(`${url}/api/relacion`, options);
      setCambio(!cambio)
    };
  
    return (
      <div className="container mt-4">
        <h2 className="text-center">Lista de Solicitudes</h2>
        <table className="table table-bordered mt-3">
          <thead className="thead-dark shadow">
            <tr>
              <th className="text-center" scope="col">Apellido</th>
              <th className="text-center" scope="col">Nombre</th>
              <th className="text-center" scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes === null && (
              <tr>
                <td colSpan="3" className="text-center">No hay solicitudes</td>
              </tr>
            )}
            {Array.isArray(solicitudes) && solicitudes.length > 0 && (
              solicitudes.map(({ uid, apellido, nombre }) => (
                <tr key={uid}>
                  <td className="text-center border-dark">{apellido}</td>
                  <td className="text-center border-dark">{nombre}</td>
                  <td className="text-center border-dark">
                    <button className="btn btn-success" onClick={() => Aceptar({ uid })}>Aceptar</button>
                    <button className="btn btn-danger ml-2" onClick={() => Rechazar({ uid })}>Rechazar</button>
                  </td>
                </tr>
              ))
            )}
            {Array.isArray(solicitudes) && solicitudes.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );

}