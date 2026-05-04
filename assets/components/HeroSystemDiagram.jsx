import React, { useId } from 'react';
import { motion } from 'framer-motion';

const node = { rx: 10 };

function NodeBox({ x, y, w, h, lines, delay, accent, darkMode }) {
    const fill = 'rgba(15, 23, 42, 0.65)';
    const primary = lines[0];
    const secondary = lines[1];

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.45, type: 'spring', stiffness: 120, damping: 18 }}
        >
            <motion.rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={node.rx}
                fill={fill}
                stroke={accent}
                strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
            />
            <text
                x={x + w / 2}
                y={y + h / 2 - (secondary ? 7 : 0)}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize={secondary ? 9.5 : 11}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                style={{ letterSpacing: '0.02em' }}
            >
                {primary}
            </text>
            {secondary ? (
                <text
                    x={x + w / 2}
                    y={y + h / 2 + 9}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill={darkMode ? '#94a3b8' : '#64748b'}
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                >
                    {secondary}
                </text>
            ) : null}
        </motion.g>
    );
}

function EdgeLabel({ x, y, text, darkMode }) {
    return (
        <text
            x={x}
            y={y}
            fill={darkMode ? '#64748b' : '#64748b'}
            fontSize="7"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
            style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
            {text}
        </text>
    );
}

export default function HeroSystemDiagram({ darkMode }) {
    const uid = useId().replace(/:/g, '');
    const solidId = `arr-solid-${uid}`;
    const asyncId = `arr-async-${uid}`;
    const solid = darkMode ? '#38bdf8' : '#0284c7';
    const asyncStroke = darkMode ? '#a78bfa' : '#7c3aed';
    const pulse = darkMode ? '#a78bfa' : '#6366f1';
    const accent = darkMode ? '#38bdf8' : '#2563eb';

    return (
        <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                margin: darkMode ? '0' : '0 auto',
                borderRadius: '20px',
                padding: '1.1rem 0.9rem 1.15rem',
                background: darkMode
                    ? 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.45) 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #e0e7ff 100%)',
                border: darkMode ? '1px solid rgba(148,163,184,0.25)' : '1px solid rgba(148,163,184,0.35)',
                boxShadow: darkMode
                    ? '0 0 0 1px rgba(255,255,255,0.04), 0 20px 48px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : '0 16px 44px rgba(15,23,42,0.1)'
            }}
        >
            <div
                style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.11em',
                    textTransform: 'uppercase',
                    color: darkMode ? '#94a3b8' : '#64748b',
                    marginBottom: '0.2rem'
                }}
            >
                Production request path
            </div>
            <div
                style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    marginBottom: '0.45rem'
                }}
            >
                Synchronous + asynchronous request path
            </div>
            <p
                style={{
                    fontSize: '0.7rem',
                    lineHeight: 1.45,
                    color: darkMode ? '#64748b' : '#64748b',
                    margin: '0 0 0.55rem',
                    maxWidth: '430px'
                }}
            >
                <span style={{ color: solid, fontWeight: 800 }}>Solid</span> arrows: edge sync path and OLTP reads/writes
                between API and Postgres. <span style={{ color: asyncStroke, fontWeight: 800 }}>Dashed</span> arrows: Celery
                broker, worker pool, and async result writes back to Postgres.
            </p>

            <svg viewBox="0 0 440 318" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '340px' }} aria-hidden>
                <defs>
                    <marker id={solidId} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L9,4.5 L0,9 Z" fill={solid} />
                    </marker>
                    <marker id={asyncId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L8,4 L0,8 Z" fill={asyncStroke} />
                    </marker>
                </defs>

                {/* Sync spine: Client → NGINX → API (solid) */}
                <line x1="74" y1="40" x2="74" y2="62" stroke={solid} strokeWidth="2.5" markerEnd={`url(#${solidId})`} />
                <line x1="74" y1="102" x2="74" y2="118" stroke={solid} strokeWidth="2.5" markerEnd={`url(#${solidId})`} />

                {/* Postgres reads: primary → API (OLTP read path) */}
                <line x1="300" y1="136" x2="134" y2="136" stroke={solid} strokeWidth="2.25" markerEnd={`url(#${solidId})`} />
                <EdgeLabel x={188} y={126} text="reads (OLTP)" darkMode={darkMode} />

                {/* API sync writes to primary */}
                <line x1="134" y1="150" x2="300" y2="150" stroke={solid} strokeWidth="2.25" markerEnd={`url(#${solidId})`} />
                <EdgeLabel x={188} y={158} text="sync writes" darkMode={darkMode} />

                {/* Async: API → Redis broker (dashed) */}
                <motion.line
                    x1="74"
                    y1="170"
                    x2="74"
                    y2="208"
                    stroke={asyncStroke}
                    strokeWidth="2.25"
                    strokeDasharray="7 6"
                    markerEnd={`url(#${asyncId})`}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -52 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
                <EdgeLabel x={86} y={200} text="enqueue" darkMode={darkMode} />

                {/* Redis → worker pool (dashed) */}
                <motion.line
                    x1="74"
                    y1="244"
                    x2="74"
                    y2="264"
                    stroke={asyncStroke}
                    strokeWidth="2.25"
                    strokeDasharray="7 6"
                    markerEnd={`url(#${asyncId})`}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -52 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.15 }}
                />

                {/* Worker → Postgres async result writes (dashed) */}
                <motion.path
                    d="M 74 302 Q 185 255 318 168"
                    fill="none"
                    stroke={asyncStroke}
                    strokeWidth="2.25"
                    strokeDasharray="7 6"
                    markerEnd={`url(#${asyncId})`}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -80 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.08 }}
                />
                <EdgeLabel x={232} y={238} text="async writes" darkMode={darkMode} />

                <motion.circle
                    cx="74"
                    cy="88"
                    r="4"
                    fill={pulse}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <circle cx="74" cy="28" r="12" fill="rgba(15,23,42,0.55)" stroke={accent} strokeWidth="1.5" />
                    <text x="74" y="28" dominantBaseline="middle" textAnchor="middle" fill="#e2e8f0" fontSize="7.5" fontWeight="800">
                        Client
                    </text>
                </motion.g>

                <NodeBox x={28} y={62} w={92} h={40} lines={['NGINX / Ingress', 'controller']} delay={0.06} accent={accent} darkMode={darkMode} />
                <NodeBox x={14} y={118} w={120} h={52} lines={['API Service', 'FastAPI / .NET · replicas']} delay={0.1} accent={accent} darkMode={darkMode} />
                <NodeBox x={300} y={108} w={122} h={58} lines={['PostgreSQL', '(primary)']} delay={0.14} accent={accent} darkMode={darkMode} />
                <NodeBox x={22} y={208} w={104} h={36} lines={['Redis', '(Celery broker)']} delay={0.18} accent={accent} darkMode={darkMode} />
                <NodeBox x={14} y={264} w={120} h={46} lines={['Worker pool', 'Celery workers']} delay={0.22} accent={accent} darkMode={darkMode} />
            </svg>
        </motion.div>
    );
}
