import React from 'react';
import { motion } from 'framer-motion';
import ProductionFlowDiagram from './ProductionFlowDiagram';

export default function SystemFlowDiagram({ darkMode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{
                marginBottom: '1.25rem',
                borderRadius: '14px',
                padding: '1rem',
                background: darkMode ? 'rgba(2, 6, 23, 0.65)' : '#f8fafc',
                border: darkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
                overflowX: 'auto'
            }}
        >
            <div
                style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: darkMode ? '#94a3b8' : '#64748b',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                }}
            >
                Detailed vertical view (case study)
            </div>
            <ProductionFlowDiagram darkMode={darkMode} compact />
        </motion.div>
    );
}
