import React from 'react';
import { motion } from 'framer-motion';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
    return (
        <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                border: 'none',
                background: darkMode 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                }}
            >
                {darkMode ? '🌙' : '☀️'}
            </motion.div>
        </motion.button>
    );
}

export default DarkModeToggle;
