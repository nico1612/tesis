/*import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');*/

export const ChatPage=()=>{

    /*const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageInput.trim() !== '') {
        socket.emit('chatMessage', messageInput);
        setMessageInput('');
        }
    };*/

    return (
        <div>
        <h1>Chat en tiempo real</h1>
        {/*<div id="chat">
            <ul id="messages">
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
            </ul>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                autoComplete="off"
            />
            <button type="submit">Enviar</button>
            </form>
            </div>*/}
        </div>
    );
    
}