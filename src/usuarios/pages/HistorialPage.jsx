import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const HistorialPage = () => {
  const url = import.meta.env.VITE_APP_IP;
  const { userId } = useSelector((state) => state.auth);
  const id = userId;

  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});

  useEffect(() => {
    const fetchConsultasAndEstadisticas = async () => {
      try {
        const [consultasResponse, estadisticasResponse] = await Promise.all([
          axios.get(`${url}/api/buscar/consultas/${id}`),
          axios.get(`${url}/api/pacientes/estadisticas/${id}`)
        ]);

        setConsultas(consultasResponse.data.results);
        setEstadisticas(estadisticasResponse.data.resultados);
        console.log(estadisticas)
        setLoading(false);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setLoading(false);
        setConsultas([]);
      }
    };

    fetchConsultasAndEstadisticas();
  }, [id, url]);

  return (
    <div className="container py-4">
      <div className="card p-4">
        <h2 className="mb-4 text-center">Tu historial</h2>
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : consultas.length > 0 ? (
          <div>
            <div className="mb-4 text-center">
              <h3>Estadísticas</h3>
              <p className="lead">
                <strong>Total de consultas:</strong> {estadisticas.total}
              </p>
              <div className="row">
                <div className="col-md-4">
                  <p className="text-primary">
                    <strong>Dermatitis Atópica:</strong> {estadisticas.dermatitisAtopica}
                  </p>
                  <p className="text-primary">
                    <strong>Dermatitis de Contacto:</strong> {estadisticas.dermatitisDeContacto}
                  </p>
                  <p className="text-primary">
                    <strong>Psoriasis:</strong> {estadisticas.psiorasis}
                  </p>
                  <p className="text-primary">
                    <strong>Ninguna de las anteriores:</strong> {estadisticas.otros}
                  </p>
                </div>
                <div className="col-md-8">
                  <p className="text-primary">
                    <strong>Del total el {estadisticas.porcentajeDermatitisAtopica}% fueron de dermatitis Atópica</strong>
                  </p>
                  <p className="text-primary">
                    <strong>Del total el {estadisticas.porcentajePsiorasis}% fueron de Psoriasis</strong>
                  </p>
                  <p className="text-primary">
                    <strong>Del total el {estadisticas.porcentajDermatitisDeContacto}% fueron de dermatitis de Contacto</strong>
                  </p>
                  <p className="text-primary">
                    <strong>Del total el {estadisticas.porcentajeOtros}% pertenecen a otra categoría</strong>
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-primary">Consultas:</h4>
            <div className="row">
              {consultas.map((consulta) => (
                <div key={consulta._id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        Fecha: {consulta.dia}/{consulta.mes}/{consulta.ano}
                      </p>
                      {consulta.resultado === "ninguno de los tres" ? (
                        <p className="card-text">
                          No es dermatitis atópica, dermatitis de contacto o psoriasis.
                        </p>
                      ) : (
                        <p className="card-text">Resultado: {consulta.resultado}</p>
                      )}
                      {consulta.img && (
                        <img src={consulta.img} alt="Consulta" className="img-fluid" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="alert alert-warning text-center">No se encontraron consultas.</div>
        )}
      </div>
    </div>
  );
};