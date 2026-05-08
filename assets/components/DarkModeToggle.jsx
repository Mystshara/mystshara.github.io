import React from 'react';
import { motion } from 'framer-motion';
import { consoleTokens } from '../consoleTheme';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
    const t = consoleTokens(darkMode);

    return (
        <motion.button
            type="button"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                border: `1px solid ${t.borderSubtle}`,
                background: darkMode ? t.surface2 : t.surface3,
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                boxShadow: darkMode
                    ? '0 2px 10px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : '0 2px 10px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.95)'
            }}
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#F8FAFC',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
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
