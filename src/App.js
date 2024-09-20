// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import Login from "./components/Login";
import Quotes from "./components/Quotes";
import AddQuote from "./components/AddQuote";
import EditQuote from "./components/EditQuote";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/add-quote" element={<AddQuote />} />
          <Route path="/edit-quote/:id" element={<EditQuote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
