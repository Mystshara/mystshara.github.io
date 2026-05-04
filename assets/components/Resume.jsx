import React from 'react';
import { motion } from 'framer-motion';

const fullBleed = {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw'
};

function Resume({ darkMode = true }) {
    const sub = darkMode ? '#cbd5e1' : '#475569';
    const muted = darkMode ? '#94a3b8' : '#64748b';
    const linkColor = darkMode ? '#93c5fd' : '#2563eb';

    const contactInfo = [
        { label: 'Email', value: 'b_l_turner@yahoo.com', link: 'mailto:b_l_turner@yahoo.com' },
        { label: 'LinkedIn', value: 'Rebecca Turner', link: 'https://www.linkedin.com/in/rebecca-turner-81377598/' },
        { label: 'GitHub', value: 'Mystshara', link: 'https://github.com/Mystshara' },
        { label: 'Portfolio', value: 'mystshara.github.io', link: 'https://mystshara.github.io' }
    ];

    const ctaBg = darkMode
        ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 38%, #312e81 72%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #e0e7ff 100%)';
    const ctaBorder = darkMode ? '1px solid rgba(51, 65, 85, 0.65)' : '1px solid rgba(203, 213, 225, 0.95)';

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '0', paddingBottom: '3.5rem' }}
        >
            <div
                style={{
                    ...fullBleed,
                    marginTop: '1rem',
                    padding: 'clamp(3rem, 8vw, 4.5rem) 1.5rem',
                    background: ctaBg,
                    borderTop: ctaBorder,
                    borderBottom: ctaBorder,
                    boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : 'none'
                }}
            >
                <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                    <h2
                        style={{
                            fontSize: 'clamp(1.85rem, 4.5vw, 2.65rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            margin: '0 0 1rem',
                            color: darkMode ? '#f8fafc' : '#0f172a',
                            lineHeight: 1.15
                        }}
                    >
                        Let&apos;s build something real
                    </h2>
                    <p
                        style={{
                            fontSize: 'clamp(1.02rem, 2.2vw, 1.15rem)',
                            lineHeight: 1.65,
                            color: sub,
                            margin: '0 auto 1.75rem',
                            maxWidth: '540px'
                        }}
                    >
                        Infrastructure, platforms, and systems that need to work under pressure.
                    </p>
                    <motion.a
                        href="mailto:b_l_turner@yahoo.com"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem 2.25rem',
                            borderRadius: '999px',
                            background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                            color: '#f8fafc',
                            textDecoration: 'none',
                            fontWeight: 800,
                            fontSize: '1.02rem',
                            letterSpacing: '-0.01em',
                            textShadow: 'none',
                            border: '1px solid rgba(255,255,255,0.14)',
                            boxShadow: darkMode
                                ? '0 1px 2px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.35)'
                                : '0 1px 2px rgba(15,23,42,0.08), 0 4px 14px rgba(15,23,42,0.12)'
                        }}
                    >
                        Talk to me about your system
                    </motion.a>
                </div>
            </div>

            <div
                style={{
                    maxWidth: '920px',
                    margin: '0 auto',
                    padding: '2.25rem 1.5rem 0',
                    textAlign: 'center'
                }}
            >
                <motion.a
                    href="/Rebecca_Turner_Resume_Updated.docx"
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                        padding: '0.55rem 1.15rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        color: darkMode ? '#e2e8f0' : '#1e293b',
                        border: darkMode ? '1px solid rgba(148, 163, 184, 0.4)' : '1px solid #cbd5e1',
                        background: darkMode ? 'rgba(30, 41, 59, 0.5)' : '#ffffff'
                    }}
                >
                    Download resume (DOCX)
                </motion.a>

                <nav aria-label="Contact links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem 1.25rem' }}>
                    {contactInfo.map((c) => (
                        <a
                            key={c.label}
                            href={c.link}
                            target={c.link.startsWith('mailto:') ? undefined : '_blank'}
                            rel={c.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: linkColor,
                                textDecoration: 'none',
                                borderBottom: `1px solid ${darkMode ? 'rgba(147, 197, 253, 0.35)' : 'rgba(37, 99, 235, 0.35)'}`
                            }}
                        >
                            {c.label}
                            <span style={{ color: muted, fontWeight: 500 }}> — {c.value}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </motion.section>
    );
}

export default Resume;
