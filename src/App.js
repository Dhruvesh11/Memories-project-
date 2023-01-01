import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Auth from './components/Auth/Auth'
const App=()=>{
 
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
    <Navbar/>
    <Routes>
    <Route  path="/" exact component={Home}/>
    <Route  path="/auth" exact component={Auth}/>
    </Routes>
     <Home/>

    </Container>
    </BrowserRouter>
    
  );
  }
export default App;
