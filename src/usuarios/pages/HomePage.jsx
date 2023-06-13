import { useState } from "react"


export const HomePage=()=>{

    const [archivos,setArchivos]=useState([])

    const subirArchivos=(e)=>{
        setArchivos(e)
    }

    const insertarArchivos=()=>{
        const formData= new FormData()

        for(let index=0;index<archivos.length;index++){
            formData.append("files",archivos[index])
        }
    }

    return(
        <>
            <br/>
            <h1 className="d-flex d-flex justify-content-center">
                subir imagenes del area afectada
            </h1>
            <br/>
            <div className="app d-flex d-flex justify-content-center">
                <br/>
                <input type="file" name="files" multiple onChange={(e)=>subirArchivos(e.target.files)}/>
                <br/>
                <button className="btn btn-primary" onClick={insertarArchivos}>insertar archivos</button>
            </div>
        </>
    )
}