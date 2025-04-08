import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Resume from './components/Resume';
import DarkModeToggle from './components/DarkModeToggle';
import About from './components/About';


// 🔧 Project Data
const projects = [
    {
        title: 'Bug Bounty Automation',
        description: 'A complete vulnerability discovery pipeline using Kubernetes, Terraform, and Vault.',
        link: 'https://github.com/Mystshara/ptaas-security-demo',
    },
    {
        title: 'PTaaS Security Demo',
        description: 'Public-facing breakdown of a modular security automation stack.',
        link: 'https://github.com/Mystshara/ptaas-security-demo',
    },
    {
        title: 'Web & Game Hosting Platform',
        description: 'Infrastructure setup for dynamic game server and web app provisioning using Proxmox + K8s.',
        link: 'https://github.com/Mystshara/web-game-hosting-demo',
    },
];

// 🎬 Framer Motion Animation Settings
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
        },
    }),
};

// 🎴 Projects Component
function Projects() {
    return (
        <section>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛠️ Featured Projects</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        className="card"
                        style={{
                            padding: '1.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        }}
                    >
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>{project.title}</h3>
                        <p style={{ margin: '0 0 1rem' }}>{project.description}</p>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#0077cc' }}
                        >
                            View Project →
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// 👩‍💻 App Component
function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // 🌓 Apply global dark/light mode class to <body>
    useEffect(() => {
        document.body.className = darkMode ? 'dark' : 'light';
    }, [darkMode]);

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* 🌗 Dark Mode Toggle */}
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* 👋 Hero Section */ }
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hi, I'm Rebecca Turner</h1>
                <h2 style={{ fontWeight: 'normal', color: darkMode ? '#ccc' : '#555' }}>
                    DevSecOps & Security Automation Engineer
                </h2>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                    I build secure, scalable infrastructure with a strong focus on automation, platform security, and DevOps best practices.
                </p>
            </header>

            {/* 💼 About Section */}
            <About />

            {/* 💼 Projects Section */}
            <Projects />

            {/* 📄 Resume Section */}
            <Resume />
        </div>
    );
}

export default App;
