import React from 'react';
import { motion } from 'framer-motion';
import { consoleTokens } from '../consoleTheme';

const fullBleed = {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw'
};

function Resume({ darkMode = true }) {
    const t = consoleTokens(darkMode);
    const sub = darkMode ? '#CBD5E1' : t.textSecondary;
    const muted = t.textMuted;
    const linkColor = darkMode ? t.textSecondary : t.textSecondary;

    const contactInfo = [
        { label: 'Email', value: 'b_l_turner@yahoo.com', link: 'mailto:b_l_turner@yahoo.com' },
        { label: 'LinkedIn', value: 'Rebecca Turner', link: 'https://www.linkedin.com/in/rebecca-turner-81377598/' },
        { label: 'GitHub', value: 'Mystshara', link: 'https://github.com/Mystshara' },
        { label: 'Portfolio', value: 'mystshara.github.io', link: 'https://mystshara.github.io' }
    ];

    const ctaBackdrop = darkMode
        ? `radial-gradient(circle at 50% 20%, rgba(${t.accentRgb}, 0.16), transparent 58%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.06), transparent 45%), ${t.bgElevated}`
        : `radial-gradient(circle at 50% 25%, rgba(${t.accentRgb}, 0.12), transparent 55%), #FFFFFF`;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '0', paddingBottom: 'clamp(3rem, 8vw, 4rem)' }}
        >
            <div
                style={{
                    ...fullBleed,
                    marginTop: '1rem',
                    padding: 'clamp(3.5rem, 9vw, 5rem) 1.5rem',
                    background: ctaBackdrop,
                    borderTop: `1px solid ${t.borderSubtle}`,
                    borderBottom: `1px solid ${t.borderSubtle}`,
                    boxShadow: darkMode
                        ? `inset 0 1px 0 rgba(255,255,255,0.04), 0 -24px 64px rgba(0,0,0,0.35)`
                        : `0 16px 48px rgba(15,23,42,0.08)`
                }}
            >
                <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                    <h2
                        style={{
                            fontSize: 'clamp(1.85rem, 4.5vw, 2.65rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            margin: '0 0 1rem',
                            color: t.textPrimary,
                            lineHeight: 1.08
                        }}
                    >
                        Let&apos;s build something real
                    </h2>
                    <p
                        style={{
                            fontSize: 'clamp(1.02rem, 2.2vw, 1.15rem)',
                            lineHeight: 1.7,
                            color: sub,
                            margin: '0 auto 2rem',
                            maxWidth: '540px'
                        }}
                    >
                        Infrastructure, platforms, and systems that need to work under pressure.
                    </p>
                    <motion.a
                        href="mailto:b_l_turner@yahoo.com"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.05rem 2.5rem',
                            borderRadius: '999px',
                            background: t.accent,
                            color: '#F8FAFC',
                            textDecoration: 'none',
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            letterSpacing: '-0.01em',
                            border: `1px solid rgba(${t.accentRgb}, 0.45)`,
                            boxShadow: darkMode
                                ? `0 10px 36px rgba(${t.accentRgb}, 0.28), 0 4px 14px rgba(0,0,0,0.45)`
                                : `0 10px 36px rgba(${t.accentRgb}, 0.35), 0 4px 14px rgba(15,23,42,0.08)`
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
                    padding: '2.75rem 1.5rem 0',
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
                        color: t.textPrimary,
                        border: `1px solid ${t.borderSubtle}`,
                        background: darkMode ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                        backdropFilter: darkMode ? 'blur(8px)' : undefined,
                        WebkitBackdropFilter: darkMode ? 'blur(8px)' : undefined
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
                                borderBottom: `1px solid rgba(${t.accentRgb}, ${darkMode ? 0.35 : 0.45})`
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
