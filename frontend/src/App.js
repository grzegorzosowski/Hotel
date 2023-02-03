import React    from "react";
import { Routes, Route} from 'react-router-dom';
import Rooms    from './components/Rooms/Rooms';
import HomePage from "./components/HomePage/HomePage";
import Contact  from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Login    from "./components/Login/Login";
import Signup   from "./components/Signup/Signup";

import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <nav className="nav-bar">
        <ul>
          <Link to="/"><li>Home</li></Link>
          <Link to="/rooms"><li>Rooms</li></Link>
          <Link to="/contact"><li>Contact</li></Link>
        </ul>
        <div className="log-in">
          <ul>
            <Link to="/login"><li>Log in</li></Link>
            <Link to="/signup"><li>Sign up</li></Link>
          </ul>
        </div>
      </nav> */}
      <Routes>
        <Route path="/About" element={<HomePage />} />
        <Route path="/Rooms" element={<Rooms />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>  
    </div>  
  );
}

export default App;