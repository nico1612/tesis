import { Pagination, Select, MenuItem, FormControl, InputLabel, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import CardImagen from "../cardImagen/CardImagen"
import './ImagenesPaginacion.css'
import { useState } from "react"
import { Table } from 'react-bootstrap'

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

    const handlePaginate = (event, pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
        setCurrentPage(1)
    }

    return (
        <>
            <div className="row">
            <TableContainer component={Paper} style={{ boxShadow:"none", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Imagen</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Resultados</TableCell>
                            <TableCell align="center">Comentario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {currentItems.map((item, index) => (
                        <CardImagen resultados={item} modificado={modificado} setModificado={setModificado} paciente={paciente} />
                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>

            <div className="pagination-summary">
                <p style={ {color: "#fff", fontFamily: "DM Sans"} } >
                    Mostrando {currentItems.length} de {consultas.length} elementos en {totalPages} página{totalPages > 1 ? 's' : ''}.
                </p>
            </div>

            <div className="items-per-page-selector">
                <label className="items-per-page-label">Items por página</label>
                <FormControl variant="outlined" size="small">
                    <Select
                        labelId="itemsPerPage-label"
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePaginate}
                siblingCount={1}
                boundaryCount={1}
                color="primary"
                showFirstButton
                showLastButton
                sx={{
                    '& .MuiPaginationItem-root': {
                        backgroundColor: '#ffffff', // Cambia el color de fondo de los círculos
                        color: '#1976d2', // Cambia el color del texto (número de página)
                        borderRadius: '50%', // Forma circular
                        width: '36px', // Ancho del círculo
                        height: '36px', // Alto del círculo
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 4px', // Espacio entre los elementos
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra suave opcional
                    },
                    '& .MuiPaginationItem-root:hover': {
                        backgroundColor: '#f0f0f0', // Fondo gris claro en hover
                    },
                    '& .MuiPaginationItem-page.Mui-selected': {
                        backgroundColor: '#1976d2', // Fondo del número seleccionado
                        color: '#ffffff', // Texto blanco para el número seleccionado
                    },
                }}
            />
        </>
    )
}
