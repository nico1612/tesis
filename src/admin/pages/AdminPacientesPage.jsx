import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setActivePaciente } from "../../store/usuarios/usuariosSlice";
import { startGettingpacientes } from "../../store/usuarios/thunks";
import { TablaCliente } from "../components";

export const AdminPacientesPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startGettingpacientes());
  }, []);

  const { pacientes } = useSelector((state) => state.paciente);

  const cambiarestado = ({ paciente }) => {
    dispatch(setActivePaciente({ paciente }));
    navigate(`/pacientes/${paciente.nombre}`);
  };

  return (
    <div className="container">
      <h2 className="my-4">Listado de Pacientes</h2>
      <TablaCliente pacientes={pacientes} cambiarestado={cambiarestado}/>
    </div>
  );
};