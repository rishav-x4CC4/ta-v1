import { useState } from 'react'
import { motion } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverWords, HoverLetters } from './InteractiveHeader'

/* -- Readability tester fonts -- */
const RT_FONTS = [
    { label: 'Merriweather (Serif)', family: "'Merriweather', Georgia, serif" },
    { label: 'Roboto (Sans)', family: "'Roboto', 'Segoe UI', sans-serif" },
    { label: 'Lora (Serif)', family: "'Lora', 'Times New Roman', serif" },
    { label: 'Montserrat (Sans)', family: "'Montserrat', Arial, sans-serif" },
    { label: 'Playfair Display (Serif)', family: "'Playfair Display', Georgia, serif" },
    { label: 'Open Sans (Sans)', family: "'Open Sans', Arial, sans-serif" },
    { label: 'Georgia (Serif)', family: "Georgia, 'Times New Roman', serif" },
    { label: 'Poppins (Sans)', family: "'Poppins', 'Segoe UI', sans-serif" },
    { label: 'Source Serif (Serif)', family: "'Source Serif 4', Georgia, serif" },
    { label: 'Raleway (Sans)', family: "'Raleway', 'Helvetica Neue', sans-serif" },
]

/* -- Real-world brand examples -- (completely different from ff.html) */
const BRANDS = [
    { bg: '#5cbfba', color: '#fff', font: "'Playfair Display', serif", name: 'Tiffany & Co.', tag: 'Serif — Luxury', weight: 700, size: '2.2rem', url: 'https://www.tiffany.com' },
    { bg: '#5a9cf5', color: '#fff', font: "'Inter', sans-serif", name: 'Google', tag: 'Sans — Tech', weight: 500, size: '2.8rem', url: 'https://www.google.com' },
    { bg: '#3dba6f', color: '#fff', font: "'Inter', sans-serif", name: 'Spotify', tag: 'Sans — Music', weight: 700, size: '2.4rem', url: 'https://www.spotify.com' },
    { bg: '#ede4d4', color: '#3d2b1f', font: "'Playfair Display', serif", name: 'HARPER\'S\nBAZAAR', tag: 'Serif — Editorial', weight: 700, size: '1.7rem', italic: true, url: 'https://www.harpersbazaar.com' },
    { bg: '#d94040', color: '#fff', font: "'Inter', sans-serif", name: 'YouTube', tag: 'Sans — Video', weight: 700, size: '2.4rem', url: 'https://www.youtube.com' },
    { bg: '#e8ddd0', color: '#2a1f14', font: "'Georgia', serif", name: 'The\nWashington\nPost', tag: 'Serif — Journalism', size: '1.5rem', weight: 700, url: 'https://www.washingtonpost.com' },
    { bg: '#e87478', color: '#fff', font: "'Inter', sans-serif", name: 'Airbnb', tag: 'Sans — Travel', weight: 700, size: '2.4rem', url: 'https://www.airbnb.com' },
    { bg: '#c94060', color: '#fff', font: "'Inter', sans-serif", name: 'Pinterest', tag: 'Sans — Social', weight: 700, size: '2.2rem', url: 'https://www.pinterest.com' },
    { bg: '#bf3030', color: '#fff', font: "'Playfair Display', serif", name: 'The\nEconomist', tag: 'Serif — Finance', weight: 700, size: '1.7rem', url: 'https://www.economist.com' },
    { bg: '#e8c840', color: '#2a2000', font: "'Georgia', serif", name: 'National\nGeographic', tag: 'Serif — Nature', weight: 700, size: '1.7rem', url: 'https://www.nationalgeographic.com' },
    { bg: '#e4e0da', color: '#1a1a1a', font: "'Inter', sans-serif", name: 'BBC', tag: 'Sans — Media', weight: 800, size: '2.8rem', ls: '.08em', url: 'https://www.bbc.com' },
]

export default function SerifVsSansSerif({ onNext, onBack, onGoHome }) {
    const [rtFont, setRtFont] = useState(RT_FONTS[0])
    const [rtSize, setRtSize] = useState(18)

    return (
        <div className="section" style={{ padding: 0, maxWidth: '100%' }}>
            <HomeButton onClick={onGoHome} />
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                style={{ padding: 'clamp(24px, 5vw, 48px) 5% 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <InteractiveHeader
                    sectionNumber="05"
                    title="Serif vs. Sans-Serif"
                    accentColor="#c07830"
                    titleColor="#c94070"
                />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.35rem', color: 'var(--text-muted)', maxWidth: 700, lineHeight: 1.7, marginBottom: 8, textAlign: 'center' }}>
                    <HoverWords text="Two families, two philosophies. Serifs carry tradition; sans-serifs embrace modernity. Understanding when to use each is a core design skill." hoverColor="#c07830" />
                </p>
            </motion.div>

            {/* ---- SPLIT COMPARISON ---- */}
            <div className="serif-sans-split" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden', margin: '0 5% 36px',
                boxShadow: '0 8px 32px rgba(0,0,0,.12)', minHeight: 0,
            }}>
                {/* Left — Serif (dark burgundy-black) */}
                <motion.div
                    initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                    style={{
                        background: 'linear-gradient(160deg, #1a0a12 0%, #2d1420 100%)',
                        color: '#f5e6d8', padding: 'clamp(24px, 5vw, 42px) clamp(20px, 4vw, 36px)', position: 'relative', overflow: 'visible',
                    }}
                >
                    {/* Decorative ghost letter */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', right: '-15%', top: '-10%',
                            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(8rem, 22vw, 22rem)', fontWeight: 900,
                            color: 'rgba(255,255,255,.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                        }}
                    >R</motion.div>

                    <motion.div whileHover={{ scale: 1.05, textShadow: '0 0 12px rgba(229,201,123,.5)' }} style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(229,201,123,.8)', marginBottom: 14, fontWeight: 800, cursor: 'default' }}><HoverLetters text="SERIF" hoverColor="#e5c97b" /></motion.div>
                    <div style={{
                        fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                        fontWeight: 900, lineHeight: .92, marginBottom: 24, letterSpacing: '-.02em',
                    }}>
                        Beauty<br />in&nbsp;every<br /><em style={{ color: '#e5c97b', fontStyle: 'italic' }}>detail</em>
                    </div>

                    {/* SVG showing serifs on "Rg" */}
                    <svg viewBox="0 0 340 80" style={{ width: '100%', maxWidth: '100%', marginBottom: 18, overflow: 'visible' }}>
                        <text x="8" y="62" fontFamily="'Playfair Display', Georgia, serif" fontSize="66" fontWeight="700" fill="#f5e6d8">Rg</text>
                        {/* Serif highlights */}
                        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} x1="6" y1="66" x2="28" y2="66" stroke="#e5c97b" strokeWidth="2.5" />
                        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} x1="6" y1="3" x2="28" y2="3" stroke="#e5c97b" strokeWidth="2.5" />
                        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} x1="36" y1="66" x2="50" y2="66" stroke="#e5c97b" strokeWidth="2.5" />
                        {/* Tail highlight */}
                        <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.1 }} x1="100" y1="66" x2="120" y2="66" stroke="#e5c97b" strokeWidth="2.5" />
                        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} x="130" y="40" fontFamily="'Inter', sans-serif" fontSize="14" fill="#e5c97b" fontWeight="600">← decorative strokes</motion.text>
                        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} x="130" y="60" fontFamily="'Inter', sans-serif" fontSize="11" fill="rgba(229,201,123,.6)">guide the reader's eye</motion.text>
                    </svg>

                    {/* Feature list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        <Feat dark yes text="Print-first readability" delay={0.2} />
                        <Feat dark yes text="Editorials, books & academia" delay={0.3} />
                        <Feat dark yes text="Conveys trust & heritage" delay={0.4} />
                        <Feat dark yes text="Elegant headline pairing" delay={0.5} />
                        <Feat dark no text="Mobile-first interfaces" delay={0.6} />
                        <Feat dark no text="Small pixel-rendered text" delay={0.7} />
                    </div>

                    <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '.8rem',
                        color: 'rgba(229,201,123,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 18,
                        borderTop: '1px solid rgba(229,201,123,.15)', paddingTop: 10,
                    }}>
                        Heritage: Trajan's Column, Rome, 113 AD
                    </div>
                </motion.div>

                {/* Right — Sans-Serif (clean white-blue) */}
                <motion.div
                    initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                    style={{
                        background: 'linear-gradient(160deg, #f8fafe 0%, #edf2ff 100%)',
                        padding: 'clamp(24px, 5vw, 42px) clamp(20px, 4vw, 36px)', position: 'relative', overflow: 'visible',
                    }}
                >
                    {/* Decorative ghost letter */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', right: '-12%', top: '-8%',
                            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(8rem, 20vw, 20rem)', fontWeight: 900,
                            color: 'rgba(66,133,244,.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                        }}
                    >A</motion.div>

                    <motion.div whileHover={{ scale: 1.05, textShadow: '0 0 12px rgba(66,133,244,.5)' }} style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(66,133,244,.7)', marginBottom: 14, fontWeight: 800, cursor: 'default' }}><HoverLetters text="SANS-SERIF" hoverColor="#4285f4" /></motion.div>
                    <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                        fontWeight: 800, lineHeight: .92, marginBottom: 24, textTransform: 'uppercase',
                        color: '#1a1a2e', letterSpacing: '-.03em',
                    }}>
                        CLARITY<br />WITHOUT<br /><span style={{ color: '#4285f4' }}>NOISE</span>
                    </div>

                    {/* SVG showing clean cut ends on "Ag" */}
                    <svg viewBox="0 0 340 80" style={{ width: '100%', maxWidth: '100%', marginBottom: 18, overflow: 'visible' }}>
                        <text x="8" y="62" fontFamily="'Inter', Arial, sans-serif" fontSize="66" fontWeight="700" fill="#1a1a2e">Ag</text>
                        {/* Clean dot annotations */}
                        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} cx="8" cy="3" r="5" fill="#4285f4" />
                        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} cx="38" cy="66" r="5" fill="#4285f4" />
                        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }} cx="100" cy="66" r="5" fill="#4285f4" />
                        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: 'spring' }} cx="100" cy="3" r="5" fill="#4285f4" />
                        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} x="130" y="40" fontFamily="'Inter', sans-serif" fontSize="14" fill="#4285f4" fontWeight="600">→ uniform terminals</motion.text>
                        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} x="130" y="60" fontFamily="'Inter', sans-serif" fontSize="11" fill="rgba(66,133,244,.6)">clean, geometric endings</motion.text>
                    </svg>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        <Feat yes text="Screen-optimized clarity" delay={0.2} />
                        <Feat yes text="Apps, dashboards & UI design" delay={0.3} />
                        <Feat yes text="Modern & approachable feel" delay={0.4} />
                        <Feat yes text="Scalable across pixel densities" delay={0.5} />
                        <Feat no text="Long-form printed books" delay={0.6} />
                        <Feat no text="Premium or heritage branding" delay={0.7} />
                    </div>

                    <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '.8rem',
                        color: 'rgba(66,133,244,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 18,
                        borderTop: '1px solid rgba(66,133,244,.15)', paddingTop: 10,
                    }}>
                        Pioneer: W. Caslon IV, 1816 — Swiss Style 1950s
                    </div>
                </motion.div>
            </div>

            {/* ---- READABILITY TESTER ---- */}
            <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}
                style={{
                    margin: '0 5% 32px', background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)',
                    padding: 'clamp(18px, 4vw, 28px) clamp(18px, 4vw, 32px)', position: 'relative', overflow: 'hidden',
                }}
            >
                {/* Decorative accent line */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, var(--accent-1), var(--accent-4), var(--accent-5))',
                }} />

                <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '.68rem', color: 'var(--accent-4)',
                    letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 18, fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-1)', display: 'inline-block' }} />
                    Readability Lab — Compare font performance live
                </div>

                {/* Font buttons */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {RT_FONTS.map(f => (
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            key={f.label} onClick={() => setRtFont(f)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 20,
                                background: rtFont.label === f.label
                                    ? 'var(--gradient-1)'
                                    : 'rgba(255,255,255,.08)',
                                color: rtFont.label === f.label ? '#fff' : 'var(--text-secondary)',
                                fontFamily: "'Inter', sans-serif", fontSize: '.75rem', cursor: 'pointer',
                                transition: 'background .25s ease, color .25s ease',
                                fontWeight: rtFont.label === f.label ? 600 : 400,
                                border: rtFont.label === f.label ? 'none' : '1px solid rgba(255,255,255,.12)',
                                boxShadow: rtFont.label === f.label ? '0 4px 12px rgba(0,240,255,.2)' : 'none',
                            }}
                        >{f.label}</motion.button>
                    ))}
                </div>

                {/* Size slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>Size:</span>
                    <input type="range" min="10" max="48" value={rtSize} onChange={e => setRtSize(+e.target.value)}
                        style={{ flex: 1, maxWidth: '100%', accentColor: 'var(--accent-1)', height: 4 }} />
                    <span style={{
                        fontFamily: "'Inter', monospace", fontSize: '.72rem',
                        background: 'rgba(255,255,255,.08)', padding: '3px 10px', borderRadius: 12,
                        color: 'var(--text-secondary)', fontWeight: 600, minWidth: 45, textAlign: 'center',
                    }}>{rtSize}px</span>
                </div>

                {/* Sample text — editable */}
                <div
                    contentEditable
                    suppressContentEditableWarning
                    spellCheck={false}
                    style={{
                        fontFamily: rtFont.family, fontSize: rtSize, lineHeight: 1.75,
                        padding: 20, background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-glass)', transition: 'font-family .3s, font-size .3s',
                        color: 'var(--text-primary)', outline: 'none', cursor: 'text',
                        minHeight: 80,
                    }}
                >
                    Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects, and the products are not burdened with non-essentials. Back to purity, back to simplicity.
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '.85rem', color: 'var(--accent-4)', marginTop: 10, opacity: .8 }}>⌨ Click above to type your own text</div>

                {/* Status bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: 12, fontFamily: "'Inter', sans-serif", fontSize: '.9rem', color: 'var(--text-muted)',
                }}>
                    <span>Currently: <strong style={{ color: 'var(--text-secondary)' }}>{rtFont.label}</strong></span>
                    <span style={{ opacity: .6 }}>{rtSize}px · {rtSize < 14 ? 'Caption' : rtSize < 20 ? 'Body' : rtSize < 30 ? 'Subheading' : 'Display'} scale</span>
                </div>
            </motion.div>

            {/* ---- REAL-WORLD BRAND EXAMPLES ---- */}
            <div style={{ margin: '0 5% 12px' }}>
                <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '.65rem', color: 'var(--text-muted)',
                    letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 14, fontWeight: 500,
                }}>
                    ✦ Real-World Typography in Action
                </div>
            </div>

            <motion.div
                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
                variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                    gap: 'clamp(12px, 2vw, 20px)', margin: '0 5% 40px',
                }}
            >
                {BRANDS.map((b, i) => (
                    <motion.div key={i}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            show: { opacity: 1, scale: 1, transition: { type: 'spring' } }
                        }}
                        whileHover={{ y: -8, scale: 1.04, boxShadow: '0 16px 32px rgba(0,0,0,.15)' }}
                        onClick={() => window.open(b.url, '_blank', 'noopener,noreferrer')}
                        style={{
                            background: b.bg, padding: 'clamp(24px, 5vw, 44px) clamp(16px, 3vw, 28px)', borderRadius: 14, textAlign: 'center',
                            cursor: 'pointer', position: 'relative', overflow: 'hidden',
                            border: b.bg.includes('f') || b.bg.includes('e') ? '1px solid rgba(0,0,0,.08)' : 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,.06)',
                        }}
                    >
                        <div style={{
                            fontFamily: b.font, fontSize: b.size || '1.4rem', color: b.color,
                            fontWeight: b.weight || 700, fontStyle: b.italic ? 'italic' : 'normal',
                            letterSpacing: b.ls || 'normal', marginBottom: 14, lineHeight: 1.3,
                            whiteSpace: 'pre-line', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{b.name}</div>
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            color: b.color === '#fff' ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)',
                            letterSpacing: '.1em', fontWeight: 500, fontSize: '.7rem',
                        }}>{b.tag}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* ---- BUTTONS ---- */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 5% 48px' }}>
                <button className="btn-secondary" onClick={onBack}>← Back</button>
                <button className="btn-primary" onClick={onNext}>Continue to Psychology →</button>
                <button className="btn-secondary" onClick={onNext}>Skip ⏭</button>
            </div>
        </div>
    )
}

/* -- Sub-components -- */
function Feat({ yes, no, text, delay = 0, dark }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: yes ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 1, type: 'spring' }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.95rem', lineHeight: 1.4 }}
        >
            <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700,
                background: yes ? (dark ? 'rgba(46, 160, 120, .2)' : 'rgba(46, 160, 120, .15)') : (dark ? 'rgba(220, 50, 90, .2)' : 'rgba(220, 50, 90, .12)'),
                color: yes ? (dark ? '#2dbe8a' : '#1a8a62') : (dark ? '#f06090' : '#c94070'),
            }}>{yes ? '✓' : '✗'}</div>
            <span style={{ color: dark ? '#f5e6d8' : '#1a1a2e', fontWeight: 500 }}>{text}</span>
        </motion.div>
    )
}
