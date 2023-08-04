import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMedicos } from "../../store/medicos/thunks";
import { setActiveMedico } from "../../store";
import { useNavigate } from "react-router-dom";
import { TablaMedicos } from "../components/TablaMedico";

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
      <TablaMedicos medicos={medicos} cambiarestado={cambiarestado}/>
    </div>
  );
};
