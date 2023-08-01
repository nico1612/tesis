import axios from 'axios';
import { useState } from 'react';
import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';
import { MedicosBuscar } from '../components/MedicosBuscar';

export const BuscarPage = () => {
  const [medicos, setMedicos] = useState([]);
  const { userId} = useSelector((state) => state.auth);

  const { searchText, onInputChange } = useForm({
    searchText: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(searchText);
    try {
      const response = await axios.get(`http://localhost:8080/api/buscar/medicos/${searchText}`);
      console.log(response.data.results);
      setMedicos(response.data.results);
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setMedicos([]);
    }
  };
  const mandarSolicitud= async ({medico})=>{
    console.log(userId)
    const formData={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data:{"receptor":medico.uid,"emisor":userId}
    }

    try {
      const response = await axios(`http://localhost:8080/api/solicitud`,formData);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  }
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Buscar médico</h1>
          <form className="d-flex" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Buscar un médico"
              className="form-control me-2"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-primary" type="submit">
              Buscar
            </button>
          </form>
          {medicos.length === 0 ? null : (
            <div className="mt-4">
              <h2>Resultados de la búsqueda:</h2>
              <MedicosBuscar medicos={medicos} mandarSolicitud={mandarSolicitud}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};