import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Job from './components/Job';
import Topbar from './components/Topbar';
import App from "./App";



ReactDOM.render(
  
  <Router>
    <Topbar />
  <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/job' element={<Job/>} />
  </Routes>
</Router>,
  
  document.getElementById("root")
);