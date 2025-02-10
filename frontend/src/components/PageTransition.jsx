import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import "./PageTransition.css"; // Add styles for loader


const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const PageTransition = ({ children }) => {
    const location = useLocation();
   
    return (
        <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ position: "absolute", width: "100%" }}
        >
          
            {children}
        </motion.div>
    );
};

export default PageTransition;