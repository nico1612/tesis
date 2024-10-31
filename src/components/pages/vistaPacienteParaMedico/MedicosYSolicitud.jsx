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
        <Grid 
        sx={{ ml: 0 }}
        container 
        spacing={4} 
        className="container" 
        style={{ padding: "20px", gap: "20px" }} // Añadido gap adicional
        >
        <Grid 
            item 
            xs={12} 
            md={6} 
            style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "50%",
            marginBottom: "20px",
            }}
        >
            <Typography variant="h4" gutterBottom style={{ color: "#333", fontFamily: "DM Sans", fontWeight: "700" }}>
            Médicos Tratantes
            </Typography>
            {loading ? (
            <CircularProgress />
            ) : (
            <List>
                {medicos.map((medico) => (
                <ListItem 
                    key={medico.id} 
                    style={{
                    backgroundColor: "#f9f9f9", 
                    marginBottom: "10px", 
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                    }}
                >
                    <ListItemText 
                    primary={medico.nombre} 
                    primaryTypographyProps={{ style: { fontWeight: "500", fontFamily: "DM Sans", } }} 
                    />
                    <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleEliminar(medico.id)}
                    style={{
                        fontFamily: "DM Sans",
                        borderRadius: "15px", 
                        padding: "5px 15px",
                    }}
                    >
                    Eliminar
                    </Button>
                </ListItem>
                ))}
            </List>
            )}
        </Grid>

        <Grid 
            item 
            xs={12} 
            md={6} 
            style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px", 
            padding: "20px",
            marginBottom: "20px", // Espacio extra abajo
            }}
        >
            <Typography variant="h4" gutterBottom style={{ color: "#333", fontFamily: "DM Sans", fontWeight: "700" }}>
            Buscar y Enviar Solicitud a Médico
            </Typography>
            <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
            <TextField
                fullWidth
                label="Buscar médico"
                variant="outlined"
                name="searchText"
                value={searchText}
                onChange={onInputChange}
                style={{
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
                }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                style={{
                borderRadius: "20px",
                padding: "10px 20px",
                fontFamily: "DM Sans",
                }}
            >
                Buscar
            </Button>
            </form>

            {resultadosBusqueda.length > 0 && (
            <div style={{ marginTop: "20px" }}>
                <Typography variant="h5" style={{ fontWeight: "500", color: "#333" }}>
                Resultados de la búsqueda:
                </Typography>
                {resultadosBusqueda.map((medico) => (
                <ListItem 
                    key={medico.uid} 
                    style={{
                    backgroundColor: "#f9f9f9", 
                    marginBottom: "10px", 
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                    }}
                >
                    <ListItemText primary={medico.nombre} />
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => mandarSolicitud(medico)}
                    style={{
                        borderRadius: "5px",
                        padding: "5px 15px",
                    }}
                    >
                    Enviar Solicitud
                    </Button>
                </ListItem>
                ))}
            </div>
            )}

            {message && (
            <Typography 
                style={{
                marginTop: "20px",
                color: hasSentRequest ? "green" : "red",
                fontWeight: "500",
                }}
            >
                {message}
            </Typography>
            )}
        </Grid>
        </Grid>

    );
};
