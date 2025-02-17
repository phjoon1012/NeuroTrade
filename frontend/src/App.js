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
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
import LandingPage from "./components/LandingPage/LandingPage";
import MyInfo from "./components/MyInfoPage/MyInfo";  // Import the MyInfo component
import Backtesting from "./components/BackTestingPage/BackTesting";
import Strategies from "./components/StrategiesPage/Strategies";
import LiveMonitoring from "./components/LiveMonitoring/LiveMonitoring";
import Community from "./components/CommunityPage/Community";
import "../src/components/LandingPage/LandingPage.css"
import PageTransition from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";
import "./App.css";




const AnimatedRoutes = () => {
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
        
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/myinfo" element={<PageTransition><MyInfo /></PageTransition>} />  {/* Route for MyInfo */}
        <Route path="/landingpage" element={<PageTransition><LandingPage/></PageTransition>} />  {/* Route for MyInfo */}
        <Route path="/backtesting" element={<PageTransition><Backtesting/></PageTransition>} />  {/* Route for MyInfo */}
        <Route path="/strategies" element={<PageTransition><Strategies/></PageTransition>} />  {/* Route for MyInfo */}
        <Route path="/livemonitoring" element={<PageTransition><LiveMonitoring /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
      </Routes>

      </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
            <AnimatedRoutes />
    </Router>
  );
};

export default App;