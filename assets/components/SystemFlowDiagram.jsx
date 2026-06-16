import React from 'react';
import { motion } from 'framer-motion';
import RequestPathStrip from './RequestPathStrip';

/**
 * Case-study request path: horizontal card strip (readable, no SVG scale issues).
 * @param {boolean} softVisual - kept for API compatibility; strip uses neutral borders only.
 */
export default function SystemFlowDiagram({
    darkMode,
    softVisual: _softVisual = false,
    steps,
    title = 'Request path (production)',
    note = 'Read traffic stays on the API + primary row; heavy work is queued to workers and written back asynchronously.'
}) {
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
                overflowX: 'visible'
            }}
        >
            <div
                style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: darkMode ? '#cbd5e1' : '#64748b',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                }}
            >
                {title}
            </div>
            <RequestPathStrip darkMode={darkMode} steps={steps} />
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.82rem', lineHeight: 1.55, color: darkMode ? '#cbd5e1' : '#64748b', maxWidth: '48rem' }}>
                {note}
            </p>
        </motion.div>
    );
}
