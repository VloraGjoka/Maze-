import React from 'react';
import './App.css';
import Canvas from './components/Canvas.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="App">
      <div className="h-100vh mb-5">
        <Canvas/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
