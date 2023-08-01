import { useState } from "react";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { FormBuscarPacientes } from "../components/FormBuscarPacientes";
import { BuscarPacientes } from "../components/BuscarPacientes";

export const BuscarPage = () => {

  const [pacientes, setPaciente] = useState([]); // Utiliza useState para manejar el estado de los pacientes
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
      <FormBuscarPacientes onSubmit={onSubmit} searchText={searchText} onInputChange={onInputChange}/>
      {pacientes.length === 0 ? null : (
        <BuscarPacientes pacientes={pacientes} mandarSolicitud={mandarSolicitud}/>
      )}
    </div>
  );
};