import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from 'react-icons/ai'; // Importa el ícono que deseas utilizar

const url = import.meta.env.VITE_APP_IP;

export const ChatPage = () => {
    const { userId } = useSelector((state) => state.auth);
    const id = userId;
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const { data } = await axios.get(`${url}/api/medico/${id}`);
                setMedicos(data.medico);
                setLoading(false);
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [id]);

    const chatear = (medico) => {
        navigate(`/chat/${medico._id}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de médicos</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : medicos.length > 0 ? (
                <Row>
                    {medicos.map((medico) => (
                        <Col key={medico.uid} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{medico.nombre} {medico.apellido}</Card.Title>
                                    <Button onClick={() => chatear(medico)} variant="primary">
                                        <AiOutlineMessage /> Chatear
                                    </Button>
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