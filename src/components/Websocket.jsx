import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const apiKey = process.env.REACT_APP_API_KEY;

const Websocket = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create a new WebSocket instance
    const ws = new WebSocket(`wss://shopingo.info/ws/event-updates/?user_id=${localStorage.getItem('user_id')}`); // send user_ID here

    // Event handler for when the WebSocket connection is opened
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(localStorage.getItem('user_id')); 
      console.log("User ID sent to server");
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

  const handleClose = () => {
    setMessages([]);
  };

  return (
    (messages.length > 0) && (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000, // Ensure it's on top
      }}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </Alert>
      </div>
    )
  );
};

export default Websocket;
