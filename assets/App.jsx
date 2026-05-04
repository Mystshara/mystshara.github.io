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
import { PortfolioThemeContext } from './themeContext';

function scrollToSystems() {
    document.getElementById('systems-built')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function HeroSection({ darkMode }) {
    const muted = darkMode ? '#94a3b8' : '#64748b';
    const heading = darkMode ? '#f8fafc' : '#0f172a';
    const nameColor = darkMode ? '#cbd5e1' : '#475569';

    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{
                position: 'relative',
                padding: '6.5rem 1.5rem 0',
                maxWidth: '1200px',
                margin: '0 auto',
                overflow: 'hidden'
            }}
        >
            {darkMode ? (
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: '-40% -20% auto -20%',
                        height: '70%',
                        background:
                            'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.35) 0%, rgba(56,189,248,0.12) 42%, transparent 70%)',
                        pointerEvents: 'none'
                    }}
                />
            ) : null}

            <div className="hero-split" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'left' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(1.45rem, 3.6vw, 2.25rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.035em',
                            lineHeight: 1.18,
                            color: heading,
                            margin: '0 0 1rem'
                        }}
                    >
                        I build production systems from Kubernetes infrastructure through SaaS platforms to security
                        automation.
                    </h1>
                    <p
                        style={{
                            fontSize: '1.05rem',
                            color: nameColor,
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
                            lineHeight: 1.65,
                            color: muted,
                            margin: 0,
                            maxWidth: '560px'
                        }}
                    >
                        Systems and platform engineer, shipping automation, infrastructure, and product surfaces that have
                        to survive real traffic, real users, and real incident response.
                    </p>
                    <div
                        className="hero-cta-row"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.65rem',
                            marginTop: '1.5rem',
                            alignItems: 'center'
                        }}
                    >
                        <motion.button
                            type="button"
                            onClick={scrollToSystems}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '0.72rem 1.25rem',
                                borderRadius: '11px',
                                fontWeight: 700,
                                fontSize: '0.92rem',
                                cursor: 'pointer',
                                border: darkMode ? '1px solid rgba(148, 163, 184, 0.45)' : '1px solid #cbd5e1',
                                background: darkMode ? 'rgba(15, 23, 42, 0.65)' : '#ffffff',
                                color: darkMode ? '#e2e8f0' : '#0f172a',
                                fontFamily: 'inherit'
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
                                    padding: '0.72rem 1.25rem',
                                    borderRadius: '11px',
                                    fontWeight: 800,
                                    fontSize: '0.92rem',
                                    textDecoration: 'none',
                                    color: '#fff',
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                    border: '1px solid rgba(255,255,255,0.14)',
                                    boxShadow: darkMode
                                        ? '0 1px 2px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.3)'
                                        : '0 1px 2px rgba(15,23,42,0.08), 0 3px 10px rgba(15,23,42,0.1)'
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
    const pageBg = darkMode
        ? 'linear-gradient(180deg, #020617 0%, #0f172a 18%, #0f172a 55%, #111827 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 35%, #f1f5f9 100%)';

    return (
        <div style={{ background: pageBg, minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 0 1rem' }}>
                <HeroSection darkMode={darkMode} />
            </div>

            <div id="proof-built" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <BuiltProofSection darkMode={darkMode} />
            </div>

            <div style={{ padding: '0 1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <About darkMode={darkMode} />
            </div>

            <ProjectsSection />

            <div style={{ padding: '0 1.5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <Resume darkMode={darkMode} />
            </div>
        </div>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => setDarkMode((d) => !d);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : 'light';
    }, [darkMode]);

    const shellBg = darkMode ? '#0f172a' : '#ffffff';

    return (
        <PortfolioThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div
                style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    minHeight: '100vh',
                    background: shellBg,
                    color: darkMode ? '#f8fafc' : '#1e293b',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        zIndex: 1000
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
