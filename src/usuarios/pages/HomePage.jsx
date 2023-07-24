import  { useState } from "react";

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
    <>
      <br />
      <h1 className="d-flex justify-content-center">
        Subir imágenes del área afectada
      </h1>
      <br />
      <div className="app d-flex justify-content-center">
        <br />
        <input type="file" name="files" multiple onChange={subirArchivos} />
        <br />
        <button className="btn btn-primary" onClick={insertarArchivos}>
          Insertar archivos
        </button>
      </div>
    </>
  );
};