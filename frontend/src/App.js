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
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;