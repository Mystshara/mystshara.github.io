import React from 'react';
import { motion } from 'framer-motion';

const TIER_PRIMARY = [
    'Kubernetes clusters running production workloads',
    'Terraform-managed infrastructure across multiple systems',
    'End-to-end SaaS platforms (frontend + backend + infra)'
];

const TIER_SECONDARY = [
    'Vault-integrated secret management',
    'Scanner orchestration and security gates in CI',
    'Operator-grade hosting and edge delivery paths'
];

function ProofTierRow({ lines, tier, darkMode }) {
    const isPrimary = tier === 'primary';
    const text = darkMode ? '#e2e8f0' : '#1e293b';
    const dot = darkMode ? '#34d399' : '#059669';
    const cardBg = isPrimary
        ? darkMode
            ? 'rgba(30, 41, 59, 0.88)'
            : '#ffffff'
        : darkMode
          ? 'rgba(15, 23, 42, 0.92)'
          : '#e8eef5';
    const cardBorder = isPrimary
        ? darkMode
            ? '1px solid rgba(148, 163, 184, 0.2)'
            : '1px solid #e2e8f0'
        : darkMode
          ? '1px solid rgba(51, 65, 85, 0.85)'
          : '1px solid #cbd5e1';
    const fontSize = isPrimary ? '1.02rem' : '0.9rem';
    const fontWeight = isPrimary ? 650 : 600;
    const padding = isPrimary ? '1.15rem 1.2rem' : '0.85rem 1rem';

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: isPrimary ? '0.9rem' : '0.65rem'
            }}
        >
            {lines.map((line) => (
                <motion.div
                    key={line}
                    whileHover={{
                        y: -2,
                        boxShadow: darkMode ? '0 8px 20px rgba(0,0,0,0.28)' : '0 6px 18px rgba(15,23,42,0.07)'
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        padding,
                        borderRadius: isPrimary ? '14px' : '11px',
                        background: cardBg,
                        border: cardBorder,
                        color: text,
                        fontSize,
                        fontWeight,
                        lineHeight: 1.45
                    }}
                >
                    <span
                        aria-hidden
                        style={{
                            flexShrink: 0,
                            width: isPrimary ? '8px' : '7px',
                            height: isPrimary ? '8px' : '7px',
                            borderRadius: '50%',
                            marginTop: '0.32rem',
                            background: dot,
                            boxShadow: 'none',
                            opacity: isPrimary ? 1 : 0.85
                        }}
                    />
                    {line}
                </motion.div>
            ))}
        </div>
    );
}

export default function BuiltProofSection({ darkMode }) {
    /* Type C — utility: subtle shell, no heavy glow */
    const shellBg = darkMode ? 'rgba(15, 23, 42, 0.35)' : 'rgba(248, 250, 252, 0.92)';
    const shellBorder = darkMode ? '1px solid rgba(51, 65, 85, 0.55)' : '1px solid #e2e8f0';
    const secondaryBandBg = darkMode ? 'rgba(2, 6, 23, 0.45)' : 'rgba(226, 232, 240, 0.55)';

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            style={{
                margin: '0 auto 3rem',
                maxWidth: '1100px',
                padding: '1.85rem 1.35rem',
                borderRadius: '16px',
                background: shellBg,
                border: shellBorder,
                boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.03)' : '0 4px 24px rgba(15,23,42,0.04)'
            }}
        >
            <h2
                style={{
                    fontSize: 'clamp(1.45rem, 2.8vw, 1.85rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.45rem',
                    color: darkMode ? '#f8fafc' : '#0f172a',
                    textAlign: 'center'
                }}
            >
                What I&apos;ve actually built
            </h2>
            <p
                style={{
                    textAlign: 'center',
                    color: darkMode ? '#94a3b8' : '#64748b',
                    marginBottom: '1.5rem',
                    fontSize: '0.96rem',
                    maxWidth: '540px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.55
                }}
            >
                Not marketing lines. Concrete systems and surfaces that had to work under real constraints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <ProofTierRow lines={TIER_PRIMARY} tier="primary" darkMode={darkMode} />
                <div
                    style={{
                        borderRadius: '12px',
                        padding: '1rem 0.85rem',
                        background: secondaryBandBg,
                        border: darkMode ? '1px solid rgba(30, 41, 59, 0.9)' : '1px solid #cbd5e1'
                    }}
                >
                    <ProofTierRow lines={TIER_SECONDARY} tier="secondary" darkMode={darkMode} />
                </div>
            </div>
        </motion.section>
    );
}
