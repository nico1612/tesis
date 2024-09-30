import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { putMedicos } from '../../store'
import axios from 'axios'
import './Modificar.css' // Asegúrate de importar el CSS

const url = import.meta.env.VITE_APP_IP

export const Modificar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { active } = useSelector((state) => state.medico)

  const eliminar = async () => {
    const formData = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios(`${url}/api/medico/${active.medico.uid}`, formData)
    navigate(-1)
  }

  const handleChangeValue = () => {
    // Crea una copia del objeto active y del objeto medico
    const newActive = { ...active }
    newActive.medico = { ...active.medico }

    // Modifica el valor del estado en la copia
    newActive.medico.estado = !active.medico.estado

    // Despacha la acción para actualizar el estado con la copia modificada
    dispatch(putMedicos({ medico: newActive.medico }))

    // Navega de regreso a la página anterior
    navigate(-1)
  }

  return (
    <div className="modificar-container ">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <h1 className="title">
              Modificar médico: {active.medico.nombre} {active.medico.apellido}
            </h1>
            <div className="details">
              <div className="info-item">
                <h2>Estado: {active.medico.estado ? 'Activo' : 'Inactivo'}</h2>
              </div>
              <div className="info-item">
                <h2>Licencia: {active.medico.licencia}</h2>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleChangeValue}
                value={active.medico.estado ? '0' : '1'}
              >
                <option value="0">Activo</option>
                <option value="1">Inactivo</option>
              </select>
            </div>
            <div className="actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={eliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
