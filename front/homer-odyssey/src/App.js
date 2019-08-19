import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./component/SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Homer's Odyssey</h1>
      </header>
      <SignUp email="xa@gmail.com" />
    </div>
  );
}

export default App;
