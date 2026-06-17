import React from 'react';
import { motion } from 'framer-motion';
import { consoleTokens, glassSurfaceStyle } from '../consoleTheme';

const TECH_GROUPS = [
    { label: 'Infrastructure', items: ['Kubernetes', 'Docker', 'NGINX'] },
    { label: 'Infra as Code', items: ['Terraform', 'Vault', 'GitHub Actions'] },
    { label: 'Backend', items: ['Python', 'PostgreSQL', 'Redis', 'Celery'] },
    { label: 'Security', items: ['Trivy', 'ZAP', 'Nikto'] }
];

const PILLARS = [
    {
        title: 'Clear boundaries',
        body: 'Systems stay manageable when ownership, interfaces, and contracts are clear.',
        icon: '🧱'
    },
    {
        title: 'Repeatable automation',
        body: 'Everything deployable, testable, and reproducible. Changes you can review, roll back, and reason about.',
        icon: '🔁'
    },
    {
        title: 'Security by design',
        body: 'Decisions that hold up in real reviews: least privilege, secret lifecycle, and controls that match real workflows.',
        icon: '🔒'
    },
    {
        title: 'Operability',
        body: 'Monitoring, debugging, and incident handling as first-class concerns, not an afterthought once traffic hits.',
        icon: '📡'
    }
];

const pillarContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const pillarItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, type: 'spring', stiffness: 260, damping: 24 } }
};

function About({ darkMode = true }) {
    const t = consoleTokens(darkMode);
    const shell = glassSurfaceStyle(darkMode, t);
    const text = darkMode ? '#E2E8F0' : t.textSecondary;
    const muted = t.textMuted;
    const headingAccent = darkMode ? '#93C5FD' : t.accent;

    const pillarShell = {
        padding: '1.35rem 1.25rem',
        borderRadius: '14px',
        background: darkMode ? 'rgba(17, 24, 39, 0.55)' : 'rgba(255,255,255,0.95)',
        border: `1px solid ${t.borderSubtle}`,
        backdropFilter: darkMode ? 'blur(10px)' : undefined,
        WebkitBackdropFilter: darkMode ? 'blur(10px)' : undefined,
        boxShadow: darkMode ? '0 8px 28px rgba(0,0,0,0.22)' : '0 6px 22px rgba(15,23,42,0.06)'
    };

    const techPills = TECH_GROUPS.flatMap((group) =>
        group.items.map((name) => ({ name, group: group.label }))
    );

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            style={{
                marginBottom: 0,
                padding: 'clamp(2.25rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.75rem)',
                borderRadius: '20px',
                ...shell,
                boxShadow: darkMode ? `${shell.boxShadow}, inset 0 1px 0 rgba(255,255,255,0.03)` : shell.boxShadow
            }}
        >
            <div
                style={{
                    maxWidth: '1080px',
                    margin: '0 auto',
                    paddingLeft: 'clamp(0.5rem, 3vw, 1rem)',
                    paddingRight: 'clamp(0.5rem, 3vw, 1rem)'
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
                        marginBottom: '0.65rem',
                        color: t.textPrimary,
                        textAlign: 'center',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05
                    }}
                >
                    How I work
                </h2>
                <p
                    style={{
                        textAlign: 'center',
                        color: muted,
                        maxWidth: '520px',
                        margin: '0 auto 2.75rem',
                        fontSize: '1rem',
                        lineHeight: 1.7
                    }}
                >
                    Four pillars I optimize for on every serious system.
                </p>

                <motion.div
                    variants={pillarContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.65rem',
                        marginBottom: '3rem',
                        padding: 0
                    }}
                >
                    {PILLARS.map((p) => (
                        <motion.div
                            key={p.title}
                            variants={pillarItem}
                            whileHover={{
                                y: -5,
                                borderColor: `rgba(${t.accentRgb}, ${darkMode ? 0.35 : 0.4})`,
                                boxShadow: darkMode
                                    ? `0 16px 36px rgba(0,0,0,0.32), 0 0 36px rgba(${t.accentRgb}, 0.08)`
                                    : `0 14px 34px rgba(15,23,42,0.1)`
                            }}
                            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                            style={{
                                ...pillarShell,
                                textAlign: 'left',
                                transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '1.75rem',
                                    marginBottom: '0.65rem',
                                    width: '2.75rem',
                                    height: '2.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '12px',
                                    background: `rgba(${t.accentRgb}, ${darkMode ? 0.12 : 0.1})`,
                                    border: `1px solid rgba(${t.accentRgb}, ${darkMode ? 0.2 : 0.22})`
                                }}
                            >
                                {p.icon}
                            </div>
                            <h3
                                style={{
                                    margin: '0 0 0.5rem',
                                    fontSize: '1.05rem',
                                    fontWeight: 800,
                                    color: headingAccent,
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                {p.title}
                            </h3>
                            <p style={{ margin: 0, lineHeight: 1.7, color: text, fontSize: '0.92rem' }}>{p.body}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                >
                    <h3
                        style={{
                            fontSize: '1.35rem',
                            marginBottom: '1.35rem',
                            textAlign: 'center',
                            color: t.textPrimary,
                            fontWeight: 800,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Tech stack
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            maxWidth: '920px',
                            margin: '0 auto'
                        }}
                    >
                        {techPills.map(({ name, group }) => (
                            <span
                                key={`${group}-${name}`}
                                title={group}
                                style={{
                                    padding: '0.38rem 0.75rem',
                                    borderRadius: '999px',
                                    background: darkMode ? 'rgba(255,255,255,0.05)' : `rgba(${t.accentRgb}, 0.07)`,
                                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : `rgba(${t.accentRgb}, 0.18)`}`,
                                    color: t.textPrimary,
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    letterSpacing: '-0.01em'
                                }}
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default About;
