import React from 'react';
import { usePortfolioTheme } from '../themeContext';
import { consoleTokens } from '../consoleTheme';

const REQUEST_EMAIL = 'b_l_turner@yahoo.com';

export default function HostingMigrationNotice() {
    const { darkMode } = usePortfolioTheme();
    const t = consoleTokens(darkMode);

    return (
        <div
            role="status"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
                borderBottom: `1px solid ${darkMode ? 'rgba(245, 158, 11, 0.28)' : 'rgba(217, 119, 6, 0.3)'}`,
                background: darkMode
                    ? `linear-gradient(90deg, rgba(245, 158, 11, 0.14) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(245, 158, 11, 0.14) 100%), ${t.bgMid}`
                    : 'linear-gradient(90deg, #FEF3C7 0%, #FFFBEB 50%, #FEF3C7 100%)',
                boxShadow: darkMode ? '0 4px 24px rgba(0, 0, 0, 0.35)' : '0 2px 12px rgba(120, 53, 15, 0.08)',
                color: darkMode ? '#FDE68A' : '#78350F'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    flexWrap: 'wrap',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0.7rem clamp(1rem, 4vw, 1.5rem)',
                    paddingRight: 'clamp(4.5rem, 12vw, 6rem)'
                }}
            >
                <span
                    style={{
                        flexShrink: 0,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: darkMode ? 'rgba(245, 158, 11, 0.18)' : 'rgba(217, 119, 6, 0.12)',
                        border: `1px solid ${darkMode ? 'rgba(245, 158, 11, 0.35)' : 'rgba(217, 119, 6, 0.25)'}`,
                        color: darkMode ? '#FCD34D' : '#92400E'
                    }}
                >
                    Notice
                </span>
                <p
                    style={{
                        margin: 0,
                        fontSize: 'clamp(0.84rem, 2vw, 0.94rem)',
                        lineHeight: 1.55,
                        textAlign: 'center',
                        flex: '1 1 16rem',
                        maxWidth: '56rem'
                    }}
                >
                    Some live infrastructure demonstrations are temporarily unavailable while hosting services are being
                    migrated. Architecture, documents, project descriptions, and source material remain{' '}
                    <a
                        href={`mailto:${REQUEST_EMAIL}?subject=Portfolio%20materials%20request`}
                        style={{ color: darkMode ? t.accent : '#1D4ED8', fontWeight: 700 }}
                    >
                        available upon request
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
