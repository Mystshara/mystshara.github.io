import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug, BADGE_STYLES } from '../data/workProjects';
import { usePortfolioTheme } from '../themeContext';
import SystemFlowDiagram from './SystemFlowDiagram';
import StatForgeLifecycleDiagram from './StatForgeLifecycleDiagram';

function Section({ title, children, darkMode }) {
    const border = darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.12)';
    const heading = darkMode ? '#e2e8f0' : '#0f172a';
    const body = darkMode ? '#cbd5e1' : '#475569';

    return (
        <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, type: 'spring', stiffness: 200, damping: 26 }}
            style={{
                marginBottom: '2.5rem',
                paddingBottom: '2rem',
                borderBottom: `1px solid ${border}`
            }}
        >
            <h2
                style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: heading,
                    margin: '0 0 1rem',
                    letterSpacing: '-0.02em'
                }}
            >
                {title}
            </h2>
            <div style={{ color: body, lineHeight: 1.75, fontSize: '1.02rem' }}>{children}</div>
        </motion.section>
    );
}

export default function CaseStudyPage() {
    const { slug } = useParams();
    const { darkMode } = usePortfolioTheme();
    const project = getProjectBySlug(slug);
    const bg = darkMode ? '#0f172a' : '#f8fafc';
    const surface = darkMode ? '#1e293b' : '#ffffff';
    const muted = darkMode ? '#94a3b8' : '#64748b';
    const heroText = darkMode ? '#f8fafc' : '#0f172a';

    if (!project || !project.caseStudy) {
        return (
            <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', background: bg, color: heroText }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Case study not found</h1>
                <p style={{ color: muted, marginBottom: '2rem' }}>That work entry does not exist (yet).</p>
                <Link
                    to="/"
                    style={{
                        color: '#60a5fa',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderBottom: '2px solid rgba(96,165,250,0.4)'
                    }}
                >
                    ← Back to home
                </Link>
            </div>
        );
    }

    const cs = project.caseStudy;
    const badge = BADGE_STYLES[project.proofBadge] ?? BADGE_STYLES['Case Study'];

    const pageBg = darkMode
        ? 'linear-gradient(180deg, #020617 0%, #0f172a 35%, #111827 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)';

    return (
        <article style={{ background: pageBg, color: heroText, minHeight: '100vh', paddingBottom: '4rem' }}>
            <div
                style={{
                    maxWidth: '820px',
                    margin: '0 auto',
                    padding: '6.5rem 1.5rem 0'
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        marginBottom: '1.75rem',
                        color: darkMode ? '#93c5fd' : '#2563eb',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                    }}
                >
                    ← Systems overview
                </Link>

                <div style={{ marginBottom: '1rem' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            background: badge.bg,
                            color: badge.fg
                        }}
                    >
                        {project.proofBadge}
                    </span>
                </div>

                <h1
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.15,
                        margin: '0 0 0.75rem',
                        color: heroText
                    }}
                >
                    {project.title}
                </h1>
                <p style={{ fontSize: '1.15rem', color: muted, margin: '0 0 1.5rem', fontWeight: 500 }}>{project.subtitle}</p>
                <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: darkMode ? '#e2e8f0' : '#334155', margin: 0 }}>{cs.summary}</p>
            </div>

            <div
                style={{
                    maxWidth: '900px',
                    margin: '2.5rem auto 0',
                    padding: '0 1.5rem'
                }}
            >
                <div
                    style={{
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                        boxShadow: darkMode ? '0 20px 50px rgba(0,0,0,0.35)' : '0 12px 40px rgba(15,23,42,0.08)'
                    }}
                >
                    <img
                        src={project.image}
                        alt={`${project.title} hero visual`}
                        style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                    />
                </div>
            </div>

            <div
                style={{
                    maxWidth: '820px',
                    margin: '0 auto',
                    padding: '2.5rem 1.5rem 0'
                }}
            >
                <Section title="What it is" darkMode={darkMode}>
                    <p style={{ margin: 0 }}>{cs.whatItIs}</p>
                </Section>

                <Section title="Problem it solves" darkMode={darkMode}>
                    <p style={{ margin: 0 }}>{cs.problem}</p>
                </Section>

                {Array.isArray(cs.whatMakesItDifferent) && cs.whatMakesItDifferent.length > 0 ? (
                    <Section title="What makes StatForge different" darkMode={darkMode}>
                        {cs.whatMakesItDifferent.map((paragraph, i) => (
                            <p
                                key={`sf-diff-${i}`}
                                style={{ margin: i === cs.whatMakesItDifferent.length - 1 ? 0 : '0 0 1rem' }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </Section>
                ) : null}

                {cs.showStatForgeLifecycle ? (
                    <Section title="Match data lifecycle" darkMode={darkMode}>
                        {cs.lifecycleIntro ? <p style={{ margin: '0 0 1rem' }}>{cs.lifecycleIntro}</p> : null}
                        <StatForgeLifecycleDiagram darkMode={darkMode} />
                    </Section>
                ) : null}

                <Section title="Architecture (high level)" darkMode={darkMode}>
                    <p style={{ margin: '0 0 1rem', color: muted, fontSize: '0.95rem' }}>
                        {cs.showStatForgeLifecycle ? (
                            <>
                                Two views: the lifecycle above is how noisy inputs become a verified record. The schematic
                                below is how clients and workers touch the platform (read path vs async work). Diagrams are
                                intentionally schematic; swap in your own from Excalidraw, Mermaid, or cloud consoles when
                                you have exports.
                            </>
                        ) : (
                            <>
                                Diagrams are intentionally schematic. Swap in your own when you have exports from Excalidraw,
                                Mermaid, or cloud consoles.
                            </>
                        )}
                    </p>
                    <SystemFlowDiagram darkMode={darkMode} />
                    <pre
                        style={{
                            margin: 0,
                            padding: '1.25rem 1rem',
                            borderRadius: '12px',
                            background: darkMode ? '#020617' : '#f1f5f9',
                            color: darkMode ? '#e2e8f0' : '#0f172a',
                            fontSize: '0.78rem',
                            lineHeight: 1.45,
                            overflow: 'auto',
                            border: darkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace"
                        }}
                    >
                        {cs.architecture}
                    </pre>
                </Section>

                <Section title="Stack & integration points" darkMode={darkMode}>
                    <p style={{ margin: 0 }}>{cs.stackNotes}</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                style={{
                                    padding: '0.35rem 0.7rem',
                                    borderRadius: '8px',
                                    background: darkMode ? '#334155' : '#e2e8f0',
                                    color: darkMode ? '#e2e8f0' : '#1e293b',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    border: darkMode ? '1px solid #475569' : '1px solid #cbd5e1'
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </Section>

                <Section title="What I personally built" darkMode={darkMode}>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {cs.personalBuild.map((line) => (
                            <li key={line} style={{ marginBottom: '0.65rem' }}>
                                {line}
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section title="What made it technically hard" darkMode={darkMode}>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {cs.technicalChallenges.map((line) => (
                            <li key={line} style={{ marginBottom: '0.65rem' }}>
                                {line}
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section title="Screenshots & visuals" darkMode={darkMode}>
                    <p style={{ margin: '0 0 1rem', color: muted }}>
                        Placeholder imagery for layout. Replace with product screenshots, Grafana boards, Terraform plans, or
                        architecture exports.
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '0.75rem'
                        }}
                    >
                        {project.screenshots.map((src, i) => (
                            <div
                                key={src}
                                style={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                                    background: surface
                                }}
                            >
                                <img src={src} alt={`${project.title} visual ${i + 1}`} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Links" darkMode={darkMode}>
                    {cs.links?.length ? (
                        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {cs.links.map((l) => (
                                <li key={l.href} style={{ marginBottom: '0.5rem' }}>
                                    <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#93c5fd' : '#2563eb', fontWeight: 600 }}>
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ margin: 0, color: muted }}>
                            Public demo/repo links are not wired here yet. Add them in{' '}
                            <code style={{ fontSize: '0.9em' }}>assets/data/workProjects.js</code> for this slug (see{' '}
                            <code style={{ fontSize: '0.9em' }}>caseStudy.links</code> and top-level{' '}
                            <code style={{ fontSize: '0.9em' }}>demoLink</code> / <code style={{ fontSize: '0.9em' }}>repoLink</code> for home card buttons).
                        </p>
                    )}
                </Section>
            </div>
        </article>
    );
}
