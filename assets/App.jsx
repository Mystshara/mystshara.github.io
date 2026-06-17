import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Resume from './components/Resume';
import DarkModeToggle from './components/DarkModeToggle';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import CaseStudyPage from './components/CaseStudyPage';
import HeroSystemDiagram from './components/HeroSystemDiagram';
import BuiltProofSection from './components/BuiltProofSection';
import HostingMigrationNotice from './components/HostingMigrationNotice';
import { PortfolioThemeContext } from './themeContext';
import { consoleTokens } from './consoleTheme';

function scrollToSystems() {
    document.getElementById('systems-built')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function HeroSection({ darkMode }) {
    const t = consoleTokens(darkMode);

    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{
                position: 'relative',
                padding: '6.5rem 0 0',
                maxWidth: '1200px',
                margin: '0 auto',
                overflow: 'hidden'
            }}
        >
            <div className="hero-split" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'left' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(1.45rem, 3.6vw, 2.25rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.05,
                            color: t.textPrimary,
                            margin: '0 0 1rem'
                        }}
                    >
                        I build data and infrastructure systems that move work from input to validation, automation, review,
                        and reliable output.
                    </h1>
                    <p
                        style={{
                            fontSize: '1.05rem',
                            color: t.textSecondary,
                            margin: '0 0 0.5rem',
                            fontWeight: 700,
                            letterSpacing: '0.02em'
                        }}
                    >
                        Rebecca Turner
                    </p>
                    <p
                        style={{
                            fontSize: '1.02rem',
                            lineHeight: 1.7,
                            color: t.textMuted,
                            margin: 0,
                            maxWidth: '560px'
                        }}
                    >
                        Systems and platform engineer working across APIs, databases, queues, workers, dashboards, and
                        infrastructure automation.
                    </p>
                    <div
                        className="hero-cta-row"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                            marginTop: '1.75rem',
                            alignItems: 'center'
                        }}
                    >
                        <motion.button
                            type="button"
                            onClick={scrollToSystems}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '0.85rem 1.45rem',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : t.borderSubtle}`,
                                background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.92)',
                                backdropFilter: darkMode ? 'blur(10px)' : undefined,
                                WebkitBackdropFilter: darkMode ? 'blur(10px)' : undefined,
                                boxShadow: darkMode ? 'none' : '0 4px 20px rgba(15, 23, 42, 0.06)',
                                color: t.textPrimary,
                                fontFamily: 'inherit',
                                transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                            }}
                        >
                            View systems
                        </motion.button>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to="/work/statforge"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.85rem 1.45rem',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#F8FAFC',
                                    background: t.accent,
                                    border: `1px solid rgba(${t.accentRgb}, 0.28)`,
                                    boxShadow: t.shadowButtonPrimary,
                                    transition: 'box-shadow 0.25s ease'
                                }}
                            >
                                View StatForge
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <HeroSystemDiagram darkMode={darkMode} />
            </div>
        </motion.header>
    );
}

function HomePage({ darkMode }) {
    const t = consoleTokens(darkMode);
    const gutter = 'clamp(1rem, 4vw, 1.5rem)';

    return (
        <div style={{ background: t.bgDeep, minHeight: '100vh', color: t.textPrimary }}>
            <section style={{ background: t.heroAmbient, padding: `0 ${gutter} clamp(3rem, 6vw, 4.5rem)` }}>
                <HeroSection darkMode={darkMode} />
            </section>

            <section id="proof-built" style={{ background: t.sectionProof, padding: `clamp(3.5rem, 7vw, 5rem) ${gutter}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <BuiltProofSection darkMode={darkMode} />
                </div>
            </section>

            <section style={{ background: t.sectionAbout, padding: `clamp(4rem, 8vw, 5.5rem) ${gutter}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <About darkMode={darkMode} />
                </div>
            </section>

            <ProjectsSection />

            <section style={{ background: t.bgDeep, padding: `0 ${gutter} clamp(4rem, 10vw, 6rem)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Resume darkMode={darkMode} />
                </div>
            </section>
        </div>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => setDarkMode((d) => !d);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : 'light';
    }, [darkMode]);

    const t = consoleTokens(darkMode);

    return (
        <PortfolioThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div
                style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    minHeight: '100vh',
                    background: t.bgDeep,
                    color: t.textPrimary,
                    position: 'relative'
                }}
            >
                <HostingMigrationNotice />

                <div
                    style={{
                        position: 'fixed',
                        top: '0.85rem',
                        right: 'clamp(1rem, 4vw, 2rem)',
                        zIndex: 1200
                    }}
                >
                    <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>

                <Routes>
                    <Route path="/" element={<HomePage darkMode={darkMode} />} />
                    <Route path="/work/:slug" element={<CaseStudyPage />} />
                </Routes>
            </div>
        </PortfolioThemeContext.Provider>
    );
}

export default App;
