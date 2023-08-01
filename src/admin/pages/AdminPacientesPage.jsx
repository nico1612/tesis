import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setActivePaciente } from "../../store/usuarios/usuariosSlice";
import { startGettingpacientes } from "../../store/usuarios/thunks";

export const AdminPacientesPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startGettingpacientes());
  }, []);

  const { pacientes } = useSelector((state) => state.paciente);

  const cambiarestado = ({ paciente }) => {
    dispatch(setActivePaciente({ paciente }));
    navigate(`/paciente/${paciente.nombre}`);
  };

  return (
    <div className="container">
      <h2 className="my-4">Listado de Pacientes</h2>
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Cambiar Estado</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombre}</td>
              <td>
                <span
                  className={`badge ${
                    paciente.estado ? "bg-success" : "bg-danger"
                  }`}
                >
                  {paciente.estado ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>
                <button
                  className={`btn ${paciente.estado ? "btn-success" : "btn-danger"}`}
                  onClick={() => cambiarestado({ paciente })}
                >
                  {paciente.estado ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};