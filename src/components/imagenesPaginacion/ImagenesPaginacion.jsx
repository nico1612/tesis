import { Pagination } from "react-bootstrap"
import CardImagen from "../cardImagen/CardImagen"
import './ImagenesPaginacion.css'
import { useState } from "react"

export const ImagenesPaginacion = ({ consultas, modificado, setModificado, paciente }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(2)

    const totalPages = Math.ceil(consultas.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem)

    const maxPagesVisible = 4
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesVisible - 1)

    if (endPage - startPage + 1 < maxPagesVisible) {
        startPage = Math.max(1, endPage - maxPagesVisible + 1)
    }

    const handlePaginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
        setCurrentPage(1)
    }

    return (
        <>
            <div className="row">
                {currentItems.map((item, index) => (
                    <div className="listItem col-6" key={index}>
                        <CardImagen resultados={item} modificado={modificado} setModificado={setModificado} paciente={paciente} />
                    </div>
                ))}
            </div>

            <div className="pagination-summary">
                <p>
                    Mostrando {currentItems.length} de {consultas.length} elementos en {totalPages} página{totalPages > 1 ? 's' : ''}.
                </p>
            </div>

            <div className="items-per-page-selector">
                <label htmlFor="itemsPerPage">Items por página: </label>
                <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                </select>
            </div>

            <Pagination>
                {currentPage > 1 && (
                    <Pagination.First onClick={() => handlePaginate(1)} />
                )}

                {currentPage > 1 && (
                    <Pagination.Prev onClick={() => handlePaginate(currentPage - 1)} />
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i
                    return (
                        <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePaginate(page)}>
                            {page}
                        </Pagination.Item>
                    )
                })}

                {currentPage < totalPages && (
                    <Pagination.Next onClick={() => handlePaginate(currentPage + 1)} />
                )}

                {currentPage < totalPages && (
                    <Pagination.Last onClick={() => handlePaginate(totalPages)} />
                )}
            </Pagination>
        </>
    )
}