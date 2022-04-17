import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

import CompanyStats from "./components/CompanyStats";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" element={<CompanyStats/>} />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
