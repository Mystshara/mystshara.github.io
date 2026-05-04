import React, { useId } from 'react';
import { motion } from 'framer-motion';

const STAGES = [
    { lines: ['Client'] },
    { lines: ['NGINX / Ingress', 'Controller'] },
    { lines: ['API Service', 'FastAPI / .NET · replicas'] },
    { lines: ['PostgreSQL', '(primary)'] },
    { lines: ['Redis', '(Celery broker)'] },
    { lines: ['Worker pool', 'Celery workers'] },
    { lines: ['PostgreSQL', '(async writes)'] }
];

function StageBox({ cx, y, w, h, lines, accent, fill, textColor, fontSize = 10.5, delay = 0 }) {
    const x = cx - w / 2;
    const lineGap = lines.length > 1 ? 13 : 0;
    const startY = y + h / 2 - ((lines.length - 1) * lineGap) / 2;

    return (
        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
            <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={accent} strokeWidth="1.75" />
            {lines.map((line, i) => (
                <text
                    key={line}
                    x={cx}
                    y={startY + i * lineGap}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize={fontSize}
                    fontWeight="700"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    style={{ letterSpacing: '0.02em' }}
                >
                    {line}
                </text>
            ))}
        </motion.g>
    );
}

function FlowArrow({ x1, y1, x2, y2, stroke, markerId, dashed = true }) {
    const common = {
        x1,
        y1,
        x2,
        y2,
        stroke,
        strokeWidth: 2.25,
        strokeLinecap: 'round',
        markerEnd: `url(#${markerId})`
    };
    if (!dashed) {
        return <line {...common} fill="none" />;
    }
    return (
        <motion.line
            {...common}
            strokeDasharray="6 6"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -48 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
    );
}

export default function ProductionFlowDiagram({ darkMode, compact = false }) {
    const markerId = `flow-arrow-${useId().replace(/:/g, '')}`;
    const arrowFill = darkMode ? '#38bdf8' : '#0284c7';
    const accent = darkMode ? '#38bdf8' : '#2563eb';
    const fill = darkMode ? 'rgba(15, 23, 42, 0.88)' : '#ffffff';
    const textColor = darkMode ? '#e2e8f0' : '#0f172a';
    const stroke = darkMode ? 'rgba(96, 165, 250, 0.65)' : 'rgba(37, 99, 235, 0.5)';
    const w = compact ? 320 : 300;
    const boxW = compact ? 196 : 218;
    const boxH = compact ? 34 : 38;
    const gap = compact ? 8 : 10;
    const arrowSpan = 14;
    const cx = w / 2;
    const topPad = compact ? 12 : 16;
    const fontSize = compact ? 9.5 : 10.5;

    let y = topPad;
    const positions = STAGES.map(() => {
        const row = { y, h: boxH };
        y += boxH + arrowSpan + gap;
        return row;
    });

    const totalH = positions[positions.length - 1].y + boxH + topPad + 20;

    return (
        <svg viewBox={`0 0 ${w} ${totalH}`} style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden>
            <defs>
                <marker id={markerId} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L9,4.5 L0,9 Z" fill={arrowFill} />
                </marker>
            </defs>

            {positions.map((p, i) => (
                <StageBox
                    key={STAGES[i].lines.join('-')}
                    cx={cx}
                    y={p.y}
                    w={boxW}
                    h={p.h}
                    lines={STAGES[i].lines}
                    accent={accent}
                    fill={fill}
                    textColor={textColor}
                    fontSize={fontSize}
                    delay={0.04 + i * 0.04}
                />
            ))}

            {positions.map((p, i) => {
                if (i === 0) return null;
                const prev = positions[i - 1];
                const y1 = prev.y + prev.h + 3;
                const y2 = p.y - 3;
                return (
                    <FlowArrow
                        key={`a-${i}`}
                        x1={cx}
                        y1={y1}
                        x2={cx}
                        y2={y2}
                        stroke={stroke}
                        markerId={markerId}
                        dashed={false}
                    />
                );
            })}
        </svg>
    );
}
