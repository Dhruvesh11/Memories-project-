import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Container maxWidth="lg">
          <Navbar /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Auth />} />
        {/* </Container> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
