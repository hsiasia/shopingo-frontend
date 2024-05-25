import React, { useEffect, useState } from 'react';

const Websocket = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create a new WebSocket instance
    const ws = new WebSocket('ws://localhost:8000/ws/event-updates/?user_id=1');

    // Event handler for when the WebSocket connection is opened
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send('1') // send user_ID here
      // You can send a message to the server here if needed
      // ws.send('Hello Server');
    };

    // Event handler for when a message is received from the server
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Event handler for when there is an error with the WebSocket
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Event handler for when the WebSocket connection is closed
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Websocket;
