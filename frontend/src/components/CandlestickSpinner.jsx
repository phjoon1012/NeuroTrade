import React from "react";
import { motion } from "framer-motion";
import "./CandlestickSpinner.css"; // Import CSS for styling

const CandlestickSpinner = () => {
  // Generate different heights and staggered delays for each candlestick
  const candlestickVariants = (delay, height) => ({
    initial: { opacity: 0, y: 10, height: 10 },
    animate: {
      opacity: 1,
      y: 0,
      height: height,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        delay, // Staggered animation
      },
    },
  });

  return (
    <div className="candlestick-container">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`candlestick ${i % 2 === 0 ? "green" : "red"}`} // Alternating colors
          variants={candlestickVariants(i * 0.2, [30, 50, 40, 60, 45][i])}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
};

export default CandlestickSpinner;