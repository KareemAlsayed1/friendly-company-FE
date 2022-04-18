import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

import CompanyStats from "./components/CompanyStats";
import Home from "./components/Home";
import FilterResults from "./components/FilterResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/company" element={<CompanyStats/>} />
        <Route exact path="/results" element={<FilterResults/>} />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
