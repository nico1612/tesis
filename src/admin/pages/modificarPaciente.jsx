import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putUsuario } from "../../store/usuarios/thunks";

export const ModificarPaciente = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { active } = useSelector((state) => state.paciente);

  const handleChangeValue = () => {
    // Crea una copia del objeto active y del objeto usuario
    const newActive = { ...active };
    newActive.paciente = { ...active.paciente };

    // Modifica el valor del estado en la copia
    newActive.paciente.estado = !active.paciente.estado;

    // Despacha la acción para actualizar el estado con la copia modificada
    dispatch(putUsuario({ paciente: newActive.paciente }));

    // Navega de regreso a la página anterior
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h1 className="fw-bold text-center mb-5">
            Modificar médico: {active.paciente.nombre} 
          </h1>
          <div className="mb-3">
            <h2>Estado: {active.paciente.estado ? "Activo" : "Inactivo"}</h2>
            <h2>correo: {active.paciente.correo}</h2>
            <select
              className="form-select mt-3"
              aria-label="Default select example"
              onChange={handleChangeValue}
              value={active.paciente.estado ? "0" : "1"}
            >
              <option value="0">Activo</option>
              <option value="1">Inactivo</option>
            </select>
          </div>
          <div className="d-grid mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};