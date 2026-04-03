import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverLetters } from './InteractiveHeader'
import appleLogo from '../assets/brands/apple.png'
import googleLogo from '../assets/brands/google.png'
import nikeLogo from '../assets/brands/nike.png'

/* ----------------------------------------------------------
   BRAND IDENTITY ANALYSIS — Analyze well-known brands'
   typography, discuss typeface choices, and suggest
   alternatives with justification.
   ---------------------------------------------------------- */

const BRANDS = [
    {
        id: 'apple',
        name: 'Apple',
        logo: appleLogo,
        currentFont: 'San Francisco (SF Pro)',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        altFont: 'Avenir Next',
        altFamily: "'Montserrat', sans-serif",
        tagline: 'Think Different.',
        bgColor: '#000',
        textColor: '#fff',
        accentColor: '#0071e3',
        category: 'Sans-Serif — Geometric Neo-Grotesque',
        altCategory: 'Sans-Serif — Geometric Humanist',
        yearAdopted: '2015 (San Francisco), previously Myriad Pro (2002—2015), Apple Garamond (1984—2002)',
        analysis: [
            {
                title: 'Why San Francisco Works',
                points: [
                    'San Francisco\'s geometric precision mirrors Apple\'s design philosophy of clean simplicity and mathematical perfection.',
                    'Variable font technology allows seamless scaling from Apple Watch (6pt) to billboard — one typeface across all products.',
                    'Neutral character prevents the type from competing with Apple\'s product-centered visual language.',
                    'Slightly wider proportions than Helvetica improve on-screen legibility for UI use.',
                    'The typeface was custom-designed by Apple, ensuring no other brand can share the same typographic identity.',
                ],
            },
            {
                title: 'Brand Identity Reflection',
                points: [
                    'The geometric, highly-refined forms parallel Apple\'s meticulously engineered hardware.',
                    'Absence of serifs communicates modernity, innovation, and forward-thinking design.',
                    'Uniform stroke widths suggest precision and consistency — key brand values.',
                    'The clean, open letterforms create a feeling of transparency and accessibility.',
                    'The transition from Garamond (literary, classic) → Myriad Pro (friendly, approachable) → San Francisco (systematic, technological) tracks Apple\'s evolution from rebel computer company to global tech ecosystem.',
                ],
            },
        ],
        altJustification: [
            'Avenir Next retains the geometric DNA of San Francisco but introduces subtle humanist touches — slightly warmer terminals and more organic curves.',
            'The wider range of weights (Ultra Light through Heavy) could provide even richer typographic hierarchy.',
            'Adrian Frutiger\'s design brings decades of proven readability research — Avenir means "future" in French, aligning with Apple\'s forward-thinking identity.',
            'The slightly more open counterforms could improve readability at the smallest sizes (Apple Watch, status bars).',
            'Risk: Avenir is widely used by other brands, which could dilute Apple\'s distinctive typographic identity.',
        ],
    },
    {
        id: 'google',
        name: 'Google',
        logo: googleLogo,
        currentFont: 'Product Sans / Google Sans',
        fontFamily: "'Montserrat', sans-serif",
        altFont: 'Circular',
        altFamily: "'Inter', sans-serif",
        tagline: 'Search the world\'s information.',
        bgColor: '#fff',
        textColor: '#202124',
        accentColor: '#4285f4',
        category: 'Sans-Serif — Geometric',
        altCategory: 'Sans-Serif — Geometric with humanist qualities',
        yearAdopted: '2015 (Product Sans), evolved to Google Sans in 2020s',
        analysis: [
            {
                title: 'Why Product Sans Works',
                points: [
                    'Perfect circles and simple geometry echo the playful, approachable Google personality.',
                    'The multi-color wordmark demands a typeface neutral enough not to clash with four distinct colors.',
                    'Clean monolinear strokes ensure legibility at any size — from favicon to billboard.',
                    'Geometric simplicity conveys Google\'s core promise: making complex information simple.',
                    'Custom typeface ownership means Google\'s wordmark is legally protected and can\'t be replicated.',
                ],
            },
            {
                title: 'Brand Identity Reflection',
                points: [
                    'Product Sans\'s playful, almost child-like geometry makes Google feel accessible and non-intimidating.',
                    'The absence of sharp edges or high contrast communicates friendliness and inclusivity.',
                    'Consistent stroke width across all letters creates visual harmony — everything is "equal" at Google.',
                    'The typeface works equally well in Latin, Cyrillic, and Greek scripts — essential for a global brand.',
                    'The evolution from Catull (a serif) to Product Sans mirrors Google\'s shift from academic search engine to lifestyle brand.',
                ],
            },
        ],
        altJustification: [
            'Circular (by Lineto) shares Product Sans\'s geometric foundation but adds subtle optical corrections that improve long-form readability.',
            'Slightly more personality in the lowercase "a" and "g" could differentiate Google\'s text settings from competitors.',
            'Circular\'s ink traps and corner refinements perform better at small sizes in mobile UI.',
            'The warmer character could strengthen Google\'s "helpful friend" brand positioning.',
            'Risk: Circular is used by Spotify, Airbnb, and others — potential brand confusion in the tech space.',
        ],
    },
    {
        id: 'nike',
        name: 'Nike',
        logo: nikeLogo,
        currentFont: 'Futura (Condensed, Extra Bold)',
        fontFamily: "'Montserrat', sans-serif",
        altFont: 'Trade Gothic Bold',
        altFamily: "'Inter', sans-serif",
        tagline: 'JUST DO IT.',
        bgColor: '#111',
        textColor: '#fff',
        accentColor: '#f5f5f5',
        category: 'Sans-Serif — Geometric',
        altCategory: 'Sans-Serif — Grotesque',
        yearAdopted: '1990s (Futura Condensed for campaigns)',
        analysis: [
            {
                title: 'Why Futura Works',
                points: [
                    'Futura Condensed Extra Bold is pure energy compressed into letterforms — every word feels like a sprint.',
                    'The geometric construction suggests precision and engineered performance — perfect for athletic wear.',
                    'All-caps setting with tight tracking creates urgency and power — "JUST DO IT" demands action.',
                    'Futura\'s modernist heritage (Paul Renner, 1927) gives Nike campaigns artistic credibility beyond sportswear.',
                    'The condensed width allows bold statements in minimal space — crucial for shoe boxes, tags, and mobile ads.',
                ],
            },
            {
                title: 'Brand Identity Reflection',
                points: [
                    'Futura\'s forward-leaning energy mirrors Nike\'s core identity: movement, ambition, winning.',
                    'The rigid geometry contrasts with the organic Swoosh logo, creating dynamic visual tension.',
                    'Heavy weight and condensed proportions feel aggressive and competitive — athlete mindset.',
                    'The Bauhaus lineage of Futura positions Nike at the intersection of sport and design culture.',
                    'Nike\'s typography is intentionally NOT custom — using a "universal" font reinforces that Nike is for everyone.',
                ],
            },
        ],
        altJustification: [
            'Trade Gothic Bold offers a grittier, more industrial feel that could amplify Nike\'s "street" credibility.',
            'Slightly imperfect geometry adds rawness — sport isn\'t clean, it\'s messy and human.',
            'The wider proportions would give "JUST DO IT" even more visual weight and billboard impact.',
            'Trade Gothic\'s newspaper heritage could reinforce Nike\'s headline-driven campaign style.',
            'Risk: Trade Gothic lacks Futura\'s modernist elegance, potentially making campaigns feel less premium.',
        ],
    },
]

export default function BrandIdentityAnalysis({ onNext, onBack, onGoHome }) {
    const [activeBrand, setActiveBrand] = useState(BRANDS[0])
    const [showAlt, setShowAlt] = useState(false)
    const [useAltFont, setUseAltFont] = useState(false)

    const displayFont = useAltFont ? activeBrand.altFamily : activeBrand.fontFamily
    const displayFontName = useAltFont ? activeBrand.altFont : activeBrand.currentFont
    const displayCategory = useAltFont ? activeBrand.altCategory : activeBrand.category

    return (
        <div className="section" style={{ maxWidth: '90vw' }}>
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Analysis"
                title="Brand Identity Analysis"
                description="Analyzing how iconic brands use typography to shape their identity and communicate their message."
                accentColor="#4285f4"
                titleColor="#10b981"
            />

            {/* -- Brand Selector -- */}
            <div style={{
                display: 'flex', gap: 16, justifyContent: 'center',
                marginBottom: 48, flexWrap: 'wrap',
            }}>
                {BRANDS.map(b => (
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        key={b.id} onClick={() => { setActiveBrand(b); setShowAlt(false); setUseAltFont(false) }}
                        style={{
                            padding: 'clamp(10px, 2vw, 16px) clamp(16px, 3vw, 32px)', borderRadius: 16,
                            border: activeBrand.id === b.id
                                ? `2px solid ${b.accentColor}`
                                : '2px solid rgba(255,255,255,.1)',
                            background: activeBrand.id === b.id ? b.bgColor : 'rgba(255,255,255,.06)',
                            color: activeBrand.id === b.id ? b.textColor : 'var(--text-primary)',
                            fontFamily: b.fontFamily,
                            fontSize: '1.2rem', fontWeight: 700,
                            cursor: 'pointer', transition: 'background .3s ease, border-color .3s ease',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}
                    >
                        {b.logo && (
                            <img src={b.logo} alt={b.name} style={{
                                height: 28, objectFit: 'contain',
                                filter: activeBrand.id === b.id && b.bgColor === '#000' ? 'brightness(0) invert(1)' : 'none',
                            }} />
                        )}
                        {b.name}
                    </motion.button>
                ))}
            </div>

            {/* -- Brand Showcase -- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeBrand.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        maxWidth: 1200, margin: '0 auto 40px',
                        background: activeBrand.bgColor,
                        borderRadius: 24, overflow: 'hidden',
                        boxShadow: '0 12px 60px rgba(0,0,0,.15)',
                    }}
                >
                    {/* Hero */}
                    <div style={{
                        padding: 'clamp(32px, 5vw, 60px) clamp(20px, 5vw, 60px) clamp(24px, 4vw, 40px)',
                        display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)',
                        flexWrap: 'wrap',
                    }}>
                        {activeBrand.logo && (
                            <motion.img
                                initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }}
                                src={activeBrand.logo} alt={activeBrand.name} style={{
                                    height: 80, objectFit: 'contain',
                                    filter: activeBrand.bgColor === '#000' || activeBrand.bgColor === '#111'
                                        ? 'brightness(0) invert(1)' : 'none',
                                }} />
                        )}
                        <div style={{ flex: 1 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                                style={{
                                    fontFamily: displayFont,
                                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                    fontWeight: 900, color: activeBrand.textColor,
                                    lineHeight: 1, letterSpacing: '-.02em',
                                }}>{activeBrand.name}</motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                style={{
                                    fontFamily: displayFont,
                                    fontSize: 'clamp(.8rem, 2vw, 1.2rem)',
                                    fontWeight: 400, color: activeBrand.textColor,
                                    opacity: .5, marginTop: 8, fontStyle: 'italic',
                                }}>{activeBrand.tagline}</motion.div>
                        </div>

                        {/* Alternate Typeface Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => setUseAltFont(!useAltFont)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '10px 20px', borderRadius: 100,
                                border: `1.5px solid ${useAltFont ? activeBrand.accentColor : (activeBrand.bgColor === '#fff' ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.2)')}`,
                                background: useAltFont ? `${activeBrand.accentColor}18` : 'transparent',
                                color: useAltFont ? activeBrand.accentColor : (activeBrand.bgColor === '#fff' ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'),
                                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                                fontSize: '.75rem', fontWeight: 600,
                                letterSpacing: '.03em',
                                transition: 'all .3s ease',
                                whiteSpace: 'nowrap', flexShrink: 0,
                            }}
                        >
                            {/* Toggle track */}
                            <div style={{
                                width: 36, height: 20, borderRadius: 10,
                                background: useAltFont ? activeBrand.accentColor : (activeBrand.bgColor === '#fff' ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.2)'),
                                position: 'relative', transition: 'background .3s ease',
                                flexShrink: 0,
                            }}>
                                <motion.div
                                    animate={{ x: useAltFont ? 18 : 2 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    style={{
                                        width: 16, height: 16, borderRadius: '50%',
                                        background: '#fff', position: 'absolute', top: 2,
                                        boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                                    }}
                                />
                            </div>
                            {useAltFont ? activeBrand.altFont : 'Alt Font'}
                        </motion.button>
                    </div>

                    {/* Font info strip */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        style={{
                            padding: '20px clamp(20px, 5vw, 60px)', display: 'flex', gap: 'clamp(16px, 3vw, 40px)', flexWrap: 'wrap',
                            borderTop: `1px solid ${activeBrand.bgColor === '#fff' ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)'}`,
                            borderBottom: `1px solid ${activeBrand.bgColor === '#fff' ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)'}`,
                        }}>
                        {[
                            { label: 'TYPEFACE', value: displayFontName },
                            { label: 'CLASSIFICATION', value: displayCategory },
                            { label: 'ADOPTED', value: useAltFont ? 'Suggested Alternative' : activeBrand.yearAdopted.split(',')[0] },
                        ].map(item => (
                            <div key={item.label}>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                    fontWeight: 700, color: activeBrand.textColor, opacity: .3,
                                    letterSpacing: '.15em', marginBottom: 4,
                                }}>{item.label}</div>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '.85rem',
                                    fontWeight: 500, color: activeBrand.textColor, opacity: .7,
                                }}>{item.value}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Specimen */}
                    <div style={{
                        padding: '32px clamp(20px, 5vw, 60px)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        flexWrap: 'wrap', gap: 16,
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.15, y: 0 }} transition={{ delay: 0.6 }}
                            style={{
                                fontFamily: displayFont,
                                fontSize: 'clamp(3rem, 8vw, 5rem)',
                                fontWeight: 900, color: activeBrand.textColor,
                                lineHeight: 1,
                            }}>Aa Bb Cc</motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 0.2, x: 0 }} transition={{ delay: 0.7 }}
                            style={{
                                fontFamily: displayFont,
                                fontSize: '.7rem', fontWeight: 400,
                                color: activeBrand.textColor,
                                letterSpacing: '.1em', textAlign: 'right',
                            }}>
                            ABCDEFGHIJKLM<br />
                            NOPQRSTUVWXYZ<br />
                            0123456789
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* -- Analysis Sections -- */}
            <div style={{ maxWidth: 1200, margin: '0 auto 40px' }}>
                <AnimatePresence mode="wait">
                    <motion.div key={`analysis-${activeBrand.id}`}>
                        {activeBrand.analysis.map((section, si) => (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + si * 0.2 }}
                                key={si} style={{
                                    background: 'rgba(255,255,255,.05)',
                                    borderRadius: 16, padding: 'clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px)',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    marginBottom: 20,
                                }}>
                                <h3 style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '1.1rem',
                                    fontWeight: 700, color: 'var(--text-primary)',
                                    marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10,
                                }}>
                                    <span style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: '#4285f4',
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '.7rem', fontWeight: 800,
                                        color: '#fff',
                                    }}>{si + 1}</span>
                                    <HoverLetters text={section.title} hoverColor={activeBrand.accentColor} />
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {section.points.map((p, pi) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + si * 0.2 + pi * 0.1 }}
                                            key={pi} style={{
                                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                            }}>
                                            <div style={{
                                                width: 6, height: 6, borderRadius: '50%',
                                                background: activeBrand.accentColor,
                                                flexShrink: 0, marginTop: 7, opacity: .5,
                                            }} />
                                            <p style={{
                                                fontFamily: "'Inter', sans-serif", fontSize: '.92rem',
                                                color: 'rgba(255,255,255,.85)', lineHeight: 1.65,
                                                margin: 0,
                                            }}>{p}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* -- Alternative Typeface Section -- */}
            <div style={{ maxWidth: 1200, margin: '0 auto 48px' }}>
                <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={() => setShowAlt(!showAlt)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '16px 32px', borderRadius: 14,
                        border: `2px solid ${activeBrand.accentColor}30`,
                        background: `${activeBrand.accentColor}08`,
                        cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem', fontWeight: 700,
                        color: activeBrand.accentColor,
                        transition: 'background .3s ease, color .3s ease',
                        width: '100%', justifyContent: 'center',
                    }}
                >
                    <motion.span
                        animate={{ rotate: showAlt ? 180 : 0 }} transition={{ duration: 0.3 }}
                        style={{ fontSize: '.7rem' }}
                    >▼</motion.span>
                    {showAlt ? 'Hide' : 'Show'} Alternative Typeface Suggestion
                </motion.button>

                <AnimatePresence>
                    {showAlt && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            style={{
                                marginTop: 20, borderRadius: 16,
                                border: '1px solid rgba(255,255,255,.08)',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Before / After comparison */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                            }}>
                                {/* Current */}
                                <div style={{
                                    padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)',
                                    background: activeBrand.bgColor,
                                    borderRight: '1px solid rgba(128,128,128,.1)',
                                }}>
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                        fontWeight: 700, color: activeBrand.textColor, opacity: .3,
                                        letterSpacing: '.2em', marginBottom: 12,
                                    }}>CURRENT</div>
                                    <div style={{
                                        fontFamily: activeBrand.fontFamily,
                                        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                                        fontWeight: 900, color: activeBrand.textColor,
                                        lineHeight: 1.1,
                                    }}>{activeBrand.name}</div>
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                                        color: activeBrand.textColor, opacity: .4,
                                        marginTop: 8,
                                    }}>{activeBrand.currentFont}</div>
                                </div>

                                {/* Alternative */}
                                <div style={{
                                    padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)',
                                    background: activeBrand.bgColor,
                                }}>
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                        fontWeight: 700, color: activeBrand.accentColor,
                                        letterSpacing: '.2em', marginBottom: 12,
                                    }}>ALTERNATIVE</div>
                                    <div style={{
                                        fontFamily: activeBrand.altFamily,
                                        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                                        fontWeight: 700, color: activeBrand.textColor,
                                        lineHeight: 1.1,
                                    }}>{activeBrand.name}</div>
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                                        color: activeBrand.accentColor, opacity: .7,
                                        marginTop: 8,
                                    }}>{activeBrand.altFont}</div>
                                </div>
                            </div>

                            {/* Justification */}
                            <div style={{
                                padding: '32px 36px',
                                background: 'rgba(255,255,255,.05)',
                            }}>
                                <h4 style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '.75rem',
                                    fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: '.15em', color: activeBrand.accentColor,
                                    marginBottom: 20,
                                }}>
                                    <HoverLetters text={`Why ${activeBrand.altFont}? — Justification`} hoverColor={activeBrand.accentColor} />
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {activeBrand.altJustification.map((j, ji) => (
                                        <div key={ji} style={{
                                            display: 'flex', gap: 14, alignItems: 'flex-start',
                                        }}>
                                            <div style={{
                                                width: 24, height: 24, borderRadius: '50%',
                                                background: `${activeBrand.accentColor}15`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '.65rem', fontWeight: 700,
                                                color: activeBrand.accentColor, flexShrink: 0,
                                            }}>{ji + 1}</div>
                                            <p style={{
                                                fontFamily: "'Inter', sans-serif", fontSize: '.9rem',
                                                color: 'rgba(255,255,255,.85)', lineHeight: 1.6,
                                                margin: 0, paddingTop: 2,
                                            }}>{j}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="next-btn-container" style={{ marginTop: 40 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>
                            Continue to Results →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
