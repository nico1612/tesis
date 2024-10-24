import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Typography, CircularProgress, Grid, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useForm } from '../../../hooks';

export const MedicosYSolicitud = () => {
    const { userId } = useSelector((state) => state.auth);
    const url = import.meta.env.VITE_APP_IP;

    const [message, setMessage] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [hasSentRequest, setHasSentRequest] = useState(false);
    const [loading, setLoading] = useState(true);
    const { searchText, onInputChange } = useForm({ searchText: '' });

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const { data } = await axios.get(`${url}/api/buscar/relaciones/${userId}`);
                setMedicos(data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
                setLoading(false);
            }
        };

        fetchMedicos();
    }, [userId, url]);

    const handleEliminar = async (medicoId) => {
        try {
            await axios.delete(`${url}/api/buscar/medicos/${medicoId}`);
            setMedicos(medicos.filter(medico => medico.id !== medicoId));
        } catch (error) {
            console.error("Error al eliminar el médico:", error.message);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${url}/api/buscar/medicos/${searchText}`);
            setResultadosBusqueda(response.data.results);
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            setResultadosBusqueda([]);
        }
    };

    const mandarSolicitud = async (medico) => {
        try {
            const formData = {
                receptor: medico.uid,
                emisor: userId,
            };
            await axios.post(`${url}/api/solicitud`, formData);
            setMessage('Solicitud enviada exitosamente.');
            setHasSentRequest(true);
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            setMessage('Error al enviar la solicitud.');
            setHasSentRequest(true);
        }
    };

    return (
        <Grid container spacing={4} className="container">
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>Médicos Tratantes</Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {medicos.map((medico) => (
                            <ListItem key={medico.id}>
                                <ListItemText primary={medico.nombre} />
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    onClick={() => handleEliminar(medico.id)}
                                >
                                    Eliminar
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>Buscar y Enviar Solicitud a Médico</Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label="Buscar médico"
                        variant="outlined"
                        name="searchText"
                        value={searchText}
                        onChange={onInputChange}
                        className="mb-3"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Buscar
                    </Button>
                </form>

                {resultadosBusqueda.length > 0 && (
                    <div className="mt-4">
                        <Typography variant="h5">Resultados de la búsqueda:</Typography>
                        {resultadosBusqueda.map((medico) => (
                            <ListItem key={medico.uid}>
                                <ListItemText primary={medico.nombre} />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => mandarSolicitud(medico)}
                                >
                                    Enviar Solicitud
                                </Button>
                            </ListItem>
                        ))}
                    </div>
                )}

                {message && (
                    <Typography 
                        className={`mt-3 ${hasSentRequest ? 'text-success' : 'text-danger'}`} 
                        color={hasSentRequest ? 'success' : 'error'}
                    >
                        {message}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};
