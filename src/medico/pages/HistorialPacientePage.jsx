import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const HistorialPacientesPage = () => {
  const location = useLocation();
  const { id, nombre, apellido } = location.state;
  const url = import.meta.env.VITE_APP_IP;

  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${url}/api/buscar/consultas/${id}`);
        setConsultas(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setLoading(false);
        setConsultas([]);
      }
    };

    fetchConsultas();
  }, [id]);


  const regresar = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <h2 className="my-4">Historial de Consultas de {nombre} {apellido}</h2>
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : consultas.length > 0 ? (
        <div>
          {consultas.map((consulta) => (
            <div key={consulta._id} className="card mb-3">
              <div className="card-body">
                <p className="card-text">Fecha: {consulta.dia}/{consulta.mes}/{consulta.ano}</p>
                <p className="card-text">Resultado: {consulta.resultado}</p>
                <img src={consulta.img} alt="Consulta" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">No se encontraron consultas.</div>
      )}
      <button className="btn btn-primary mt-3" onClick={regresar}>Regresar</button>
    </div>
  );
};