import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const url = 'http://localhost:8080';

export const ChatPaciente = () => {
    const { userId } = useSelector((state) => state.auth);
    const { uid } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null); // Estado para almacenar la instancia del socket

    useEffect(() => {
        const newSocket = io(url);

        // Reemplaza 'usuario_id' con el ID del usuario actual
        newSocket.emit('joinRoom', 'usuario_id');

        // Suscribirse al canal específico del usuario
        newSocket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Guardar la instancia del socket en el estado
        setSocket(newSocket);

        // Limpieza al desmontar el componente
        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageInput.trim() !== '') {
            const newMessage = {
                emisor: userId, // Reemplaza 'usuario_id' con el ID del usuario actual
                receptor: uid, // Reemplaza 'receptor_id' con el ID del receptor del mensaje
                mensaje: messageInput,
            };

            // Enviar el mensaje al servidor de Socket.io
            if (socket) {
                socket.emit('chatMessage', newMessage);
            }

            // Actualizar los mensajes localmente
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageInput('');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Chat {}</h2>
            {messages.length > 0 && (
                <div className="card mt-4">
                    <ul
                        className="list-group list-group-flush"
                        style={{ maxHeight: '300px', overflowY: 'auto', border: 'none', padding: 0 }}
                    >
                        {messages.map((message, index) => (
                            <li
                                key={index}
                                className={`list-group-item ${message.emisor === userId ? 'text-end' : ''}`}
                                style={{ border: 'none' }}
                            >
                                {message.mensaje}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit} className="card-footer d-flex">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    autoComplete="off"
                    className="form-control me-2"
                    placeholder="Escribe tu mensaje..."
                />
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
};
