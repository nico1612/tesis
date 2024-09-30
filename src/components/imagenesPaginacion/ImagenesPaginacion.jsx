import { Pagination } from "react-bootstrap"
import CardImagen from "../cardImagen/CardImagen"
import './ImagenesPaginacion.css'

export const ImagenesPaginacion=({currentItems,consultas,itemsPerPage,paginate,currentPage,modificado,setModificado,paciente})=>{
    return(
        <>
            <div className="row">
                {currentItems.map((item, index) => (
                    <div className="listItem col-6" key={index}>
                        <CardImagen resultados={item} modificado={modificado} setModificado={setModificado} paciente={paciente}/>
                    </div>
                ))}
            </div>
            <Pagination>
                {Array.from({ length: Math.ceil(consultas.length / itemsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}