import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PageTransition.css"; // Import CSS for styling
import CandlestickSpinner from "./CandlestickSpinner";

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 2 } },
    exit: { opacity: 0, transition: { duration: 2 } }
};

const PageTransition = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true); // Track loading state

    // Show white screen and spinner for 3 seconds
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1500); // Matches transition duration
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`transition-container ${loading ? "loading" : ""}`}
        >
            {loading ? ( // White screen & spinner while loading
                <div className="loading-screen">
                    <CandlestickSpinner/>
                </div>
            ) : (
                children
            )}
        </motion.div>
    );
};

export default PageTransition;