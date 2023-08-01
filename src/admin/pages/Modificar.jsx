import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putMedicos } from "../../store";

export const Modificar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { active } = useSelector((state) => state.medico);

  const handleChangeValue = () => {
    // Crea una copia del objeto active y del objeto medico
    const newActive = { ...active };
    newActive.medico = { ...active.medico };

    // Modifica el valor del estado en la copia
    newActive.medico.estado = !active.medico.estado;

    // Despacha la acción para actualizar el estado con la copia modificada
    dispatch(putMedicos({ medico: newActive.medico }));

    // Navega de regreso a la página anterior
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h1 className="fw-bold text-center mb-5">
            Modificar médico: {active.medico.nombre} {active.medico.apellido}
          </h1>
          <div className="mb-3">
            <h2>Estado: {active.medico.estado ? "Activo" : "Inactivo"}</h2>
            <h2>Licencia: {active.medico.licencia}</h2>
            <select
              className="form-select mt-3"
              aria-label="Default select example"
              onChange={handleChangeValue}
              value={active.medico.estado ? "0" : "1"}
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