import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/** Same logical path — carousel scrolls the inner track (not window). */
const STEPS = [
    { title: 'Client', detail: null },
    { title: 'NGINX / Ingress', detail: 'Controller' },
    { title: 'API service', detail: 'FastAPI / .NET · replicas' },
    { title: 'PostgreSQL', detail: 'Primary (OLTP reads)' },
    { title: 'Redis', detail: 'Celery broker' },
    { title: 'Worker pool', detail: 'Celery workers' },
    { title: 'PostgreSQL', detail: 'Async writes' }
];

function CarouselChevron({ darkMode, dir, disabled, label, onClick }) {
    const bg = darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255,255,255,0.98)';
    const border = darkMode ? '1px solid rgba(100, 116, 139, 0.95)' : '1px solid #e2e8f0';
    const color = disabled ? (darkMode ? '#64748b' : '#cbd5e1') : darkMode ? '#f8fafc' : '#0f172a';

    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault();
                if (!disabled) onClick();
            }}
            style={{
                flex: '0 0 auto',
                alignSelf: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '999px',
                border,
                background: bg,
                color,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '1.35rem',
                fontWeight: 700,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.4)' : '0 2px 12px rgba(15,23,42,0.1)',
                opacity: disabled ? 0.4 : 1,
                zIndex: 1
            }}
        >
            {dir === 'prev' ? '‹' : '›'}
        </button>
    );
}

/** Scroll so `card` is centered inside `scroller` (scrollIntoView is unreliable for nested overflow). */
function scrollCardToCenter(scroller, card) {
    if (!scroller || !card) return;
    const s = scroller.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const delta = c.left + c.width / 2 - (s.left + s.width / 2);
    scroller.scrollBy({ left: delta, behavior: 'smooth' });
}

export default function RequestPathStrip({ darkMode }) {
    const scrollerRef = useRef(null);
    const cardRefs = useRef([]);
    const suppressObserver = useRef(false);
    const [active, setActive] = useState(0);

    const cardBg = darkMode ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
    const border = darkMode ? '1px solid rgba(71, 85, 105, 0.95)' : '1px solid #e2e8f0';
    const titleC = darkMode ? '#f8fafc' : '#0f172a';
    const detailC = darkMode ? '#cbd5e1' : '#64748b';
    const arrow = darkMode ? '#94a3b8' : '#94a3b8';
    const dotActive = darkMode ? '#a5b4fc' : '#4f46e5';
    const dotIdle = darkMode ? '#475569' : '#cbd5e1';

    const goTo = useCallback((index) => {
        const i = Math.max(0, Math.min(STEPS.length - 1, index));
        setActive(i);
        const scroller = scrollerRef.current;
        const card = cardRefs.current[i];
        suppressObserver.current = true;
        requestAnimationFrame(() => {
            scrollCardToCenter(scroller, card);
            window.setTimeout(() => {
                suppressObserver.current = false;
            }, 450);
        });
    }, []);

    const atStart = active === 0;
    const atEnd = active === STEPS.length - 1;

    const prev = useCallback(() => {
        if (!atStart) goTo(active - 1);
    }, [active, atStart, goTo]);

    const next = useCallback(() => {
        if (!atEnd) goTo(active + 1);
    }, [active, atEnd, goTo]);

    useLayoutEffect(() => {
        const root = scrollerRef.current;
        if (!root) return undefined;

        const cards = STEPS.map((_, i) => cardRefs.current[i]).filter(Boolean);
        if (cards.length === 0) return undefined;

        const obs = new IntersectionObserver(
            (entries) => {
                if (suppressObserver.current) return;
                let best = -1;
                let bestRatio = 0;
                entries.forEach((en) => {
                    if (en.intersectionRatio > bestRatio) {
                        bestRatio = en.intersectionRatio;
                        const idx = cards.indexOf(en.target);
                        if (idx >= 0) best = idx;
                    }
                });
                if (best >= 0 && bestRatio > 0.25) setActive(best);
            },
            { root, threshold: [0.2, 0.4, 0.6, 0.8] }
        );

        cards.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    /* Initial center after layout (refs + flex widths ready) */
    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            const scroller = scrollerRef.current;
            const card = cardRefs.current[0];
            if (scroller && card) scrollCardToCenter(scroller, card);
        });
    }, []);

    /* Map vertical wheel (and dominant axis) to horizontal scroll while pointer is over the track */
    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return undefined;

        const onWheel = (e) => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (maxScroll <= 2) return;

            const dominantX = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = dominantX ? e.deltaX : e.deltaY;
            if (delta === 0) return;

            const before = el.scrollLeft;
            const next = Math.max(0, Math.min(maxScroll, before + delta));
            if (next !== before) {
                el.scrollLeft = next;
                e.preventDefault();
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', paddingBottom: '2rem' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '0.65rem',
                    width: '100%',
                    minHeight: '5.75rem'
                }}
            >
                <CarouselChevron darkMode={darkMode} dir="prev" disabled={atStart} label="Previous step" onClick={prev} />

                <div
                    ref={scrollerRef}
                    className="request-path-strip-scroll"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Production request path steps"
                    title="Scroll horizontally with the mouse wheel while hovered here"
                    style={{
                        flex: '1 1 auto',
                        minWidth: 0,
                        display: 'flex',
                        alignItems: 'stretch',
                        gap: '0.35rem',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        padding: '0.35rem 0.15rem 0.55rem',
                        scrollPaddingLeft: '0.5rem',
                        scrollPaddingRight: '0.5rem'
                    }}
                >
                    {STEPS.map((step, i) => (
                        <React.Fragment key={`step-${i}`}>
                            <div
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Step ${i + 1} of ${STEPS.length}: ${step.title}`}
                                aria-current={i === active ? 'true' : undefined}
                                style={{
                                    flex: '0 0 auto',
                                    scrollSnapAlign: 'center',
                                    minWidth: 'min(34vw, 180px)',
                                    maxWidth: '240px'
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.03 * i, duration: 0.3 }}
                                    style={{
                                        height: '100%',
                                        padding: '0.75rem 0.9rem',
                                        borderRadius: '12px',
                                        background: cardBg,
                                        border,
                                        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(15,23,42,0.06)'
                                    }}
                                >
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: titleC, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                        {step.title}
                                    </div>
                                    {step.detail ? (
                                        <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', fontWeight: 600, color: detailC, lineHeight: 1.4 }}>
                                            {step.detail}
                                        </div>
                                    ) : null}
                                </motion.div>
                            </div>
                        {i < STEPS.length - 1 ? (
                            <span
                                aria-hidden
                                style={{
                                    flex: '0 0 auto',
                                    alignSelf: 'center',
                                    color: arrow,
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    padding: '0 0.15rem',
                                    userSelect: 'none',
                                    scrollSnapAlign: 'center'
                                }}
                            >
                                →
                            </span>
                        ) : null}
                        </React.Fragment>
                    ))}
                </div>

                <CarouselChevron darkMode={darkMode} dir="next" disabled={atEnd} label="Next step" onClick={next} />
            </div>

            <div
                aria-label="Request path steps"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '0.75rem',
                    flexWrap: 'wrap'
                }}
            >
                {STEPS.map((_, i) => (
                    <button
                        key={`dot-${i}`}
                        type="button"
                        aria-label={`Go to step ${i + 1}`}
                        onClick={() => goTo(i)}
                        style={{
                            width: i === active ? '1.4rem' : '0.48rem',
                            height: '0.48rem',
                            borderRadius: '999px',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            background: i === active ? dotActive : dotIdle,
                            transition: 'width 0.2s ease, background 0.2s ease',
                            opacity: i === active ? 1 : 0.9
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
