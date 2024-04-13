import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { Home, Ticket, Tickets, NewTicket, Calendar, Bookmark, Login, Register, Checkout, PageNotFound } from "./pages"
const publicUrl = (path) => `${process.env.PUBLIC_URL}${path}`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.client_id}>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path={publicUrl('/')} element={<Home />} />
        <Route path={publicUrl('/ticket')} element={<Tickets />} />
        <Route path={publicUrl('/ticket/:id')} element={<Ticket />} />
        <Route path={publicUrl('/newticket')} element={<NewTicket />} />
        <Route path={publicUrl('/calendar')} element={<Calendar />} />
        <Route path={publicUrl('/bookmark')} element={<Bookmark />} />
        <Route path={publicUrl('/login')} element={<Login />} />
        <Route path={publicUrl('/checkout')} element={<Checkout />} />
        <Route path={publicUrl('*')} element={<PageNotFound />} />
        <Route path={publicUrl('/ticket/*')} element={<PageNotFound />} />

      </Routes>
    </Provider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);