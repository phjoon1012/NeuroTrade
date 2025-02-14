// import React, { useEffect, useState } from "react";
// import { fetchWelcome } from "./api";

// const App = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchWelcome().then((response) => setMessage(response.data.message));
//   }, []);

//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
=======
// import LandingPage from "./components/LandingPage";
import LandingPage from "./components/LandingPage/LandingPage";
import MyInfo from "./components/MyInfoPage/MyInfo";  // Import the MyInfo component
import Backtesting from "./components/BackTestingPage/BackTesting";
import Strategies from "./components/StrategiesPage/Strategies";
import LiveMonitoring from "./components/LiveMonitoring/LiveMonitoring";
import "../src/components/LandingPage/LandingPage.css"

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/main" element={<MainPage />} />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/myinfo" element={<MyInfo />} />  {/* Route for MyInfo */}
        <Route path="/landingpage" element={<LandingPage/>} />  {/* Route for MyInfo */}
        <Route path="/backtesting" element={<Backtesting/>} />  {/* Route for MyInfo */}
        <Route path="/strategies" element={<Strategies/>} />  {/* Route for MyInfo */}
        <Route path="/livemonitoring" element={<LiveMonitoring />} />
>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
      </Routes>
    </Router>
  );
};

export default App;