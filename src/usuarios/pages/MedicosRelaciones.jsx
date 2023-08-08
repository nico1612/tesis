import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_APP_IP;

export const MedicosRelaciones = () => {
  const { userId } = useSelector((state) => state.auth);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultasAndEstadisticas = async () => {
      try {
        const { data } = await axios.get(`${url}/api/buscar/relaciones/${userId}`);
        console.log(data); 
        setMedicos(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setLoading(false);
      }
    };

    fetchConsultasAndEstadisticas();
  }, []);

  const eliminar = (medico) => {
    console.log("Eliminar médico:", medico);
    // Aquí puedes implementar la lógica para eliminar al médico de la base de datos
    // Por ejemplo, podrías hacer una solicitud DELETE con Axios y actualizar el estado 'medicos'
    // después de que el médico se haya eliminado con éxito.
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : medicos.length === 0 ? (
        <p className="text-center">No se encontraron médicos relacionados.</p>
      ) : (
        <div>
          <h2 className="text-center mb-4">Información de los médicos:</h2>
          {medicos.map((medico, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">Médico {index + 1}:</h3>
                <p><strong>Nombre:</strong> {medico.nombre}</p>
                <p><strong>Apellido:</strong> {medico.apellido}</p>
                <p><strong>Correo:</strong> {medico.correo}</p>
                <button className="btn btn-danger" onClick={() => eliminar(medico)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
