import { useState } from "react";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { BuscarPacientes, FormBuscarPacientes } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = import.meta.env.VITE_APP_IP;

export const BuscarPage = () => {
  const [pacientes, setPacientes] = useState([]); // Utiliza useState para manejar el estado de los pacientes
  const { userId } = useSelector((state) => state.auth);
  const { searchText, onInputChange } = useForm({ searchText: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${url}/api/buscar/usuarios/${searchText}`);
      console.log(response); // Muestra la respuesta en la consola para verificarla
      setPacientes(response.data.results); // Establece el estado de los pacientes con la lista de resultados
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setPacientes([]); // Si hay un error, establece el estado de los pacientes como una lista vacía
    }
  };

  const mandarSolicitud = async ({ paciente }) => {
    try {
      const formData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { "receptor": paciente.uid, "emisor": userId }
      };

      const response = await axios(`${url}/api/solicitud`, formData);
      console.log(response.data);
      // Mostrar notificación de éxito cuando la solicitud se guarda exitosamente
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000, // Duración de la notificación en milisegundos (3 segundos en este caso)
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      // Mostrar notificación de error si ocurre un error al guardar la solicitud
      toast.error("Error al guardar la solicitud.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Buscar paciente</h1>
      <FormBuscarPacientes onSubmit={onSubmit} searchText={searchText} onInputChange={onInputChange} />
      {pacientes.length > 0 && (
        <BuscarPacientes pacientes={pacientes} mandarSolicitud={mandarSolicitud} />
      )}
      <ToastContainer />
    </div>
  );
};