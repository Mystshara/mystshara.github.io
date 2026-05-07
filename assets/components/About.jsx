import React from 'react';
import { motion } from 'framer-motion';

const TECH_GROUPS = [
    { label: 'Infrastructure', items: ['Kubernetes', 'Docker', 'NGINX'] },
    { label: 'Infra as Code', items: ['Terraform', 'Vault', 'GitHub Actions'] },
    { label: 'Backend', items: ['Python', 'PostgreSQL', 'Redis', 'Celery'] },
    { label: 'Security', items: ['Trivy', 'ZAP', 'Nikto'] }
];

const PILLARS = [
    {
        title: 'Clear boundaries',
        body: 'Systems designed to scale without turning into chaos: ownership, interfaces, and contracts that stay legible.',
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
    /* Type C — utility: readable, low chrome */
    const cardBg = darkMode ? 'rgba(15, 23, 42, 0.55)' : '#ffffff';
    const cardBorder = darkMode ? '1px solid rgba(51, 65, 85, 0.65)' : '1px solid #e2e8f0';
    const text = darkMode ? '#e2e8f0' : '#334155';
    const muted = darkMode ? '#94a3b8' : '#64748b';
    const headingColor = darkMode ? '#d4d4d8' : '#3f3f46';
    const groupShellBg = darkMode ? 'rgba(2, 6, 23, 0.5)' : '#f4f4f5';
    const groupShellBorder = darkMode ? '1px solid rgba(71, 85, 105, 0.65)' : '1px solid #e4e4e7';
    const chipBg = darkMode ? 'rgba(63, 63, 70, 0.45)' : '#f4f4f5';
    const chipBorder = darkMode ? 'rgba(113, 113, 122, 0.45)' : '#d4d4d8';
    const chipText = darkMode ? '#e4e4e7' : '#27272a';

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            style={{
                marginBottom: '4rem',
                padding: '2.25rem 0 1.1rem',
                borderRadius: '18px',
                background: darkMode ? 'rgba(15, 23, 42, 0.28)' : 'rgba(255, 255, 255, 0.75)',
                border: darkMode ? '1px solid rgba(51, 65, 85, 0.45)' : '1px solid #e2e8f0',
                boxShadow: 'none'
            }}
        >
            <div
                style={{
                    maxWidth: '1080px',
                    margin: '0 auto',
                    paddingLeft: 'clamp(1.35rem, 5vw, 3.25rem)',
                    paddingRight: 'clamp(1.35rem, 5vw, 3.25rem)'
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
                        marginBottom: '0.5rem',
                        color: darkMode ? '#fafafa' : '#18181b',
                        textAlign: 'center',
                        fontWeight: 800,
                        letterSpacing: '-0.03em'
                    }}
                >
                    How I work
                </h2>
                <p
                    style={{
                        textAlign: 'center',
                        color: muted,
                        maxWidth: '520px',
                        margin: '0 auto 2.25rem',
                        fontSize: '1rem',
                        lineHeight: 1.6
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
                        marginBottom: '2.75rem',
                        padding: 0
                    }}
                >
                    {PILLARS.map((p) => (
                        <motion.div
                            key={p.title}
                            variants={pillarItem}
                            whileHover={{
                                y: -4,
                                boxShadow: darkMode
                                    ? '0 14px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)'
                                    : '0 12px 28px rgba(15,23,42,0.08)'
                            }}
                            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                            style={{
                                padding: '1.35rem 1.25rem',
                                borderRadius: '14px',
                                background: cardBg,
                                border: cardBorder,
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '1.75rem', marginBottom: '0.65rem' }}>{p.icon}</div>
                            <h3
                                style={{
                                    margin: '0 0 0.5rem',
                                    fontSize: '1.05rem',
                                    fontWeight: 800,
                                    color: headingColor,
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                {p.title}
                            </h3>
                            <p style={{ margin: 0, lineHeight: 1.55, color: text, fontSize: '0.92rem' }}>{p.body}</p>
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
                            marginBottom: '1.25rem',
                            textAlign: 'center',
                            color: headingColor,
                            fontWeight: 800
                        }}
                    >
                        Tech stack
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '0.85rem',
                            maxWidth: '960px',
                            margin: '0 auto'
                        }}
                    >
                        {TECH_GROUPS.map((group) => (
                            <div
                                key={group.label}
                                style={{
                                    padding: '0.85rem 1rem',
                                    borderRadius: '12px',
                                    background: groupShellBg,
                                    border: groupShellBorder
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        color: muted,
                                        marginBottom: '0.55rem'
                                    }}
                                >
                                    {group.label}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {group.items.map((name) => (
                                        <span
                                            key={name}
                                            style={{
                                                padding: '0.32rem 0.65rem',
                                                borderRadius: '8px',
                                                background: chipBg,
                                                border: `1px solid ${chipBorder}`,
                                                color: chipText,
                                                fontSize: '0.84rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default About;
