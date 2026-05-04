import React, { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * StatForge-specific: signal → verification → publication lifecycle
 * (complements the generic request-path diagram on the same page).
 */
const PHASES = [
    { title: 'Signals in', sub: 'stats, reports, feeds' },
    { title: 'Detection', sub: 'candidate matches' },
    { title: 'Grouping', sub: 'inference' },
    { title: 'Evidence', sub: 'audit trail' },
    { title: 'Review', sub: 'human gate' },
    { title: 'Verified', sub: 'single outcome' },
    { title: 'Published', sub: 'API read model' }
];

export default function StatForgeLifecycleDiagram({ darkMode }) {
    const mid = `sf-life-${useId().replace(/:/g, '')}`;
    const accent = darkMode ? '#a78bfa' : '#7c3aed';
    const stroke = darkMode ? 'rgba(167, 139, 250, 0.75)' : 'rgba(124, 58, 237, 0.55)';
    const fill = darkMode ? 'rgba(15, 23, 42, 0.9)' : '#ffffff';
    const text = darkMode ? '#e2e8f0' : '#0f172a';
    const sub = darkMode ? '#94a3b8' : '#64748b';

    const w = 720;
    const h = 118;
    const boxW = 88;
    const boxH = 56;
    const gap = 10;
    const startX = 16;
    const y = 32;

    const xs = PHASES.map((_, i) => startX + i * (boxW + gap));

    return (
        <div
            style={{
                overflowX: 'auto',
                marginTop: '0.5rem',
                borderRadius: '14px',
                padding: '1rem 0.75rem',
                background: darkMode ? 'rgba(2, 6, 23, 0.55)' : '#f8fafc',
                border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0'
            }}
        >
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ minWidth: w, display: 'block' }} aria-hidden>
                <defs>
                    <marker id={mid} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
                    </marker>
                </defs>
                {xs.slice(0, -1).map((x, i) => {
                    const x1 = x + boxW;
                    const x2 = xs[i + 1];
                    return (
                        <motion.line
                            key={i}
                            x1={x1}
                            y1={y + boxH / 2}
                            x2={x2}
                            y2={y + boxH / 2}
                            stroke={stroke}
                            strokeWidth="2"
                            strokeLinecap="round"
                            markerEnd={`url(#${mid})`}
                            strokeDasharray="4 6"
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -40 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: i * 0.05 }}
                        />
                    );
                })}
                {PHASES.map((ph, i) => {
                    const x = xs[i];
                    return (
                        <g key={ph.title}>
                            <rect x={x} y={y} width={boxW} height={boxH} rx="10" fill={fill} stroke={accent} strokeWidth="1.5" />
                            <text
                                x={x + boxW / 2}
                                y={y + boxH / 2 - 6}
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fill={text}
                                fontSize="9.5"
                                fontWeight="800"
                                fontFamily="system-ui, sans-serif"
                            >
                                {ph.title}
                            </text>
                            <text
                                x={x + boxW / 2}
                                y={y + boxH / 2 + 10}
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fill={sub}
                                fontSize="7.5"
                                fontWeight="600"
                                fontFamily="system-ui, sans-serif"
                            >
                                {ph.sub}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
