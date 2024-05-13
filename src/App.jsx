import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";

import FlightList from "./components/Flight/FlightList";
import FlightDetails from "./components/Flight/FlightDetails";

import Activities from "./components/Activities";

import Hotel from "./components/Hotel";

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
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
          {/* <Route path="/activity/:id" component={<FlightDetails />} />
          <Route path="/hotel/:id" component={<FlightDetails />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
