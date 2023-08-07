import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const HomePage = () => {
  const { userId } = useSelector((state) => state.auth);
  const url = import.meta.env.VITE_APP_IP;
  const [archivos, setArchivos] = useState([]);
  const [resultados, setResultados] = useState();

  const subirArchivos = (e) => {
    setArchivos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivos) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append("files", archivos[i]); // Usamos "files" como nombre para la clave del archivo
    }
    formData.append("id", userId); // Agregamos el userId al formData con el nombre "id"

    
    try {
      const results = await axios.put(`${url}/api/uploads/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Imagen enviada exitosamente.");
      setArchivos([]);
      const { _id, ...datosSinId } = results.data;
      setResultados(datosSinId);
    } catch (error) {
      console.error("Error al enviar la imagen:", error.message);
      alert("Error al enviar la imagen.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center my-4">Subir imágenes del área afectada</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex justify-content-center">
          <div className="input-group">
            <input
              type="file"
              name="files"
              className="form-control"
              multiple
              onChange={subirArchivos}
            />
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
      {resultados && (
        <div className="container">
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title mb-3">Resultado:</h2>
              <p className="card-text">
                Fecha: {resultados.dia}/{resultados.mes}/{resultados.ano}
              </p>
              <p className="card-text">Resultado: {resultados.resultado}</p>
              <img
                src={resultados.img}
                alt="Consulta"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};