import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverWords, HoverLetters } from './InteractiveHeader'

import appleLogo from '../assets/brands/apple.png'
import bmwLogo from '../assets/brands/bmw.png'
import githubLogo from '../assets/brands/github.png'
import harvardLogo from '../assets/brands/harvard.png'
import ibmLogo from '../assets/brands/ibm.png'
import nikeLogo from '../assets/brands/nike.png'
import usGovLogo from '../assets/brands/us-gov.png'

/* -- Typeface personality data -- */
const FONTS = [
    {
        name: 'Times New Roman',
        family: "'Playfair Display', Georgia, serif",
        specimen: 'Aa',
        vibe: 'The Scholar',
        desc: 'Commissioned by The Times in 1931. Radiates authority, trust, and formality.',
        traits: { formality: 95, warmth: 28, modernity: 12, elegance: 70, playfulness: 5 },
        brands: [
            { name: 'The Times', bg: '#1a1a1a', color: '#e8d5b0', font: "'Playfair Display', serif", size: '1.3rem', weight: 700, url: 'https://www.thetimes.co.uk' },
            { name: 'HARVARD', bg: '#8c1515', color: '#fff', font: "'Inter', sans-serif", size: '1rem', weight: 800, ls: '.2em', img: harvardLogo, url: 'https://www.harvard.edu' },
            { name: 'U.S. GOV', bg: '#002147', color: '#c8a96e', font: "'Inter', sans-serif", size: '.9rem', weight: 700, ls: '.15em', img: usGovLogo, url: 'https://www.usa.gov' },
        ],
        era: '1931',
        gradient: 'linear-gradient(135deg, #3d2b1f 0%, #5c3d2e 100%)',
        accentColor: '#d4a276',
    },
    {
        name: 'Helvetica',
        family: "'Inter', 'Helvetica Neue', sans-serif",
        specimen: 'Ag',
        vibe: 'The Minimalist',
        desc: 'Max Miedinger, 1957. Near-perfect neutrality. Lets content speak for itself.',
        traits: { formality: 62, warmth: 43, modernity: 93, elegance: 55, playfulness: 20 },
        brands: [
            { name: 'Apple', bg: '#f5f5f7', color: '#1d1d1f', font: "'Inter', sans-serif", size: '1.4rem', weight: 500, img: appleLogo, url: 'https://www.apple.com' },
            { name: 'BMW', bg: '#fff', color: '#1c69d4', font: "'Inter', sans-serif", size: '1.2rem', weight: 800, ls: '.1em', img: bmwLogo, url: 'https://www.bmw.com' },
            { name: 'NYC Subway', bg: '#f5f5f5', color: '#1a1a1a', font: "'Inter', sans-serif", size: '.85rem', weight: 600, ls: '.12em', sub: 'MTA', url: 'https://new.mta.info' },
        ],
        era: '1957',
        gradient: 'linear-gradient(135deg, #2b2d42 0%, #3d405b 100%)',
        accentColor: '#8d99ae',
    },
    {
        name: 'Comic Sans',
        family: "'Dancing Script', cursive",
        specimen: 'Hi!',
        vibe: 'The Free Spirit',
        desc: 'Vincent Connare, 1994. Beloved and hated. Surprisingly great for dyslexic readers.',
        traits: { formality: 4, warmth: 92, modernity: 18, elegance: 8, playfulness: 98 },
        brands: [
            { name: "Kid's Party!", bg: '#ffe4e1', color: '#e74c6f', font: "'Dancing Script', cursive", size: '1.2rem', weight: 700 },
            { name: 'CERN', bg: '#003366', color: '#6cafe6', font: "'Inter', sans-serif", size: '1.3rem', weight: 800, sub: '2012 Higgs', url: 'https://home.cern' },
            { name: '☺ Friendly', bg: '#fff3cd', color: '#d4830a', font: "'Dancing Script', cursive", size: '1.1rem', weight: 600 },
        ],
        era: '1994',
        gradient: 'linear-gradient(135deg, #f4845f 0%, #e76f51 100%)',
        accentColor: '#ffd6a5',
    },
    {
        name: 'Futura',
        family: "'Montserrat', sans-serif",
        specimen: 'Rg',
        vibe: 'The Architect',
        desc: 'Paul Renner, 1927. Pure geometric forms. The typeface of ambition and movement.',
        traits: { formality: 55, warmth: 35, modernity: 88, elegance: 60, playfulness: 30 },
        brands: [
            { name: 'NIKE', bg: '#111', color: '#fff', font: "'Montserrat', sans-serif", size: '1.4rem', weight: 900, ls: '.15em', img: nikeLogo, invertLogo: true, url: 'https://www.nike.com' },
            { name: 'Supreme', bg: '#e31837', color: '#fff', font: "'Inter', sans-serif", size: '1.1rem', weight: 700, italic: true, url: 'https://www.supremenewyork.com' },
            { name: 'VW', bg: '#001e50', color: '#fff', font: "'Montserrat', sans-serif", size: '1.6rem', weight: 700, url: 'https://www.volkswagen.com' },
        ],
        era: '1927',
        gradient: 'linear-gradient(135deg, #264653 0%, #2a9d8f 100%)',
        accentColor: '#a8dadc',
    },
    {
        name: 'Garamond',
        family: "'Lora', 'Garamond', serif",
        specimen: 'Qu',
        vibe: 'The Poet',
        desc: 'Claude Garamond, 1530. One of the oldest typefaces. Timeless literary elegance.',
        traits: { formality: 82, warmth: 68, modernity: 8, elegance: 95, playfulness: 12 },
        brands: [
            { name: 'Apple', bg: '#f5f5f0', color: '#555', font: "'Lora', serif", size: '1.3rem', weight: 400, sub: '1984–2002', img: appleLogo, url: 'https://www.apple.com' },
            { name: 'PENGUIN', bg: '#f4820a', color: '#fff', font: "'Inter', sans-serif", size: '1rem', weight: 800, ls: '.1em', sub: 'Books', url: 'https://www.penguin.co.uk' },
            { name: 'A&F', bg: '#2c2c2c', color: '#c4a772', font: "'Lora', serif", size: '1.2rem', weight: 700, url: 'https://www.abercrombie.com' },
        ],
        era: '1530',
        gradient: 'linear-gradient(135deg, #6b4226 0%, #8b5e3c 100%)',
        accentColor: '#e6c9a8',
    },
    {
        name: 'Impact',
        family: "'Inter', 'Impact', sans-serif",
        specimen: 'HI',
        vibe: 'The Shouter',
        desc: 'Geoffrey Lee, 1965. Compressed, commanding, unapologetic. Born for headlines.',
        traits: { formality: 20, warmth: 15, modernity: 60, elegance: 10, playfulness: 45 },
        brands: [
            { name: 'WWE', bg: '#1a1a1a', color: '#c8102e', font: "'Inter', sans-serif", size: '1.5rem', weight: 900, ls: '.08em', url: 'https://www.wwe.com' },
            { name: 'MEMES', bg: '#fff', color: '#333', font: "'Inter', sans-serif", size: '1.1rem', weight: 900, sub: '🌐 Internet' },
            { name: 'EXTRA!', bg: '#1a1a1a', color: '#fff', font: "'Inter', sans-serif", size: '1.2rem', weight: 900, ls: '.05em', sub: 'Tabloids' },
        ],
        era: '1965',
        gradient: 'linear-gradient(135deg, #6d2840 0%, #8b3a50 100%)',
        accentColor: '#f4a0b0',
    },
    {
        name: 'Bodoni',
        family: "'Playfair Display', 'Bodoni MT', serif",
        specimen: 'Bd',
        vibe: 'The Diva',
        desc: 'Giambattista Bodoni, 1798. Extreme stroke contrast. The typeface of haute couture.',
        traits: { formality: 90, warmth: 40, modernity: 45, elegance: 98, playfulness: 5 },
        brands: [
            { name: 'VOGUE', bg: '#1a1a1a', color: '#fff', font: "'Playfair Display', serif", size: '1.5rem', weight: 700, ls: '.2em', url: 'https://www.vogue.com' },
            { name: 'ARMANI', bg: '#f5f5f0', color: '#1a1a1a', font: "'Inter', sans-serif", size: '1rem', weight: 300, ls: '.25em', url: 'https://www.armani.com' },
            { name: 'CK', bg: '#000', color: '#fff', font: "'Inter', sans-serif", size: '1.6rem', weight: 800, ls: '.15em', sub: 'Calvin Klein', url: 'https://www.calvinklein.com' },
        ],
        era: '1798',
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
        accentColor: '#c9b08b',
    },
    {
        name: 'Courier',
        family: "'Source Code Pro', 'Courier New', monospace",
        specimen: '> _',
        vibe: 'The Hacker',
        desc: 'Howard Kettler, 1955. The typewriter original. Every character, same width, same respect.',
        traits: { formality: 50, warmth: 10, modernity: 72, elegance: 15, playfulness: 25 },
        brands: [
            { name: 'IBM', bg: '#054ada', color: '#fff', font: "'Inter', sans-serif", size: '1.5rem', weight: 700, ls: '.15em', img: ibmLogo, url: 'https://www.ibm.com' },
            { name: 'GitHub', bg: '#0d1117', color: '#58a6ff', font: "'Source Code Pro', monospace", size: '1rem', weight: 600, img: githubLogo, invertLogo: true, url: 'https://github.com' },
            { name: 'SCREENPLAY', bg: '#faf8f0', color: '#333', font: "'Source Code Pro', monospace", size: '.85rem', weight: 500, sub: 'Courier 12pt' },
        ],
        era: '1955',
        gradient: 'linear-gradient(135deg, #1b2a3b 0%, #2c3e50 100%)',
        accentColor: '#7ec8e3',
    },
]

const TRAIT_LABELS = ['formality', 'warmth', 'modernity', 'elegance', 'playfulness']

/* -- Quiz data -- */
const QUIZ = [
    { q: 'Which font feels most "trustworthy" for a bank?', opts: ['Times New Roman', 'Comic Sans', 'Impact', 'Courier'], ans: 0, why: 'Times New Roman — authority and tradition signal trustworthiness in finance.' },
    { q: "Which font belongs on a children's birthday invitation?", opts: ['Garamond', 'Helvetica', 'Comic Sans', 'Bodoni'], ans: 2, why: 'Comic Sans — casual, rounded letterforms feel warm and approachable.' },
    { q: 'Which font feels most "modern tech company"?', opts: ['Bodoni', 'Helvetica', 'Impact', 'Courier'], ans: 1, why: 'Helvetica — clean neutrality is the language of modern tech identity.' },
    { q: 'Which font would a fashion magazine use for its logo?', opts: ['Impact', 'Courier', 'Bodoni', 'Comic Sans'], ans: 2, why: 'Bodoni — high contrast serifs signal luxury and editorial taste.' },
    { q: 'Which font belongs in a code terminal?', opts: ['Garamond', 'Courier', 'Futura', 'Times New Roman'], ans: 1, why: 'Courier — equal-width characters are essential for code alignment.' },
]

/* -- Dot rating component -- */
function DotRating({ value, color, delay = 0 }) {
    const dots = 5
    const filled = Math.round(value / 20)
    return (
        <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: dots }, (_, i) => (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + i * 0.1, type: 'spring' }}
                    key={i} style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: i < filled ? color : 'rgba(255,255,255,.15)',
                    }} />
            ))}
        </div>
    )
}

export default function FontPsychology({ onNext, onBack, onScore, onGoHome }) {
    const [activeFont, setActiveFont] = useState(0)
    const [qIdx, setQIdx] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [quizDone, setQuizDone] = useState(false)

    // Setup 3D Tilt properties
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-300, 300], [10, -10])
    const rotateY = useTransform(x, [-300, 300], [-10, 10])

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        x.set(mouseX - cx)
        y.set(mouseY - cy)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const handleAnswer = (i) => {
        if (feedback) return
        const correct = i === QUIZ[qIdx].ans
        if (correct) {
            setScore(s => s + 1)
            if (onScore) onScore(1)
        }
        setFeedback({ correct, text: (correct ? '✅ Correct! ' : '❌ Not quite. ') + QUIZ[qIdx].why })
    }

    const nextQ = () => {
        if (qIdx + 1 >= QUIZ.length) { setQuizDone(true); return }
        setQIdx(i => i + 1)
        setFeedback(null)
    }

    const resetQuiz = () => { setQIdx(0); setScore(0); setFeedback(null); setQuizDone(false) }

    const current = FONTS[activeFont]

    return (
        <div className="section" style={{ maxWidth: '90vw', perspective: '1200px' }}>
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="06"
                title="Psychology of Fonts"
                description="Every typeface has a personality. Explore how fonts shape perception, evoke emotions, and define brand identity."
                accentColor="#a855f7"
                titleColor="#ec4899"
            />

            {/* ---- FONT SELECTOR RIBBON ---- */}
            <div style={{
                display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
                marginBottom: 40, marginTop: 12,
            }}>
                {FONTS.map((f, i) => (
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        key={i} onClick={() => setActiveFont(i)}
                        style={{
                            padding: '10px 22px', border: 'none', borderRadius: 50,
                            fontFamily: f.family, fontSize: '1rem', fontWeight: 600,
                            background: i === activeFont ? current.gradient : 'rgba(0,0,0,.04)',
                            color: i === activeFont ? '#fff' : 'var(--text-muted)',
                            cursor: 'pointer', transition: 'background .3s ease, color .3s ease',
                            boxShadow: i === activeFont ? '0 4px 20px rgba(0,0,0,.2)' : 'none',
                        }}
                    >{f.name}</motion.button>
                ))}
            </div>

            {/* ---- MAIN SHOWCASE PANEL ---- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFont}
                    initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 1.05, rotateX: -10 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        borderRadius: 24, overflow: 'hidden', marginBottom: 48,
                        boxShadow: '0 30px 60px rgba(0,0,0,.15)',
                        transformStyle: 'preserve-3d',
                        rotateX, rotateY
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Top: Large Specimen */}
                    <div style={{
                        background: current.gradient,
                        padding: 'clamp(32px, 6vw, 80px) clamp(20px, 5vw, 60px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 'clamp(24px, 4vw, 60px)', minHeight: 'clamp(280px, 50vh, 400px)',
                        position: 'relative', overflow: 'hidden',
                        transformStyle: 'preserve-3d',
                        flexWrap: 'wrap',
                    }}>
                        {/* Ghost watermark */}
                        <motion.div
                            style={{
                                position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%) translateZ(-50px)',
                                fontFamily: current.family, fontSize: 'clamp(10rem, 30vw, 28rem)', fontWeight: 900,
                                color: 'rgba(255,255,255,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                            }}
                        >{current.specimen[0]}</motion.div>

                        {/* Left: Specimen */}
                        <motion.div
                            style={{ flex: '0 0 auto', zIndex: 1, transform: 'translateZ(60px)' }}
                        >
                            <div style={{
                                fontFamily: current.family, fontSize: 'clamp(6rem, 14vw, 12rem)',
                                fontWeight: 700, color: '#fff', lineHeight: .85, letterSpacing: '-.02em',
                                textShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            }}>{current.specimen}</div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.85rem',
                                color: current.accentColor, letterSpacing: '.2em', textTransform: 'uppercase',
                                marginTop: 20, fontWeight: 600,
                            }}>{current.era} — {current.family.split("'")[1]}</div>
                        </motion.div>

                        {/* Right: Personality info */}
                        <motion.div
                            style={{ flex: 1, zIndex: 1, maxWidth: 700, transform: 'translateZ(40px)' }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.8rem',
                                color: current.accentColor, letterSpacing: '.18em', textTransform: 'uppercase',
                                marginBottom: 10, fontWeight: 700, cursor: 'default',
                            }}><HoverLetters text={current.vibe} hoverColor={current.accentColor} /></motion.div>

                            <h3 style={{
                                fontFamily: current.family, fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                                color: '#fff', fontWeight: 700, marginBottom: 16, lineHeight: 1.1,
                            }}><HoverLetters text={current.name} hoverColor={current.accentColor} /></h3>

                            <p style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '1.15rem',
                                color: 'rgba(255,255,255,.7)', lineHeight: 1.8, marginBottom: 28,
                            }}><HoverWords text={current.desc} hoverColor={current.accentColor} /></p>

                            {/* Trait dot ratings */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px 24px' }}>
                                {TRAIT_LABELS.map((trait, i) => (
                                    <div key={trait} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif", fontSize: '.78rem',
                                            color: 'rgba(255,255,255,.45)', textTransform: 'uppercase',
                                            letterSpacing: '.08em', minWidth: 70, flexShrink: 0, fontWeight: 600,
                                        }}>{trait}</span>
                                        <DotRating delay={i * 0.1} value={current.traits[trait]} color={current.accentColor} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom: Brand usage showcase */}
                    <div style={{
                        background: 'rgba(255,255,255,.97)', padding: 'clamp(16px, 3vw, 28px) clamp(20px, 5vw, 60px)',
                        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
                        borderTop: '1px solid rgba(0,0,0,.06)',
                        transform: 'translateZ(20px)'
                    }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.75rem',
                            color: 'var(--text-muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600,
                            flexShrink: 0,
                        }}>Used by</span>
                        <div style={{ display: 'flex', gap: 14, flex: 1, flexWrap: 'wrap' }}>
                            {current.brands.map((b, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                                    key={i}
                                    onClick={() => b.url && window.open(b.url, '_blank')}
                                    style={{
                                        background: b.bg, borderRadius: 14, padding: 'clamp(12px, 2vw, 20px) clamp(16px, 3vw, 28px)',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        minWidth: 'clamp(100px, 25vw, 140px)', minHeight: 80, flex: 1,
                                        cursor: b.url ? 'pointer' : 'default', boxShadow: '0 2px 12px rgba(0,0,0,.08)',
                                        gap: 8,
                                    }}
                                    whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,.18)' }}
                                >
                                    {b.img ? (
                                        <>
                                            <img src={b.img} alt={b.name}
                                                style={{
                                                    height: 36, maxWidth: 90, objectFit: 'contain',
                                                    filter: b.invertLogo ? 'brightness(0) invert(1)' : 'none',
                                                }} />
                                            <div style={{
                                                fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                                color: b.color, opacity: .45, letterSpacing: '.06em',
                                            }}>{b.name}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{
                                                fontFamily: b.font, fontSize: b.size, fontWeight: b.weight,
                                                color: b.color, letterSpacing: b.ls || 'normal',
                                                fontStyle: b.italic ? 'italic' : 'normal',
                                                lineHeight: 1.2, textAlign: 'center',
                                            }}>
                                                {b.name}
                                            </div>
                                            {b.sub && (
                                                <div style={{
                                                    fontFamily: "'Inter', sans-serif", fontSize: '.65rem',
                                                    color: b.color, opacity: .5,
                                                    letterSpacing: '.06em', fontWeight: 400,
                                                }}>{b.sub}</div>
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ---- SUMMARY ... full alphabet removed ---- */}

            {/* ---- MOOD QUIZ ---- */}
            <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
                    borderRadius: 24, padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 44px)', boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                    color: '#fef6f8', marginBottom: 44,
                }}
            >
                <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '.85rem',
                    color: 'rgba(255,255,255,.4)', letterSpacing: '.18em', textTransform: 'uppercase',
                    marginBottom: 28, fontWeight: 600, textAlign: 'center',
                }}>
                    🧠 Font Mood Quiz — Match the typeface to the emotion
                </div>

                {!quizDone ? (
                    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                        <div style={{
                            fontFamily: "'Playfair Display', serif", fontSize: '1.8rem',
                            marginBottom: 28, textAlign: 'center', lineHeight: 1.4,
                        }}>
                            {QUIZ[qIdx].q}
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {QUIZ[qIdx].opts.map((opt, i) => (
                                <button key={i} onClick={() => handleAnswer(i)}
                                    style={{
                                        padding: '14px 28px', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: 50,
                                        background: feedback && i === QUIZ[qIdx].ans ? 'rgba(46,160,120,.25)' : 'transparent',
                                        color: 'rgba(255,255,255,.7)',
                                        fontFamily: "'Inter', sans-serif", fontSize: '.95rem', letterSpacing: '.03em',
                                        cursor: feedback ? 'default' : 'pointer', transition: 'all .3s ease',
                                        opacity: feedback ? (i === QUIZ[qIdx].ans ? 1 : .35) : 1,
                                    }}
                                    onMouseEnter={e => { if (!feedback) { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)' } }}
                                    onMouseLeave={e => { if (!feedback) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)' } }}
                                >{opt}</button>
                            ))}
                        </div>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                style={{
                                    marginTop: 24, padding: 24, borderRadius: 16, textAlign: 'center', overflow: 'hidden',
                                    background: feedback.correct ? 'rgba(46,160,120,.08)' : 'rgba(220,50,90,.08)',
                                    border: `1px solid ${feedback.correct ? 'rgba(46,160,120,.2)' : 'rgba(220,50,90,.2)'}`,
                                }}
                            >
                                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,.75)' }}>{feedback.text}</p>
                                <button onClick={nextQ}
                                    style={{
                                        marginTop: 14, padding: '10px 24px', background: 'rgba(255,255,255,.1)',
                                        color: '#fff', border: '1px solid rgba(255,255,255,.15)', borderRadius: 50,
                                        fontFamily: "'Inter', sans-serif", fontSize: '.85rem', cursor: 'pointer',
                                        transition: 'all .3s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.18)' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)' }}
                                >Next Question →</button>
                            </motion.div>
                        )}
                        <div style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.8rem',
                            color: 'rgba(255,255,255,.25)', marginTop: 20, textAlign: 'center',
                        }}>
                            Score: {score} / {QUIZ.length} &nbsp;·&nbsp; Question {qIdx + 1} of {QUIZ.length}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 30 }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', marginBottom: 12 }}>
                            🎉 Quiz complete!
                        </div>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.55)', marginBottom: 24 }}>You scored {score} out of {QUIZ.length}</p>
                        <button onClick={resetQuiz}
                            style={{
                                padding: '12px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,.15)',
                                color: 'rgba(255,255,255,.7)', borderRadius: 50,
                                fontFamily: "'Inter', sans-serif", fontSize: '.85rem', cursor: 'pointer',
                            }}
                        >Restart Quiz</button>
                    </div>
                )}
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button className="btn-secondary" onClick={onBack}>← Back</button>
                <button className="btn-primary" onClick={onNext}>Continue to Expressive →</button>
                <button className="btn-secondary" onClick={onNext}>Skip ⏭</button>
            </div>
        </div>
    )
}
