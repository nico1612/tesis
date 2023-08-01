import { useState } from "react";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";

export const BuscarPage = () => {

  const [paciente, setPaciente] = useState([]); // Utiliza useState para manejar el estado de los pacientes
  const { searchText, onInputChange } = useForm({
    searchText: ''
  });
  const { userId} = useSelector((state) => state.auth);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(searchText);
    try {
      const response = await axios.get(`http://localhost:8080/api/buscar/usuarios/${searchText}`);
      console.log(response.data.results); // Muestra la respuesta en la consola para verificarla
      setPaciente(response.data.results); // Establece el estado de los pacientes con la lista de resultados
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setPaciente([]); // Si hay un error, establece el estado de los pacientes como una lista vacía
    }
  };

  const mandarSolicitud= async ({paciente})=>{
    console.log(userId)
    const formData={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data:{"receptor":paciente.uid,"emisor":userId}
    }

    try {
      const response = await axios(`http://localhost:8080/api/solicitud`,formData);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Buscar paciente</h1>
      <form onSubmit={onSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Buscar un paciente"
          className="form-control me-2"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
        />
        <button className="btn btn-primary" type="submit">Buscar</button>
      </form>
      {paciente.length === 0 ? null : (
        <div>
          <h2 className="mt-4">Resultados de la búsqueda:</h2>
          {paciente.map((paciente) => (
            <div key={paciente.uid} className="card mt-2"> {/* Agrega la propiedad key con un valor único, como el ID del paciente */}
              <div className="card-body">
                <h5 className="card-title">Nombre: {paciente.nombre}</h5>
                <p className="card-text">Apellido: {paciente.apellido}</p>
                <p className="card-text">Correo: {paciente.correo}</p>
                <button className="btn btn-secondary" onClick={() => mandarSolicitud({paciente})}>Agregar médico</button>              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};