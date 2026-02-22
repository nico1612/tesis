import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setActiveMedico, startGettingMedicos } from "../../../store"
import {TablaMedico} from '../../tablaAministracion/TablaMedico'

export const AdminMedicosPages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(startGettingMedicos())
  }, [])

  const { medicos } = useSelector((state) => state.medico)

  const cambiarestado = ({ medico }) => {
    dispatch(setActiveMedico({ medico }))
    navigate(`/medicos/${medico.nombre}`)
  }

  return (
    <div>
    <div className="container">
      <h2 className="my-4">Listado de Médicos</h2>
      <TablaMedico medicos={medicos} cambiarestado={cambiarestado}/>
    </div>
    </div>
  )
}
