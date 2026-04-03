import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HomeButton, HoverLetters, HoverWords } from './InteractiveHeader'

/* ── Confetti Particle Component ── */
function ConfettiPiece({ color, x, delay }) {
    const rx = Math.random() * 360
    const ry = Math.random() * 360
    const rz = Math.random() * 360
    return (
        <motion.div
            initial={{ y: -50, x, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
            animate={{
                y: '120vh', x: x + (Math.random() * 200 - 100),
                rotateX: rx, rotateY: ry, rotateZ: rz, opacity: [1, 1, 0]
            }}
            transition={{ duration: Math.random() * 2 + 3, delay, ease: 'linear' }}
            style={{
                position: 'fixed', top: 0, left: 0,
                width: 12, height: 12, background: color,
                pointerEvents: 'none', zIndex: 9999,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
        />
    )
}

function FallingConfetti({ active }) {
    const [pieces, setPieces] = useState([])
    const colors = ['#00f0ff', '#e8457a', '#c9b08b', '#ffd6a5', '#4285f4', '#ffffff']

    useEffect(() => {
        if (!active) return
        const p = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            delay: Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }))
        setPieces(p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active])

    if (!active) return null

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            {pieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
        </div>
    )
}


/* ── Main ResultsScreen Component ── */
export default function ResultsScreen({ scores, onRestart, onBack, onGoHome }) {
    const total = scores.anatomyQuiz + scores.fontSorting + scores.fontPsychology
    const maxAnatomy = 10
    const maxSorting = 13
    const maxPsychology = 5
    const maxTotal = maxAnatomy + maxSorting + maxPsychology
    const percentage = Math.round((total / maxTotal) * 100)

    const getGrade = () => {
        if (percentage >= 90) return { label: 'Typography Master!', message: 'You have an exceptional understanding of typography fundamentals. Consider a career in type design.', color: '#00f0ff' }
        if (percentage >= 70) return { label: 'Great Job!', message: 'You have a solid grasp of typography concepts. Keep practicing to refine your eye.', color: '#e8d5b0' }
        if (percentage >= 50) return { label: 'Good Effort!', message: 'You know the basics. Keep studying to strengthen your typography knowledge.', color: '#e8457a' }
        return { label: 'Keep Learning!', message: 'Review the explorer sections to build your foundation. Type takes time!', color: '#8d99ae' }
    }

    const grade = getGrade()
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        if (percentage >= 50) {
            setShowConfetti(true)
            const t = setTimeout(() => setShowConfetti(false), 5000)
            return () => clearTimeout(t)
        }
    }, [percentage])

    // Number counter animation component
    const Counter = ({ from = 0, to }) => {
        return (
            <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring' }}
            >
                {to}
            </motion.span>
        )
    }

    return (
        <div className="section" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(24px, 6vw, 60px) 0' }}>
            <HomeButton onClick={onGoHome} />
            <FallingConfetti active={showConfetti} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1, position: 'relative' }}>

                {/* 3D Trophy Showcase */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.1, bounce: 0.4 }}
                    style={{ width: '100%', height: 'clamp(180px, 40vh, 350px)', marginBottom: 20 }}
                >
                    <div style={{
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', width: 'clamp(100px, 25vw, 200px)', height: 'clamp(100px, 25vw, 200px)', background: 'rgba(255, 215, 0, 0.1)', filter: 'blur(50px)' }} />
                        <motion.div
                            animate={{ rotateY: [0, 360], y: [-10, 10, -10] }}
                            transition={{ rotateY: { duration: 4, repeat: Infinity, ease: 'linear' }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
                            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' }}
                        >
                            🏆
                        </motion.div>
                    </div>
                </motion.div>

                {/* Grade info */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        color: grade.color, marginBottom: 12, textShadow: `0 4px 20px ${grade.color}40`,
                    }}><HoverLetters text={grade.label} hoverColor={grade.color} /></h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', color: 'var(--text-muted)',
                        maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6,
                    }}><HoverWords text={grade.message} hoverColor={grade.color} /></p>
                </motion.div>

                {/* Scores Grid */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                    gap: 'clamp(12px, 2vw, 20px)', width: '100%', maxWidth: 800, marginBottom: 40, padding: '0 clamp(12px, 3vw, 0px)',
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
                        style={{
                            background: 'var(--bg-card)', padding: '24px', borderRadius: '16px',
                            border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px rgba(0,0,0,.15)',
                        }}
                    >
                        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}><HoverLetters text="Anatomy Quiz" hoverColor="#00f0ff" /></h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                            <Counter to={scores.anatomyQuiz} /> <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {maxAnatomy}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                        style={{
                            background: 'var(--bg-card)', padding: '24px', borderRadius: '16px',
                            border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px rgba(0,0,0,.15)',
                        }}
                    >
                        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}><HoverLetters text="Font Sorting" hoverColor="#f59e0b" /></h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                            <Counter to={scores.fontSorting} /> <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {maxSorting}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.75 }}
                        style={{
                            background: 'var(--bg-card)', padding: '24px', borderRadius: '16px',
                            border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px rgba(0,0,0,.15)',
                        }}
                    >
                        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}><HoverLetters text="Font Psychology" hoverColor="#a855f7" /></h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
                            <Counter to={scores.fontPsychology} /> <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {maxPsychology}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(232, 69, 122, 0.1) 0%, rgba(201, 176, 139, 0.1) 100%)',
                            padding: '24px', borderRadius: '16px', border: `1px solid ${grade.color}40`,
                            boxShadow: `0 12px 40px ${grade.color}15`, gridColumn: '1 / -1',
                        }}
                    >
                        <h4 style={{ color: grade.color, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}><HoverLetters text="Overall Final Score" hoverColor={grade.color} /></h4>
                        <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                            {percentage}%
                            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                (<Counter to={total} /> / {maxTotal})
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <button className="btn-secondary" onClick={onBack} style={{ padding: '14px 32px' }}>← Back to Showcase</button>
                    <button className="btn-primary" onClick={onRestart} style={{ padding: '14px 40px', background: grade.color, color: '#000' }}>
                        Play Again 🔄
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
