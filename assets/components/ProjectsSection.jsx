import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORK_PROJECTS } from '../data/workProjects';
import { usePortfolioTheme } from '../themeContext';
import { consoleTokens, proofBadgeStyle } from '../consoleTheme';

const MotionLink = motion(Link);

function cardElevation(tokens, darkMode, featured) {
    if (darkMode) {
        return {
            rest: featured
                ? `0 12px 40px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.04)`
                : `0 10px 32px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.03)`,
            hover: featured
                ? `0 22px 52px rgba(0,0,0,0.48), 0 0 48px rgba(${tokens.accentRgb}, 0.14)`
                : `0 18px 42px rgba(0,0,0,0.4), 0 0 36px rgba(${tokens.accentRgb}, 0.1)`
        };
    }
    return {
        rest: featured ? tokens.shadowCard : '0 8px 28px rgba(15,23,42,0.07)',
        hover: featured ? tokens.shadowAccent : '0 14px 38px rgba(15,23,42,0.11)'
    };
}

function projectSurfaces(tokens, darkMode, featured) {
    const E = cardElevation(tokens, darkMode, featured);
    const border = `1px solid ${tokens.borderSubtle}`;
    const cardBg = featured
        ? darkMode
            ? tokens.surface3
            : tokens.surface1
        : darkMode
          ? tokens.surface2
          : tokens.surface3;
    return {
        border,
        cardBg,
        shadowRest: E.rest,
        shadowHover: E.hover,
        caseStudyBtnBg: tokens.accent,
        caseStudyBtnBorder: `1px solid rgba(${tokens.accentRgb}, 0.42)`,
        caseStudyBtnColor: '#F8FAFC',
        primaryBtnShadow: darkMode
            ? `0 4px 18px rgba(${tokens.accentRgb}, 0.22), 0 2px 8px rgba(0,0,0,0.35)`
            : `0 6px 22px rgba(${tokens.accentRgb}, 0.28), 0 2px 8px rgba(15,23,42,0.06)`
    };
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
    const t = consoleTokens(darkMode);
    const visual = projectSurfaces(t, darkMode, featured);
    const badge = proofBadgeStyle(darkMode, t);
    const imgH = featured ? 326 : 218;
    const titleSize = featured ? '1.85rem' : '1.45rem';
    const titleColor = t.textPrimary;
    const subColor = t.textSecondary;
    const bodyColor = darkMode ? '#E2E8F0' : t.textSecondary;
    const chipBg = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(59, 130, 246, 0.06)';
    const chipBorder = darkMode ? 'rgba(255,255,255,0.08)' : `rgba(${t.accentRgb}, 0.18)`;
    const hasHeroImage = Boolean(project.image);
    const heroOverlayCss = hasHeroImage
        ? darkMode
            ? `linear-gradient(180deg, transparent 0%, transparent 28%, rgba(6, 8, 22, 0.15) 55%, rgba(6, 8, 22, 0.88) 100%), radial-gradient(ellipse 90% 60% at 75% 100%, rgba(${t.accentRgb}, 0.12), transparent 55%)`
            : `linear-gradient(180deg, transparent 0%, rgba(248,250,252,0.4) 100%)`
        : darkMode
          ? `linear-gradient(180deg, rgba(${t.accentRgb}, 0.07) 0%, rgba(6, 8, 22, 0.94) 100%)`
          : `linear-gradient(180deg, rgba(${t.accentRgb}, 0.06) 0%, #f8fafc 100%)`;

    const heroTop = (
        <>
            {hasHeroImage ? (
                <img
                    src={project.image}
                    alt=""
                    role="presentation"
                    decoding="async"
                    loading={featured ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.removeAttribute('src');
                        e.currentTarget.style.display = 'none';
                    }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block'
                    }}
                />
            ) : null}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: heroOverlayCss,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            {!hasHeroImage ? (
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
            ) : null}
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
                    ...badge,
                    boxShadow: darkMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 6px 18px rgba(15,23,42,0.08)'
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
                        background: 'rgba(0,0,0,0.5)',
                        color: '#E5E7EB',
                        border: `1px solid rgba(${t.accentRgb}, 0.2)`
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
                        background: darkMode ? 'rgba(6, 8, 22, 0.75)' : 'rgba(255,255,255,0.92)',
                        color: titleColor,
                        border: `1px solid rgba(${t.accentRgb}, 0.22)`,
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                    }}
                >
                    Open live site →
                </div>
            ) : null}
        </>
    );

    const ghostBtn = {
        padding: '0.7rem 1.05rem',
        borderRadius: '11px',
        fontWeight: 700,
        fontSize: '0.86rem',
        textDecoration: 'none',
        border: `1px solid ${t.borderSubtle}`,
        background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.92)',
        color: titleColor,
        backdropFilter: darkMode ? 'blur(8px)' : undefined,
        WebkitBackdropFilter: darkMode ? 'blur(8px)' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
    };

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
                background: visual.cardBg,
                border: visual.border,
                overflow: 'hidden',
                boxShadow: visual.shadowRest
            }}
            whileHover={{
                y: featured ? -5 : -4,
                border: `1px solid rgba(${t.accentRgb}, ${darkMode ? 0.32 : 0.35})`,
                boxShadow: visual.shadowHover
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
            {project.demoLink ? (
                <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ filter: 'brightness(1.06)' }}
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
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15
                    }}
                >
                    {project.title}
                </h3>
                <div style={{ fontSize: '0.95rem', color: subColor, marginBottom: '0.85rem', fontWeight: 600 }}>
                    {project.subtitle}
                </div>
                <p
                    style={{
                        margin: '0 0 1.1rem',
                        lineHeight: 1.7,
                        fontSize: featured ? '1.05rem' : '0.95rem',
                        color: bodyColor
                    }}
                >
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
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
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
                            padding: featured ? '0.85rem 1.35rem' : '0.72rem 1.15rem',
                            borderRadius: '11px',
                            background: visual.caseStudyBtnBg,
                            color: visual.caseStudyBtnColor,
                            fontWeight: 800,
                            fontSize: featured ? '0.95rem' : '0.88rem',
                            cursor: 'pointer',
                            border: visual.caseStudyBtnBorder,
                            textDecoration: 'none',
                            boxShadow: visual.primaryBtnShadow,
                            transition: 'box-shadow 0.25s ease'
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
                            style={{ ...ghostBtn }}
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
                                ...ghostBtn,
                                background: 'transparent',
                                color: subColor
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
    const t = consoleTokens(darkMode);
    const featured = WORK_PROJECTS.find((p) => p.featured) ?? WORK_PROJECTS[0];
    const others = WORK_PROJECTS.filter((p) => p.slug !== featured.slug);
    const gutter = 'clamp(1.25rem, 4vw, 2rem)';

    return (
        <motion.section
            id="systems-built"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={{
                padding: `clamp(5rem, 10vw, 6.25rem) ${gutter} clamp(5.5rem, 11vw, 7rem)`,
                background: t.sectionSystems
            }}
        >
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3.1rem)',
                        marginBottom: '0.85rem',
                        color: t.textPrimary,
                        textAlign: 'center',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05
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
                        marginBottom: '2.75rem',
                        color: t.textMuted,
                        maxWidth: '720px',
                        margin: '0 auto 2.75rem',
                        lineHeight: 1.7
                    }}
                >
                    Each entry is a case study: what the system is, what problem it solves, how it is architected, what I
                    shipped personally, and where it got hard. Not a repo dump.
                </motion.p>

                <div>
                    <div style={{ marginBottom: '1.85rem' }}>
                        <ProjectCard project={featured} featured darkMode={darkMode} animDelay={0} />
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.35rem'
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
