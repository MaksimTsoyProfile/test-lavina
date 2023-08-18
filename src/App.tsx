import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entry from "./pages/Entry";
import Main from "./pages/Main";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            key='entry'
            path='/'
            element={<Entry />}
          />
          <Route
            key='app'
            path='/app'
            element={<Main />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
