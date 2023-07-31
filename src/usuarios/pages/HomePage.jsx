import { useState } from "react";

export const HomePage = () => {
  const [archivos, setArchivos] = useState([]);

  const subirArchivos = (e) => {
    setArchivos(e.target.files);
  };

  const insertarArchivos = () => {
    const formData = new FormData();

    for (let index = 0; index < archivos.length; index++) {
      formData.append("files", archivos[index]);
    }

    // Aquí puedes hacer algo con formData, por ejemplo, enviarlo a través de una solicitud HTTP.
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Subir imágenes del área afectada</h1>
      <div className="d-flex justify-content-center my-4">
        <input type="file" name="files" multiple onChange={subirArchivos} />
        <button className="btn btn-primary ms-2" onClick={insertarArchivos}>
          Insertar archivos
        </button>
      </div>
    </div>
  );
};