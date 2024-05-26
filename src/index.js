import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LanguageProvider } from "./languageContext";

import {
  Home,
  Ticket,
  Tickets,
  NewTicket,
  EditTicket,
  Calendar,
  Bookmark,
  Login,
  JoinTicket,
  Checkout,
  PageNotFound,
  Info,
} from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <LanguageProvider>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Tickets />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/newticket" element={<NewTicket />} />
        <Route path="/editticket/:id" element={<EditTicket />} />
        <Route path="/jointicket" element={<JoinTicket />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ticket/*" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Provider>
    </LanguageProvider>
  </BrowserRouter>
);
