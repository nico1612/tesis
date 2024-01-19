import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { BiSend } from 'react-icons/bi' 

const url = import.meta.env.VITE_APP_IP

export const ChatMedico = () => {
    const { userId } = useSelector((state) => state.auth)
    const { uid } = useParams()
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const [socket, setSocket] = useState(null) 

    useEffect(() => {
        const newSocket = io(url)
        newSocket.emit('joinRoom', 'usuario_id')
        newSocket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message])
        })

        setSocket(newSocket)

        return () => {
            if (newSocket) {
                newSocket.disconnect()
            }
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (messageInput.trim() !== '') {
            const newMessage = {
                emisor: userId,
                receptor: uid,
                mensaje: messageInput,
            }


            if (socket) {
                socket.emit('chatMessage', newMessage)
            }

            setMessages((prevMessages) => [...prevMessages, newMessage])
            setMessageInput('')
        }
    }

    return (
        <div className="container">
            <h2 className="text-center mt-4">Chat Médico</h2>
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
                    <BiSend /> Enviar
                </button>
            </form>
        </div>
    )
}