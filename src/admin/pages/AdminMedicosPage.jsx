import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMedicos } from "../../store/medicos/thunks";
import { setActiveMedico } from "../../store";
import { useNavigate } from "react-router-dom";

export const AdminMedicosPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startGettingMedicos());
  }, []);

  const { medicos } = useSelector((state) => state.medico);

  const cambiarestado = ({ medico }) => {
    dispatch(setActiveMedico({ medico }));
    navigate(`/medicos/${medico.nombre}`);
  };

  return (
    <div className="container">
      <h2 className="my-4">Listado de Médicos</h2>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Estado</th>
            <th scope="col">Licencia</th>
            <th scope="col">Cambiar Estado</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id}>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
              <td>{medico.estado ? "Activo" : "Inactivo"}</td>
              <td>{medico.licencia}</td>
              <td>
                <button
                  className={`btn ${medico.estado ? "btn-success" : "btn-danger"}`}
                  onClick={() => cambiarestado({ medico })}
                >
                  {medico.estado ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
