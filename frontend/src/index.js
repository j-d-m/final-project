import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Women from './components/Women'

import App from "./App";



ReactDOM.render(
  
  <Router>
  <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/women' element={<Women/>} />
  </Routes>
</Router>,
  
  document.getElementById("root")
);