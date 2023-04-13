import React from "react";
import HomePage from "./home";

import { Routes, Route } from "react-router-dom";

function App(){

    return(<>
    <Routes>
        <Route path="/" element={<HomePage />}/>
        
    </Routes>
        
    </>);
}

export default App;
