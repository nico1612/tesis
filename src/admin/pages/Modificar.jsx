import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putMedicos } from "../../store";


export const Modificar =()=>{
    const dispatch = useDispatch();
    const Navigate=useNavigate()
    const { active } = useSelector((state) => state.medico);
    
    console.log(active)
    const changeValue = (e) => {
        const medicoCopy = { ...active }; // Crear una copia del objeto active
        medicoCopy.estado = !medicoCopy.estado; // Modificar la copia
        console.log(medicoCopy);
        dispatch(putMedicos({ medico: medicoCopy }));

        Navigate(-1)
      };

    return(
             
        <>
            <h1>{active.medico.nombre}</h1>
            <h2>{active.medico.apellido}</h2>
            <h2>{active.medico.estado ? "Activo" : "Inactivo"}</h2>
            <h2>{active.medico.licencia}</h2>
            <select
                className="form-select"
                aria-label="Default select example"
                onChange={changeValue} // No es necesario pasar medico como argumento
                defaultValue={active.medico.estado ? "0" : "1"}
                id="specificSizeSelect"
            >
                <option value="0">activo</option>
                <option value="1">Inactivo</option>
            </select>
        </>
    )
}