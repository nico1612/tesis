import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const Solicitudes = () => {
  const { userId } = useSelector((state) => state.auth);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/buscar/solicitud/${userId}`);
        console.log(response.data.results); // Muestra la respuesta en la consola para verificarla
        setSolicitudes(response.data.results); // Establece el estado de los pacientes con la lista de resultados
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
        setSolicitudes([]); // Si hay un error, establece el estado de las solicitudes como una lista vacía
      }
    };

    fetchSolicitudes();
  }, [userId]);

  return (
    <>
      {/* Aquí puedes renderizar las solicitudes en la interfaz de usuario */}
    </>
  );
};