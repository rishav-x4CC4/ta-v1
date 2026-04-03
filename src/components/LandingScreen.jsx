import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── accent colors per card for variety ── */
const ACCENTS = [
    { gradient: 'linear-gradient(135deg, #00f0ff, #0080ff)', glow: 'rgba(0,240,255,.35)', text: '#00f0ff' },
    { gradient: 'linear-gradient(135deg, #e8457a, #ff6b9d)', glow: 'rgba(232,69,122,.35)', text: '#e8457a' },
    { gradient: 'linear-gradient(135deg, #c9b08b, #e8d5b0)', glow: 'rgba(201,176,139,.35)', text: '#c9b08b' },
    { gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)', glow: 'rgba(168,85,247,.35)', text: '#a855f7' },
    { gradient: 'linear-gradient(135deg, #4285f4, #60a5fa)', glow: 'rgba(66,133,244,.35)', text: '#4285f4' },
    { gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', glow: 'rgba(245,158,11,.35)', text: '#f59e0b' },
    { gradient: 'linear-gradient(135deg, #10b981, #34d399)', glow: 'rgba(16,185,129,.35)', text: '#10b981' },
    { gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', glow: 'rgba(236,72,153,.35)', text: '#ec4899' },
    { gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)', glow: 'rgba(6,182,212,.35)', text: '#06b6d4' },
]

export default function LandingScreen({ onStart, onGoTo }) {
    const [hoveredIdx, setHoveredIdx] = useState(null)

    const levels = [
        { key: 'anatomy-explorer', icon: '🔬', num: '01', title: 'Anatomy Explorer', desc: 'Discover the building blocks of letterforms — baseline, x-height, ascenders, and more.' },
        { key: 'anatomy-quiz', icon: '🎯', num: '02', title: 'Anatomy Quiz', desc: 'Identify anatomy terms on an interactive letter diagram.' },
        { key: 'typeface-explorer', icon: '📖', num: '03', title: 'Typeface Explorer', desc: 'Learn the 5 typeface families — Serif, Sans-Serif, Script, Display, and Monospace.' },
        { key: 'font-sorting', icon: '🎮', num: '04', title: 'Font Sorting Game', desc: 'Sort real fonts into the correct typeface category. How many can you get right?' },
        { key: 'serif-vs-sans', icon: '⚖️', num: '05', title: 'Serif vs. Sans-Serif', desc: 'Compare history, readability, and real-world applications of the two fundamental typeface families.' },
        { key: 'font-psychology', icon: '🧠', num: '06', title: 'Psychology of Fonts', desc: 'Case study on how Times New Roman, Helvetica, and Comic Sans shape perception and behavior.' },
        { key: 'expressive-typography', icon: '🎭', num: '07', title: 'Expressive Typography', desc: 'See how typography can visually communicate joy, fear, anger, and more.' },
        { key: 'typography-poster', icon: '🖼️', num: '08', title: 'Typography Poster', desc: 'A designed A4 poster highlighting the importance of typography with visual hierarchy.' },
        { key: 'brand-analysis', icon: '🏢', num: '09', title: 'Brand Identity', desc: 'Analyze how brands use specific typefaces to reflect their identity and values.' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.07 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    }

    /* Animated text reveal for hero */
    const heroWords = ['Understanding', 'the', 'Essence', 'of', 'Typography']
    const wordVariants = {
        hidden: { opacity: 0, y: 40, rotateX: -60 },
        show: (i) => ({
            opacity: 1, y: 0, rotateX: 0,
            transition: { delay: 0.15 + i * 0.1, duration: 0.6, type: 'spring', stiffness: 120, damping: 14 }
        })
    }

    return (
        <div className="landing" style={{ padding: 0 }}>

            {/* ═══════════════════════════════════════════════
                HERO SECTION — full viewport, heading-focused
               ═══════════════════════════════════════════════ */}
            <div style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(24px, 4vw, 60px) clamp(16px, 4vw, 40px)',
                position: 'relative',
            }}>
            {/* ══ HERO TITLE — LARGE, word-by-word animated ══ */}
            <div style={{ width: '100%', margin: '0 0 24px', perspective: 1200, pointerEvents: 'none' }}>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(10px, 2vw, 24px)',
                    fontFamily: "'Playfair Display', 'Lora', serif",
                    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                }}>
                    {heroWords.map((word, i) => (
                        <motion.span
                            key={word + i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="show"
                            whileHover={{ scale: 1.08, color: '#00f0ff', textShadow: '0 0 30px rgba(0,240,255,.6)' }}
                            style={{
                                display: 'inline-block',
                                color: word === 'Typography' ? '#00f0ff' : word === 'Essence' ? '#e8457a' : '#fff',
                                textShadow: word === 'Typography'
                                    ? '0 0 50px rgba(0,240,255,.5), 0 4px 20px rgba(0,0,0,.4)'
                                    : word === 'Essence'
                                        ? '0 0 40px rgba(232,69,122,.4), 0 4px 20px rgba(0,0,0,.4)'
                                        : '0 4px 20px rgba(0,0,0,.4)',
                                cursor: 'default',
                                pointerEvents: 'auto',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Animated underline */}
            <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                style={{
                    width: 'clamp(150px, 40vw, 400px)', height: 3, marginBottom: 28,
                    background: 'linear-gradient(90deg, transparent, var(--accent-1), var(--accent-5), transparent)',
                    borderRadius: 2, transformOrigin: 'center',
                }}
            />

            <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                style={{ marginBottom: 12, position: 'relative', zIndex: 10, fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)', textAlign: 'center', maxWidth: 750 }}
            >
                {'An interactive exploration of typography fundamentals — anatomy, classification, and expression.'.split(' ').map((w, i) => (
                    <motion.span
                        key={i}
                        whileHover={{ color: '#00f0ff', scale: 1.1, textShadow: '0 0 10px rgba(0,240,255,.4)' }}
                        style={{ display: 'inline-block', marginRight: '0.3em', cursor: 'default' }}
                    >{w}</motion.span>
                ))}
            </motion.p>
                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}
                >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll to explore</span>
                    <span style={{ fontSize: '1.5rem' }}>↓</span>
                </motion.div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTIONS GRID — appears after scroll
               ═══════════════════════════════════════════════ */}
            <div style={{
                padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 40px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>

            {/* ══ SECTION HEADING for the grid ══ */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: 48, textAlign: 'center' }}
            >
                <h2 style={{
                    fontFamily: "'Playfair Display', 'Lora', serif",
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 800, color: '#fff', margin: '0 0 10px',
                    letterSpacing: '-.02em',
                }}>
                    {'Explore'.split('').map((ch, i) => (
                        <motion.span key={i} whileHover={{ color: '#00f0ff', scale: 1.2, textShadow: '0 0 12px rgba(0,240,255,.5)' }} style={{ display: 'inline-block', cursor: 'default' }}>{ch}</motion.span>
                    ))}
                    {' '}<motion.span whileHover={{ scale: 1.3, rotate: 15 }} style={{ display: 'inline-block', color: 'var(--accent-1)', cursor: 'default' }}>9</motion.span>{' '}
                    {'Interactive'.split('').map((ch, i) => (
                        <motion.span key={i} whileHover={{ color: '#e8457a', scale: 1.2, textShadow: '0 0 12px rgba(232,69,122,.5)' }} style={{ display: 'inline-block', cursor: 'default' }}>{ch}</motion.span>
                    ))}
                    {' '}
                    {'Sections'.split('').map((ch, i) => (
                        <motion.span key={i} whileHover={{ color: '#c9b08b', scale: 1.2, textShadow: '0 0 12px rgba(201,176,139,.5)' }} style={{ display: 'inline-block', cursor: 'default' }}>{ch}</motion.span>
                    ))}
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 'clamp(.9rem, 2vw, 1.1rem)',
                    color: 'var(--text-muted)', margin: 0, animation: 'none',
                }}>
                    {'Click any card to jump directly, or start from the beginning'.split(' ').map((w, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ color: 'var(--text-secondary)', scale: 1.08 }}
                            style={{ display: 'inline-block', marginRight: '0.3em', cursor: 'default' }}
                        >{w}</motion.span>
                    ))}
                </p>
            </motion.div>

            {/* ══ FEATURE CARDS GRID ══ */}
            <motion.div
                    className="landing-features"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                >
                {levels.map((l, i) => {
                    const accent = ACCENTS[i]
                    const isHovered = hoveredIdx === i
                    return (
                        <motion.div
                            variants={itemVariants}
                            key={l.key}
                            className="feature-card"
                            onClick={() => onGoTo(l.key)}
                            onHoverStart={() => setHoveredIdx(i)}
                            onHoverEnd={() => setHoveredIdx(null)}
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                borderColor: isHovered ? accent.text : undefined,
                            }}
                            whileHover={{ scale: 1.04, y: -8, boxShadow: `0 16px 40px ${accent.glow}` }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Glow orb on hover */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            position: 'absolute', top: '-30%', right: '-20%',
                                            width: 200, height: 200,
                                            background: accent.gradient, filter: 'blur(60px)',
                                            borderRadius: '50%', pointerEvents: 'none', opacity: 0.2,
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Number badge */}
                            <span style={{
                                position: 'absolute', top: 18, right: 22,
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                                fontWeight: 900, lineHeight: 1,
                                background: accent.gradient,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                opacity: isHovered ? 0.35 : 0.1,
                                transition: 'opacity .3s ease',
                                pointerEvents: 'none',
                            }}>
                                {l.num}
                            </span>

                            {/* Icon with colored bg */}
                            <motion.span
                                animate={isHovered ? { scale: 1.2, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                                    marginBottom: 18, display: 'block',
                                    position: 'relative', zIndex: 1,
                                }}
                            >
                                {l.icon}
                            </motion.span>

                            {/* Title — EMPHASIZED */}
                            <h3 style={{
                                fontFamily: "'Playfair Display', 'Lora', serif",
                                fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                                fontWeight: 800, marginBottom: 8,
                                color: isHovered ? accent.text : 'var(--text-primary)',
                                transition: 'color .3s ease',
                                position: 'relative', zIndex: 1,
                                letterSpacing: '-.01em',
                            }}>
                                {l.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: 'clamp(.82rem, 1.5vw, .92rem)',
                                color: 'rgba(255,255,255,.7)', margin: 0,
                                lineHeight: 1.55, position: 'relative', zIndex: 1,
                            }}>
                                {l.desc}
                            </p>

                            {/* Bottom accent bar on hover */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    height: 3, background: accent.gradient,
                                    transformOrigin: 'left',
                                }}
                            />
                        </motion.div>
                    )
                })}
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,240,255,.3)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={onStart}
                style={{ marginTop: 48, padding: '18px 56px', fontSize: '1.15rem', fontWeight: 700 }}
            >
                Start Learning →
            </motion.button>
            </div>
        </div>
    )
}
