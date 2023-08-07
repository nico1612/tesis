import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TablaSolicitudes } from "../../componentes";

const url=import.meta.env.VITE_APP_IP

export const SolicitudesPages = () => {
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
      data: { emisor: uid, receptor: userId,estado:true,mandado:true },
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
      data: { emisor: uid, receptor: userId,estado:false,mandado:true },
    };
    await axios(`${url}/api/relacion`, options);
    setCambio(!cambio)
  };

  return (
    <TablaSolicitudes Aceptar={Aceptar} Rechazar={Rechazar} solicitudes={solicitudes}/>
  );
};
