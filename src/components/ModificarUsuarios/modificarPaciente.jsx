import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { putUsuario } from "../../store/usuarios/thunks"
import "./ModificarPaciente.css"

export const ModificarPaciente = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { active } = useSelector((state) => state.paciente)

    const handleChangeValue = (e) => {
        const estado = e.target.value === "0"
        const updatedPaciente = { ...active.paciente, estado }

        dispatch(putUsuario({ paciente: updatedPaciente }))
        navigate(-1)
    }

    return (
        <div className="modificar-container">
            <div className="card">
                <h1 className="title">Modificar Usuario: {active.paciente.nombre}</h1>
                <div className="details">
                    <div className="info-item">
                        <strong>Estado:</strong>
                        <span>{active.paciente.estado ? "Activo" : "Inactivo"}</span>
                    </div>
                    <div className="info-item">
                        <strong>Correo:</strong>
                        <span>{active.paciente.correo}</span>
                    </div>
                    <select
                        className="form-select"
                        aria-label="Selecciona el estado"
                        onChange={handleChangeValue}
                        value={active.paciente.estado ? "0" : "1"}
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
                        className="btn btn-primary"
                        onClick={() => handleChangeValue({ target: { value: active.paciente.estado ? "1" : "0" } })}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    )
}
