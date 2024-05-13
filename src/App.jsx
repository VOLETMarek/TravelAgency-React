import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hotel from "./components/Hotel";
import Home from "./components/Home";
import Flights from "./components/Flights";
import Activities from "./components/Activities";
import Login from "./components/Login";


import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
