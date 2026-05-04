import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORK_PROJECTS, BADGE_STYLES } from '../data/workProjects';
import { usePortfolioTheme } from '../themeContext';

const MotionLink = motion(Link);

/** Card / button elevation only — no colored outer glow (reads cleaner). */
function neutralElevation(darkMode) {
    return {
        standardRest: darkMode ? '0 10px 28px rgba(0,0,0,0.28)' : '0 8px 22px rgba(15,23,42,0.06)',
        featuredRest: darkMode
            ? '0 0 0 1px rgba(255,255,255,0.06), 0 22px 56px rgba(0,0,0,0.5)'
            : '0 14px 38px rgba(15,23,42,0.1)',
        featuredHover: darkMode
            ? '0 0 0 1px rgba(255,255,255,0.08), 0 26px 60px rgba(0,0,0,0.55)'
            : '0 18px 44px rgba(15,23,42,0.12)',
        standardHover: darkMode
            ? '0 14px 34px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 12px 30px rgba(15,23,42,0.09)'
    };
}

function primaryButtonShadow(darkMode) {
    return darkMode
        ? '0 1px 2px rgba(0,0,0,0.45), 0 3px 10px rgba(0,0,0,0.3)'
        : '0 1px 2px rgba(15,23,42,0.06), 0 3px 10px rgba(15,23,42,0.1)';
}

/** Per-project accent on borders and fills — shadows stay neutral. */
function projectVisual(slug, darkMode) {
    const E = neutralElevation(darkMode);
    const themes = {
        statforge: {
            heroOverlay: 'linear-gradient(135deg, rgba(124,58,237,0.52) 0%, rgba(59,130,246,0.45) 100%)',
            borderFeatured: darkMode ? '1px solid rgba(167, 139, 250, 0.5)' : '1px solid rgba(99, 102, 241, 0.35)',
            borderStandard: darkMode ? '1px solid rgba(129, 140, 248, 0.32)' : '1px solid rgba(199, 210, 254, 0.95)',
            featuredShadow: E.featuredRest,
            standardShadow: E.standardRest,
            cardBgFeatured: darkMode
                ? 'linear-gradient(165deg, rgba(55,35,88,0.98) 0%, rgba(15,23,42,0.93) 52%, rgba(2,6,23,0.97) 100%)'
                : 'linear-gradient(165deg, #faf5ff 0%, #ffffff 48%, #f8fafc 100%)',
            cardBgStandard: darkMode
                ? 'linear-gradient(168deg, rgba(30,41,59,0.78) 0%, rgba(15,23,42,0.92) 100%)'
                : 'linear-gradient(168deg, #ffffff 0%, #f5f3ff 100%)',
            caseStudyGradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            hoverFeatured: E.featuredHover,
            hoverStandard: E.standardHover
        },
        'fiber-hosting': {
            heroOverlay: 'linear-gradient(135deg, rgba(51,65,85,0.78) 0%, rgba(14,165,233,0.42) 100%)',
            borderFeatured: darkMode ? '1px solid rgba(56, 189, 248, 0.42)' : '1px solid rgba(14, 116, 144, 0.35)',
            borderStandard: darkMode ? '1px solid rgba(100, 116, 139, 0.55)' : '1px solid rgba(148, 163, 184, 0.65)',
            featuredShadow: E.featuredRest,
            standardShadow: E.standardRest,
            cardBgFeatured: darkMode
                ? 'linear-gradient(165deg, rgba(30,45,58,0.98) 0%, rgba(15,23,42,0.93) 52%, rgba(2,6,23,0.96) 100%)'
                : 'linear-gradient(165deg, #f0f9ff 0%, #ffffff 50%, #f8fafc 100%)',
            cardBgStandard: darkMode
                ? 'linear-gradient(168deg, rgba(30,41,59,0.72) 0%, rgba(15,23,42,0.94) 100%)'
                : 'linear-gradient(168deg, #f8fafc 0%, #ecfeff 100%)',
            caseStudyGradient: 'linear-gradient(135deg, #0e7490 0%, #334155 100%)',
            hoverFeatured: E.featuredHover,
            hoverStandard: E.standardHover
        },
        'ai-lead-generation': {
            heroOverlay: 'linear-gradient(135deg, rgba(5,150,105,0.55) 0%, rgba(217,119,6,0.42) 100%)',
            borderFeatured: darkMode ? '1px solid rgba(52, 211, 153, 0.45)' : '1px solid rgba(5, 150, 105, 0.35)',
            borderStandard: darkMode ? '1px solid rgba(245, 158, 11, 0.28)' : '1px solid rgba(251, 191, 36, 0.55)',
            featuredShadow: E.featuredRest,
            standardShadow: E.standardRest,
            cardBgFeatured: darkMode
                ? 'linear-gradient(165deg, rgba(25,55,42,0.98) 0%, rgba(15,23,42,0.93) 52%, rgba(2,6,23,0.96) 100%)'
                : 'linear-gradient(165deg, #ecfdf5 0%, #ffffff 50%, #fffbeb 100%)',
            cardBgStandard: darkMode
                ? 'linear-gradient(168deg, rgba(20,45,35,0.55) 0%, rgba(15,23,42,0.92) 100%)'
                : 'linear-gradient(168deg, #ffffff 0%, #ecfdf5 100%)',
            caseStudyGradient: 'linear-gradient(135deg, #059669 0%, #b45309 100%)',
            hoverFeatured: E.featuredHover,
            hoverStandard: E.standardHover
        },
        'security-automation-platform': {
            heroOverlay: 'linear-gradient(135deg, rgba(220,38,38,0.42) 0%, rgba(124,58,237,0.48) 100%)',
            borderFeatured: darkMode ? '1px solid rgba(248, 113, 113, 0.42)' : '1px solid rgba(190, 24, 93, 0.32)',
            borderStandard: darkMode ? '1px solid rgba(192, 132, 252, 0.35)' : '1px solid rgba(167, 139, 250, 0.45)',
            featuredShadow: E.featuredRest,
            standardShadow: E.standardRest,
            cardBgFeatured: darkMode
                ? 'linear-gradient(165deg, rgba(60,25,40,0.98) 0%, rgba(15,23,42,0.93) 52%, rgba(2,6,23,0.96) 100%)'
                : 'linear-gradient(165deg, #fff1f2 0%, #ffffff 50%, #faf5ff 100%)',
            cardBgStandard: darkMode
                ? 'linear-gradient(168deg, rgba(50,20,35,0.5) 0%, rgba(15,23,42,0.94) 100%)'
                : 'linear-gradient(168deg, #fffbeb 0%, #faf5ff 100%)',
            caseStudyGradient: 'linear-gradient(135deg, #be123c 0%, #7c3aed 100%)',
            hoverFeatured: E.featuredHover,
            hoverStandard: E.standardHover
        }
    };
    return themes[slug] ?? themes.statforge;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } }
};

function cardVariants(delay = 0) {
    return {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay, type: 'spring', stiffness: 120, damping: 20 }
        }
    };
}

function ProjectCard({ project, featured, darkMode, animDelay = 0 }) {
    const visual = projectVisual(project.slug, darkMode);
    const badge = BADGE_STYLES[project.proofBadge] ?? BADGE_STYLES['Case Study'];
    const imgH = featured ? 300 : 210;
    const titleSize = featured ? '1.85rem' : '1.45rem';
    /* Type A (featured): deep tinted shell. Type B (standard): lighter body, less chrome. */
    const cardBg = featured ? visual.cardBgFeatured : visual.cardBgStandard;
    const border = featured ? visual.borderFeatured : visual.borderStandard;
    const titleColor = darkMode ? '#f8fafc' : '#0f172a';
    const subColor = darkMode ? '#94a3b8' : '#64748b';
    const bodyColor = darkMode ? '#e2e8f0' : '#475569';
    const chipBg = darkMode ? 'rgba(51, 65, 85, 0.85)' : '#f1f5f9';
    const chipBorder = darkMode ? '#475569' : '#e2e8f0';
    const heroBg = project.image ? `${visual.heroOverlay}, url(${project.image})` : visual.heroOverlay;

    const heroTop = (
        <>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: heroBg,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top'
                }}
            />
            <span
                style={{
                    position: 'absolute',
                    top: '1.1rem',
                    left: '1.1rem',
                    zIndex: 2,
                    fontSize: featured ? '3rem' : '2.35rem',
                    filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.4))'
                }}
            >
                {project.icon}
            </span>
            <div
                style={{
                    position: 'absolute',
                    top: '1.1rem',
                    right: '1.1rem',
                    zIndex: 2,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: badge.bg,
                    color: badge.fg,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
                }}
            >
                {project.proofBadge}
            </div>
            {featured ? (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        zIndex: 2,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '10px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        background: 'rgba(0,0,0,0.45)',
                        color: '#e0e7ff',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    Flagship platform
                </div>
            ) : null}
            {project.demoLink ? (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        zIndex: 2,
                        padding: '0.4rem 0.85rem',
                        borderRadius: '10px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        background: 'rgba(15, 23, 42, 0.72)',
                        color: '#f8fafc',
                        border: '1px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
                    }}
                >
                    Open live site →
                </div>
            ) : null}
        </>
    );

    return (
        <motion.article
            variants={cardVariants(animDelay)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: featured ? '22px' : '18px',
                background: cardBg,
                border,
                overflow: 'hidden',
                boxShadow: featured ? visual.featuredShadow : visual.standardShadow
            }}
            whileHover={{
                y: featured ? -6 : -4,
                boxShadow: featured ? visual.hoverFeatured : visual.hoverStandard
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
            {project.demoLink ? (
                <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ filter: 'brightness(1.08)' }}
                    whileTap={{ scale: 0.995 }}
                    style={{
                        position: 'relative',
                        display: 'block',
                        minHeight: imgH,
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                    }}
                >
                    {heroTop}
                </motion.a>
            ) : (
                <div style={{ position: 'relative', minHeight: imgH }}>{heroTop}</div>
            )}

            <div style={{ padding: featured ? '2rem 2.35rem 1.75rem' : '1.5rem 1.75rem 1.35rem' }}>
                <h3
                    style={{
                        margin: '0 0 0.35rem',
                        fontSize: titleSize,
                        fontWeight: 800,
                        color: titleColor,
                        letterSpacing: '-0.02em'
                    }}
                >
                    {project.title}
                </h3>
                <div style={{ fontSize: '0.95rem', color: subColor, marginBottom: '0.85rem', fontWeight: 600 }}>{project.subtitle}</div>
                <p style={{ margin: '0 0 1.1rem', lineHeight: 1.65, fontSize: featured ? '1.05rem' : '0.95rem', color: bodyColor }}>
                    {project.description}
                </p>

                <div style={{ marginBottom: '1.15rem' }}>
                    <h4
                        style={{
                            fontSize: '0.72rem',
                            marginBottom: '0.5rem',
                            fontWeight: 800,
                            color: subColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Stack surface
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                style={{
                                    padding: '0.26rem 0.6rem',
                                    background: chipBg,
                                    color: titleColor,
                                    borderRadius: '8px',
                                    fontSize: '0.76rem',
                                    fontWeight: 600,
                                    border: `1px solid ${chipBorder}`
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    <MotionLink
                        to={`/work/${project.slug}`}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: featured ? '0.85rem 1.35rem' : '0.7rem 1.1rem',
                            borderRadius: '11px',
                            background: visual.caseStudyGradient,
                            color: 'white',
                            fontWeight: 800,
                            fontSize: featured ? '0.95rem' : '0.88rem',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.14)',
                            textDecoration: 'none',
                            textShadow: 'none',
                            boxShadow: primaryButtonShadow(darkMode)
                        }}
                    >
                        Read case study →
                    </MotionLink>
                    {project.demoLink ? (
                        <motion.a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '0.7rem 1.05rem',
                                borderRadius: '11px',
                                background: darkMode ? 'rgba(51,65,85,0.6)' : '#fff',
                                color: titleColor,
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '0.86rem',
                                border: darkMode ? '1px solid #64748b' : '1px solid #cbd5e1',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}
                        >
                            Live / demo
                        </motion.a>
                    ) : null}
                    {project.repoLink ? (
                        <motion.a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '0.7rem 1.05rem',
                                borderRadius: '11px',
                                background: 'transparent',
                                color: subColor,
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '0.86rem',
                                border: darkMode ? '1px solid #64748b' : '1px solid #cbd5e1',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}
                        >
                            GitHub
                        </motion.a>
                    ) : null}
                </div>
            </div>
        </motion.article>
    );
}

export default function ProjectsSection() {
    const { darkMode } = usePortfolioTheme();
    const featured = WORK_PROJECTS.find((p) => p.featured) ?? WORK_PROJECTS[0];
    const others = WORK_PROJECTS.filter((p) => p.slug !== featured.slug);

    const sectionBg = darkMode
        ? 'linear-gradient(180deg, #111827 0%, #1e293b 40%, #172554 100%)'
        : 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 45%, #ffffff 100%)';

    const heading = darkMode ? '#f8fafc' : '#0f172a';
    const sub = darkMode ? '#94a3b8' : '#64748b';

    return (
        <motion.section
            id="systems-built"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={{ padding: '5rem 1.25rem 5.5rem', background: sectionBg }}
        >
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3.1rem)',
                        marginBottom: '0.65rem',
                        color: heading,
                        textAlign: 'center',
                        fontWeight: 800,
                        letterSpacing: '-0.04em'
                    }}
                >
                    Systems I&apos;ve built
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.06 }}
                    style={{
                        fontSize: '1.08rem',
                        textAlign: 'center',
                        marginBottom: '2.5rem',
                        color: sub,
                        maxWidth: '720px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.65
                    }}
                >
                    Each entry is a case study: what the system is, what problem it solves, how it is architected, what I
                    shipped personally, and where it got hard. Not a repo dump.
                </motion.p>

                <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                        <ProjectCard project={featured} featured darkMode={darkMode} animDelay={0} />
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.25rem'
                        }}
                    >
                        {others.map((project, i) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                featured={false}
                                darkMode={darkMode}
                                animDelay={0.08 + i * 0.07}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
