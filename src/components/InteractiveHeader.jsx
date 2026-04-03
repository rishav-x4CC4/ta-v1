import { motion } from 'framer-motion'

/* ── Reusable interactive section header with hover effects like the landing page ── */

/** Renders each word as a hoverable span */
function HoverWords({ text, hoverColor = '#00f0ff', style = {} }) {
    return (
        <span style={{ display: 'inline', ...style }}>
            {text.split(' ').map((w, i) => (
                <motion.span
                    key={i}
                    whileHover={{ color: hoverColor, scale: 1.08, textShadow: `0 0 12px ${hoverColor}55` }}
                    style={{ display: 'inline-block', marginRight: '0.3em', cursor: 'default' }}
                >{w}</motion.span>
            ))}
        </span>
    )
}

/** Renders each letter as a hoverable span */
function HoverLetters({ text, hoverColor = '#00f0ff' }) {
    return (
        <>
            {Array.from(text).map((ch, i) => (
                <motion.span
                    key={i}
                    whileHover={{ color: hoverColor, scale: 1.25, textShadow: `0 0 12px ${hoverColor}55` }}
                    style={{ display: ch === ' ' ? 'inline' : 'inline-block', cursor: 'default' }}
                >{ch === ' ' ? '\u00A0' : ch}</motion.span>
            ))}
        </>
    )
}

/** 🏠 Home button — floating top-left */
export function HomeButton({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,240,255,.35)', borderColor: 'var(--accent-1)' }}
            whileTap={{ scale: 0.92 }}
            style={{
                position: 'fixed',
                top: 70,
                left: 18,
                zIndex: 1000,
                padding: '8px 16px',
                background: 'rgba(10,10,26,.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 12,
                color: '#fff',
                fontSize: '.85rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                letterSpacing: '.02em',
            }}
        >
            <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '1rem' }}
            >🏠</motion.span>
            Home
        </motion.button>
    )
}

/** Interactive section header matching landing page style */
export default function InteractiveHeader({
    sectionNumber,        // e.g. "Level 1", "05", "Poster"
    title,                // e.g. "Typography Anatomy"
    description,          // e.g. "Click on each term..."
    accentColor = '#00f0ff',
    titleColor = '#e8457a',
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <motion.span
                className="section-number"
                whileHover={{ scale: 1.1, boxShadow: `0 0 16px ${accentColor}33`, borderColor: accentColor }}
                style={{ cursor: 'default' }}
            >
                <HoverLetters text={sectionNumber} hoverColor={accentColor} />
            </motion.span>

            <h2 style={{ marginBottom: 16 }}>
                <HoverLetters text={title} hoverColor={titleColor} />
            </h2>

            {description && (
                <p style={{ maxWidth: 700 }}>
                    <HoverWords text={description} hoverColor={accentColor} />
                </p>
            )}
        </motion.div>
    )
}

export { HoverWords, HoverLetters }
