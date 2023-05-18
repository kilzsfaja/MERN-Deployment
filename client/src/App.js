import React from 'react'
import "./bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'
import DisplayAll from './components/DisplayAll'
import CreateOne from './components/CreateOne'
import ShowOne from './components/ShowOne';

function App() {
  return (
    <>
    <div className="container">
      {/* ---- set the stage ---- */}
      <Routes>
        {/* ---- display all ---- */}
        <Route path='/pirates' element={<DisplayAll/>}/>
        {/* ---- create one ---- */}
        <Route path='/pirate/new' element={<CreateOne/>}/>
        {/* ---- show one ---- */}
        <Route path='/pirate/:id' element={<ShowOne/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
