import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug } from '../data/workProjects';
import { usePortfolioTheme } from '../themeContext';
import { consoleTokens, proofBadgeStyle } from '../consoleTheme';
import SystemFlowDiagram from './SystemFlowDiagram';
import StatForgeLifecycleDiagram from './StatForgeLifecycleDiagram';

/**
 * @param {'prose' | 'column'} contentWidth — prose caps line length (~42rem). column matches full case-study width (cards, diagrams).
 */
function Section({ title, children, darkMode, noBorder = false, contentWidth = 'prose' }) {
    const t = consoleTokens(darkMode);
    const border = darkMode ? t.borderSubtle : t.borderSubtle;
    const heading = t.textPrimary;
    const body = darkMode ? '#E2E8F0' : t.textSecondary;
    const isColumn = contentWidth === 'column';

    return (
        <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, type: 'spring', stiffness: 200, damping: 26 }}
            style={{
                marginBottom: noBorder ? '2rem' : '2.5rem',
                paddingBottom: noBorder ? 0 : '2rem',
                borderBottom: noBorder ? 'none' : `1px solid ${border}`
            }}
        >
            <h2
                style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: heading,
                    margin: '0 0 1rem',
                    letterSpacing: '-0.02em',
                    maxWidth: isColumn ? '42rem' : undefined
                }}
            >
                {title}
            </h2>
            <div
                style={{
                    color: body,
                    lineHeight: 1.7,
                    fontSize: darkMode ? '1.0625rem' : '1.02rem',
                    maxWidth: isColumn ? 'none' : '42rem',
                    width: isColumn ? '100%' : undefined,
                    fontWeight: darkMode ? 450 : 400
                }}
            >
                {children}
            </div>
        </motion.section>
    );
}

function StatForgeDifferenceBlock({ lines, quote, darkMode, tokens: tk }) {
    const fg = darkMode ? '#F1F5F9' : tk.textPrimary;
    const quoteColor = darkMode ? '#CBD5E1' : tk.textSecondary;

    return (
        <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            style={{
                margin: '0 0 2.75rem',
                padding: 'clamp(1.75rem, 4vw, 2.75rem) clamp(1.25rem, 3vw, 2.25rem)',
                borderRadius: '18px',
                background: darkMode ? `rgba(17, 24, 39, 0.72)` : tk.surface1,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${tk.borderSubtle}`,
                boxShadow: darkMode ? `0 18px 48px rgba(0,0,0,0.45), 0 0 40px rgba(${tk.accentRgb}, 0.06)` : tk.shadowCard
            }}
        >
            <p
                style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tk.textMuted,
                    margin: '0 0 1.25rem'
                }}
            >
                What makes StatForge different
            </p>
            <div style={{ maxWidth: '38rem' }}>
                {lines.map((line, i) => (
                    <p
                        key={line}
                        style={{
                            margin: i === lines.length - 1 ? '0 0 1.5rem' : '0 0 0.55rem',
                            fontSize: i === 0 ? 'clamp(1.35rem, 3.2vw, 1.65rem)' : 'clamp(1.05rem, 2.2vw, 1.2rem)',
                            fontWeight: i === 0 || i === 1 ? 800 : 600,
                            lineHeight: 1.45,
                            color: fg,
                            letterSpacing: i === 0 ? '-0.03em' : '-0.01em'
                        }}
                    >
                        {line}
                    </p>
                ))}
            </div>
            {quote ? (
                <blockquote
                    style={{
                        margin: 0,
                        padding: '1rem 0 0 1.1rem',
                        borderLeft: `4px solid rgba(${tk.accentRgb}, 0.45)`,
                        fontSize: '1.05rem',
                        lineHeight: 1.7,
                        color: quoteColor,
                        fontWeight: 500,
                        fontStyle: 'italic'
                    }}
                >
                    {quote}
                </blockquote>
            ) : null}
        </motion.section>
    );
}

function PersonalBuildCards({ cards, darkMode }) {
    const tk = consoleTokens(darkMode);
    const cardBg = darkMode ? `rgba(17, 24, 39, 0.65)` : tk.surface1;
    const border = `1px solid ${tk.borderSubtle}`;
    const titleC = tk.textPrimary;
    const bodyC = tk.textMuted;

    return (
        <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: `1px solid ${tk.borderSubtle}` }}
        >
            <h2
                style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: tk.textPrimary,
                    margin: '0 0 1.15rem',
                    letterSpacing: '-0.02em'
                }}
            >
                What I personally built
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.85rem'
                }}
            >
                {cards.map((c) => (
                    <div
                        key={c.title}
                        style={{
                            padding: '1.1rem 1.15rem',
                            borderRadius: '14px',
                            background: cardBg,
                            border,
                            boxShadow: darkMode ? '0 8px 22px rgba(0,0,0,0.25)' : '0 4px 16px rgba(15,23,42,0.06)'
                        }}
                    >
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800, color: titleC, letterSpacing: '-0.02em' }}>{c.title}</h3>
                        <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.55, color: bodyC }}>{c.body}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

export default function CaseStudyPage() {
    const { slug } = useParams();
    const { darkMode } = usePortfolioTheme();
    const t = consoleTokens(darkMode);
    const project = getProjectBySlug(slug);
    const bg = t.bgDeep;
    const surface = darkMode ? t.surface2 : t.surface1;
    const muted = t.textMuted;
    const heroText = t.textPrimary;

    if (!project || !project.caseStudy) {
        return (
            <div style={{ minHeight: '70vh', padding: '6rem 1.5rem', textAlign: 'center', background: bg, color: heroText }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Case study not found</h1>
                <p style={{ color: muted, marginBottom: '2rem' }}>That work entry does not exist (yet).</p>
                <Link
                    to="/"
                    style={{
                        color: t.textSecondary,
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderBottom: `2px solid rgba(${t.accentRgb}, 0.35)`
                    }}
                >
                    ← Back to home
                </Link>
            </div>
        );
    }

    const cs = project.caseStudy;
    const badgeStyle = proofBadgeStyle(darkMode, t);
    const isStatForge = slug === 'statforge';
    const contentMax = isStatForge ? '880px' : '820px';
    const showScreenshots = !cs.hideScreenshots && Array.isArray(project.screenshots) && project.screenshots.length > 0;

    const pageBg = darkMode ? t.bgMid : t.bgDeep;

    const heroLifecycle = isStatForge && cs.showStatForgeLifecycle;

    return (
        <article
            style={{
                background: pageBg,
                color: heroText,
                minHeight: '100vh',
                paddingBottom: '4rem',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
            }}
        >
            <div
                style={{
                    maxWidth: contentMax,
                    margin: '0 auto',
                    padding: '6.5rem 1.5rem 0'
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        marginBottom: '1.75rem',
                        color: t.textSecondary,
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
                            ...badgeStyle
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
                <p style={{ fontSize: '1.12rem', color: muted, margin: '0 0 1.5rem', fontWeight: 500, maxWidth: '42rem', lineHeight: 1.55 }}>
                    {project.subtitle}
                </p>
                <p
                    style={{
                        fontSize: darkMode ? '1.08rem' : '1.08rem',
                        lineHeight: 1.72,
                        color: darkMode ? '#f1f5f9' : '#334155',
                        margin: 0,
                        maxWidth: '42rem',
                        fontWeight: darkMode ? 450 : 400
                    }}
                >
                    {cs.summary}
                </p>

                {heroLifecycle ? (
                    <div style={{ marginTop: '2.5rem' }}>
                        <h2
                            style={{
                                fontSize: 'clamp(1.25rem, 2.8vw, 1.5rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                margin: '0 0 0.65rem',
                                color: heroText
                            }}
                        >
                            {cs.lifecycleHeroTitle ?? 'From noisy inputs → one verified outcome'}
                        </h2>
                        {cs.lifecycleHeroSubtitle ? (
                            <p style={{ margin: '0 0 1.35rem', color: muted, fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '42rem' }}>{cs.lifecycleHeroSubtitle}</p>
                        ) : null}
                        <StatForgeLifecycleDiagram darkMode={darkMode} />
                    </div>
                ) : null}
            </div>

            <div
                style={{
                    maxWidth: '900px',
                    margin: heroLifecycle ? '2rem auto 0' : '2.5rem auto 0',
                    padding: '0 1.5rem'
                }}
            >
                <div
                    style={{
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                        boxShadow: darkMode ? '0 12px 36px rgba(0,0,0,0.35)' : '0 10px 32px rgba(15,23,42,0.07)'
                    }}
                >
                    <img
                        src={project.image}
                        alt={`${project.title} hero visual`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: isStatForge ? '340px' : '420px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    maxWidth: contentMax,
                    margin: '0 auto',
                    padding: '2.5rem 1.5rem 0'
                }}
            >
                {isStatForge ? (
                    <>
                        <Section title="What it is" darkMode={darkMode}>
                            <p style={{ margin: 0 }}>{cs.whatItIs}</p>
                        </Section>

                        <Section title="Problem it solves" darkMode={darkMode}>
                            <p style={{ margin: 0 }}>{cs.problem}</p>
                        </Section>

                        {Array.isArray(cs.differencePunchyLines) && cs.differencePunchyLines.length > 0 ? (
                            <StatForgeDifferenceBlock lines={cs.differencePunchyLines} quote={cs.pullQuote} darkMode={darkMode} tokens={t} />
                        ) : null}

                        <Section title="Architecture (high level)" darkMode={darkMode} contentWidth="column">
                            <p style={{ margin: '0 0 1.1rem', color: muted, fontSize: '0.98rem', lineHeight: 1.65, maxWidth: '42rem' }}>
                                Vertical flow: how synchronous reads and async writes move through the platform. The ASCII block below is the same boundary in compact form.
                            </p>
                            <SystemFlowDiagram darkMode={darkMode} />
                            <p style={{ margin: '1rem 0 0.45rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted }}>
                                System boundary (simplified)
                            </p>
                            <pre
                                style={{
                                    margin: 0,
                                    padding: '0.85rem 0.75rem',
                                    borderRadius: '10px',
                                    background: darkMode ? 'rgba(2, 6, 23, 0.75)' : '#f1f5f9',
                                    color: darkMode ? '#e8edf4' : '#475569',
                                    fontSize: '0.74rem',
                                    lineHeight: 1.45,
                                    overflow: 'auto',
                                    border: darkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
                                    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
                                    opacity: 1
                                }}
                            >
                                {cs.architecture}
                            </pre>
                        </Section>

                        <Section title="Stack & integration points" darkMode={darkMode}>
                            <p style={{ margin: '0 0 1rem' }}>{cs.stackNotes}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        style={{
                                            padding: '0.32rem 0.62rem',
                                            borderRadius: '8px',
                                            background: darkMode ? '#334155' : '#e2e8f0',
                                            color: darkMode ? '#e2e8f0' : '#1e293b',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            border: darkMode ? '1px solid #475569' : '1px solid #cbd5e1',
                                            lineHeight: 1.35,
                                            maxWidth: '100%'
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Section>

                        {Array.isArray(cs.personalBuildCards) && cs.personalBuildCards.length > 0 ? (
                            <PersonalBuildCards cards={cs.personalBuildCards} darkMode={darkMode} />
                        ) : (
                            <Section title="What I personally built" darkMode={darkMode}>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                    {cs.personalBuild.map((line) => (
                                        <li key={line} style={{ marginBottom: '0.65rem' }}>
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                        )}

                        <Section title="What made it technically hard" darkMode={darkMode}>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                {cs.technicalChallenges.map((line) => (
                                    <li key={line} style={{ marginBottom: '0.65rem' }}>
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    </>
                ) : (
                    <>
                        <Section title="What it is" darkMode={darkMode}>
                            <p style={{ margin: 0 }}>{cs.whatItIs}</p>
                        </Section>

                        <Section title="Problem it solves" darkMode={darkMode}>
                            <p style={{ margin: 0 }}>{cs.problem}</p>
                        </Section>

                        {Array.isArray(cs.whatMakesItDifferent) && cs.whatMakesItDifferent.length > 0 ? (
                            <Section title="What makes it different" darkMode={darkMode}>
                                {cs.whatMakesItDifferent.map((paragraph, i) => (
                                    <p key={`diff-${i}`} style={{ margin: i === cs.whatMakesItDifferent.length - 1 ? 0 : '0 0 1rem' }}>
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

                        <Section title="Architecture (high level)" darkMode={darkMode} contentWidth="column">
                            <p style={{ margin: '0 0 1rem', color: muted, fontSize: '0.95rem', maxWidth: '42rem' }}>
                                {cs.showStatForgeLifecycle ? (
                                    <>
                                        Two views: the lifecycle above is how noisy inputs become a verified record. The schematic below is how clients and workers touch the
                                        platform (read path vs async work). Diagrams are intentionally schematic; swap in your own from Excalidraw, Mermaid, or cloud consoles when
                                        you have exports.
                                    </>
                                ) : (
                                    <>
                                        Diagrams are intentionally schematic. Swap in your own when you have exports from Excalidraw, Mermaid, or cloud consoles.
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
                    </>
                )}

                {showScreenshots ? (
                    <Section title="Screenshots & visuals" darkMode={darkMode}>
                        <p style={{ margin: '0 0 1rem', color: muted }}>
                            Captures from the public product or related surfaces referenced in this write-up.
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
                                    <img
                                        src={src}
                                        alt={`${project.title} screenshot ${i + 1}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: 'min(560px, 78vh)',
                                            objectFit: 'contain',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Section>
                ) : null}

                <Section title="Links" darkMode={darkMode} noBorder>
                    {cs.links?.length ? (
                        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {cs.links.map((l) => (
                                <li key={l.href} style={{ marginBottom: '0.5rem' }}>
                                    <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, fontWeight: 600 }}>
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
