import React from 'react';
import { motion } from 'framer-motion';
import { consoleTokens, glassSurfaceStyle } from '../consoleTheme';

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

function ProofTierRow({ lines, tier, darkMode, tokens }) {
    const isPrimary = tier === 'primary';
    const text = darkMode ? '#E2E8F0' : tokens.textSecondary;
    const dot = `rgba(${tokens.accentRgb}, ${isPrimary ? 1 : 0.65})`;
    const cardBg = darkMode ? `rgba(17, 24, 39, ${isPrimary ? 0.72 : 0.55})` : isPrimary ? '#FFFFFF' : tokens.surface3;
    const cardBorder = darkMode ? tokens.borderSubtle : tokens.borderSubtle;
    const fontSize = isPrimary ? '1.02rem' : '0.9rem';
    const fontWeight = isPrimary ? 650 : 600;
    const padding = isPrimary ? '1.15rem 1.2rem' : '0.85rem 1rem';
    const blurShadow = darkMode
        ? isPrimary
            ? `0 10px 28px rgba(0,0,0,0.28)`
            : `0 6px 20px rgba(0,0,0,0.2)`
        : isPrimary
          ? `0 8px 26px rgba(15,23,42,0.07)`
          : `0 4px 16px rgba(15,23,42,0.05)`;

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
                        y: -3,
                        boxShadow: darkMode
                            ? `0 12px 32px rgba(0,0,0,0.32), 0 0 28px rgba(${tokens.accentRgb}, 0.08)`
                            : `0 12px 32px rgba(15,23,42,0.1)`
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        padding,
                        borderRadius: isPrimary ? '14px' : '11px',
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: blurShadow,
                        backdropFilter: darkMode ? 'blur(10px)' : undefined,
                        WebkitBackdropFilter: darkMode ? 'blur(10px)' : undefined,
                        color: text,
                        fontSize,
                        fontWeight,
                        lineHeight: 1.55,
                        transition: 'box-shadow 0.25s ease, border-color 0.25s ease'
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
                            boxShadow: darkMode ? `0 0 12px rgba(${tokens.accentRgb}, 0.45)` : 'none',
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
    const t = consoleTokens(darkMode);
    const shell = glassSurfaceStyle(darkMode, t);

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            style={{
                margin: '0 auto',
                maxWidth: '1100px',
                padding: 'clamp(2rem, 5vw, 2.75rem) clamp(1.35rem, 4vw, 2rem)',
                borderRadius: '18px',
                ...shell,
                boxShadow: darkMode ? `${shell.boxShadow}, inset 0 1px 0 rgba(255,255,255,0.04)` : shell.boxShadow
            }}
        >
            <h2
                style={{
                    fontSize: 'clamp(1.45rem, 2.8vw, 1.85rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.55rem',
                    color: t.textPrimary,
                    textAlign: 'center',
                    lineHeight: 1.1
                }}
            >
                What I&apos;ve actually built
            </h2>
            <p
                style={{
                    textAlign: 'center',
                    color: t.textMuted,
                    marginBottom: '1.75rem',
                    fontSize: '0.98rem',
                    maxWidth: '540px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.7
                }}
            >
                Not marketing lines. Concrete systems and surfaces that had to work under real constraints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <ProofTierRow lines={TIER_PRIMARY} tier="primary" darkMode={darkMode} tokens={t} />
                <div
                    style={{
                        borderRadius: '14px',
                        padding: '1rem 0.85rem',
                        background: darkMode ? 'rgba(6, 8, 22, 0.55)' : t.surface3,
                        border: `1px solid ${t.borderSubtle}`,
                        backdropFilter: darkMode ? 'blur(8px)' : undefined,
                        WebkitBackdropFilter: darkMode ? 'blur(8px)' : undefined
                    }}
                >
                    <ProofTierRow lines={TIER_SECONDARY} tier="secondary" darkMode={darkMode} tokens={t} />
                </div>
            </div>
        </motion.section>
    );
}
