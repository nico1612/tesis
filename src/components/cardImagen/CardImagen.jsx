import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Alert } from '@mui/material';
import './cardImagen.css';

export const CardImagen = ({ resultados, modificado, setModificado, paciente }) => {
    const [comentario, setComentario] = useState('');
    const [mensaje, setMensaje] = useState('');
    const url = import.meta.env.VITE_APP_IP;

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const agregarComentario = async () => {
        try {
            const response = await fetch(`${url}/api/mensaje/consulta/${resultados._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...(paciente ? { mensajePaciente: comentario } : { mensajeMedico: comentario })
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el comentario');
            }

            const data = await response.json();
            setMensaje(data.message);
            setComentario('');
            setModificado(!modificado);
        } catch (error) {
            setMensaje(error.message);
        }
    };

    return (
        
               
                
                    <TableRow>
                        <TableCell align="center">
                            <img
                                src={resultados.img}
                                alt="Consulta"
                                style={{ maxWidth: '200px', maxHeight: '150px' }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            {resultados.dia}/{resultados.mes}/{resultados.ano}
                        </TableCell>
                        <TableCell align="center">
                            {resultados.resultadosEnfermedades.map((enfermedad, index) => {
                                if (enfermedad.enfermedad !== 'no ser ninguna enfermedad') {
                                    let resultado = enfermedad.resultado * 100;
                                    let resultadoFormateado = resultado.toFixed(2).replace('.', ',');

                                    return (
                                        <div key={index}>
                                            <p>El área afectada tiene más probabilidad de ser {enfermedad.enfermedad}.</p>
                                            <p>Con un porcentaje de {resultadoFormateado}% precisión.</p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <p key={index}>No se ha detectado ninguna enfermedad en el área enviada.</p>
                                    );
                                }
                            })}
                        </TableCell>
                        <TableCell align="center">
                            <div>
                                <p>Comentario {paciente ? 'tuyo' : 'paciente'}: {resultados.mensajePaciente || 'No hay comentario disponible.'}</p>
                                <p>Comentario {!paciente ? 'tuyo' : 'medico'}: {resultados.mensajeMedico || 'No hay comentario disponible.'}</p>

                                {(!resultados.mensajePaciente && paciente) || (!resultados.mensajeMedico && !paciente) ? (
                                    <>
                                        <TextField
                                            value={comentario}
                                            onChange={handleComentarioChange}
                                            placeholder="Agregar comentario"
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Button onClick={agregarComentario} variant="contained" color="primary">
                                            Enviar Comentario
                                        </Button>
                                    </>
                                ) : null}

                                {mensaje && <Alert severity="info">{mensaje}</Alert>}
                            </div>
                        </TableCell>
                    </TableRow>
    );
};

export default CardImagen;
