import React from "react";
import HomePage from "./home";
import About from "./pages/about";

import { Routes, Route } from "react-router-dom";

function App(){

    return(<>
    <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<About/>}/>        
    </Routes>
        
    </>);
}

export default App;
