import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";

import FlightList from "./components/Flight/FlightList";
import FlightDetails from "./components/Flight/FlightDetails";

import ActivityList from "./components/Activity/ActivityList";
import ActivityDetails from "./components/Activity/ActivityDetails";

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
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          {/* <Route path="/hotel/:id" component={<FlightDetails />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
