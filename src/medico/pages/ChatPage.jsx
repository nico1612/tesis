import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_APP_IP;

export const ChatPage = () => {
    const { userId } = useSelector((state) => state.auth);
    const id = userId;
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const { data } = await axios.get(`${url}/api/pacientes/${id}`);
                setPacientes(data.usuarios);
                setLoading(false);
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [id]);

    const chatear = (paciente) => {
        navigate(`/chat/${paciente.uid}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de pacientes</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : pacientes.length > 0 ? (
                <Row>
                    {pacientes.map((paciente) => (
                        <Col key={paciente.uid} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{paciente.nombre} {paciente.apellido}</Card.Title>
                                    <Button onClick={() => chatear(paciente)} variant="primary">Chatear</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">No hay médicos disponibles.</p>
            )}
        </div>
    );
};
