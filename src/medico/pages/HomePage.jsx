import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { userId } = useSelector((state) => state.auth);
  const url = import.meta.env.VITE_APP_IP;
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(`${url}/api/pacientes/${userId}`);
        setPacientes(response.data.usuarios);
        setLoading(false);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setLoading(false);
        setPacientes([]);
      }
    };

    fetchPacientes();
  }, [userId]);

  const verHistorial = (usuario) => {
    const { nombre, apellido, uid } = usuario;
    navigate(`/historial/${nombre}`, {
      state: { id: uid, nombre, apellido },
    });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Pacientes</h1>
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : pacientes.length === 0 ? (
        <div className="text-center">Medico sin pacientes</div>
      ) : (
        <div className="row">
          {pacientes.map((paciente) => (
            <div key={paciente.uid} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{paciente.nombre}</h5>
                  <h5>{paciente.apellido}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => verHistorial(paciente)}
                  >
                    Ver Historial
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};