import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingMedicos } from "../../store/medicos/thunks";
import { setActiveMedico } from "../../store";
import { useNavigate } from "react-router-dom";

export const AdminMedicosPages = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()

  useEffect(() => {
    dispatch(startGettingMedicos());
  }, []);

  const { medicos } = useSelector((state) => state.medico);
  console.log(medicos)
  const cambiarestado=({medico})=>{  
    
    dispatch(setActiveMedico({medico}))
   Navigate(`/medicos/${medico.nombre}`)
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">nombre</th>
            <th scope="col">apellido</th>
            <th scope="col">Estado</th>
            <th scope="col">licencia</th>
            <th scope="col">cambiar estado</th>
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
                <button className="btn" onClick={() => cambiarestado({medico})}>
                    actualizar estado
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};