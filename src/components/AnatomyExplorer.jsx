import { useState } from 'react'
import { motion } from 'framer-motion'
import ANATOMY_TERMS from '../data/anatomyTerms'
import InteractiveHeader, { HomeButton, HoverLetters } from './InteractiveHeader'

export default function AnatomyExplorer({ onNext, onBack, onGoHome }) {
    const [activeTerm, setActiveTerm] = useState(null)
    const [visitedTerms, setVisitedTerms] = useState(new Set())
    const [showAll, setShowAll] = useState(false)

    const handleTermClick = (term) => {
        setActiveTerm(term)
        setShowAll(false)
        setVisitedTerms(prev => new Set([...prev, term.id]))
    }

    const allVisited = visitedTerms.size === ANATOMY_TERMS.length

    const isVisible = (id) => showAll || activeTerm?.id === id;
    const getTermColor = (id) => ANATOMY_TERMS.find(t => t.id === id)?.color || '#fff';

    return (
        <div className="section">
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Level 1"
                title="Typography Anatomy"
                description="Click on each term below to explore the anatomical elements of type. Learn all 10 to proceed!"
                accentColor="#00f0ff"
                titleColor="#e8457a"
            />

            <div className="anatomy-explorer">
                <div className="anatomy-interactive-area">
                    <div style={{ height: 'clamp(220px, 50vw, 350px)', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-glass)', background: 'var(--bg-card)', backdropFilter: 'blur(10px)' }}>
                        {/* Comprehensive DOM-based Anatomy Diagram */}
                        <div style={{
                            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            {/* Decorative ambient lights */}
                            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: 'clamp(100px, 25vw, 200px)', height: 'clamp(100px, 25vw, 200px)', background: 'rgba(0, 240, 255, 0.15)', filter: 'blur(50px)' }} />
                            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 'clamp(100px, 25vw, 200px)', height: 'clamp(100px, 25vw, 200px)', background: 'rgba(232, 69, 122, 0.1)', filter: 'blur(50px)' }} />

                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {/* The Word */}
                                <motion.div
                                    animate={activeTerm && !showAll ? { scale: 1.05 } : { scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        fontSize: 'clamp(4rem, 11vw, 11rem)', // Scalable big text fitting container
                                        fontFamily: "'Lora', serif",
                                        color: 'white',
                                        lineHeight: 1,
                                        margin: 0,
                                        padding: '0 20px',
                                        textShadow: `0 0 40px ${activeTerm ? getTermColor(activeTerm.id) : 'rgba(255,255,255,0.2)'}`,
                                        position: 'relative',
                                        zIndex: 2,
                                        display: 'flex',
                                        gap: '1vw'
                                    }}
                                >
                                    {activeTerm?.id === 'ligature' && !showAll ? (
                                        'Affinity'
                                    ) : (
                                        'Typography'
                                    )}
                                </motion.div>

                                {/* Diagram Overlays (only visible to highlight the part) */}
                                {/* Baseline */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('baseline') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '10%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('baseline')}`, zIndex: 1 }}
                                />
                                {isVisible('baseline') && (
                                    <span style={{ position: 'absolute', bottom: '12%', right: '0%', color: getTermColor('baseline'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Baseline</span>
                                )}

                                {/* X-Height — vertical bracket from baseline to top of lowercase + two horizontal guide lines */}
                                {/* X-Height: top horizontal line (top of lowercase) */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('x-height') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '62%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('x-height')}`, zIndex: 1 }}
                                />
                                {/* X-Height: bottom horizontal line (baseline) */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('x-height') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '10%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('x-height')}`, zIndex: 1 }}
                                />
                                {/* X-Height: vertical bracket */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('x-height') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '10%', left: '17%', height: '52%', width: 2, background: getTermColor('x-height'), zIndex: 3 }}
                                >
                                    {/* Top arrow */}
                                    <div style={{ position: 'absolute', top: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: `8px solid ${getTermColor('x-height')}` }} />
                                    {/* Bottom arrow */}
                                    <div style={{ position: 'absolute', bottom: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${getTermColor('x-height')}` }} />
                                    {/* Top horizontal tick */}
                                    <div style={{ position: 'absolute', top: 0, left: -6, width: 14, height: 2, background: getTermColor('x-height') }} />
                                    {/* Bottom horizontal tick */}
                                    <div style={{ position: 'absolute', bottom: 0, left: -6, width: 14, height: 2, background: getTermColor('x-height') }} />
                                </motion.div>
                                {isVisible('x-height') && (
                                    <>
                                        <span style={{ position: 'absolute', bottom: '42%', left: '19%', color: getTermColor('x-height'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>X-Height</span>
                                        <span style={{ position: 'absolute', bottom: '64%', right: '0%', color: getTermColor('x-height'), fontSize: 'clamp(8px, 1.5vw, 12px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', opacity: 0.7 }}>Mean Line</span>
                                        <span style={{ position: 'absolute', bottom: '12%', right: '0%', color: getTermColor('x-height'), fontSize: 'clamp(8px, 1.5vw, 12px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', opacity: 0.7 }}>Base Line</span>
                                    </>
                                )}

                                {/* Midline (middle of letter body) */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('midline') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '36%', left: '-5%', right: '-5%', height: 2, borderTop: `2px solid ${getTermColor('midline')}`, zIndex: 1 }}
                                />
                                {isVisible('midline') && (
                                    <span style={{ position: 'absolute', bottom: '38%', left: '0%', color: getTermColor('midline'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Midline</span>
                                )}

                                {/* Ascender - h */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('ascender') ? 1 : 0 }}
                                    style={{ position: 'absolute', bottom: '58%', left: '83.5%', top: '-5%', width: 2, background: getTermColor('ascender'), zIndex: 3 }}
                                >
                                    <div style={{ position: 'absolute', top: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: `8px solid ${getTermColor('ascender')}` }} />
                                    <div style={{ position: 'absolute', top: 0, left: '-20px', width: '20px', height: '2px', background: getTermColor('ascender') }} />
                                </motion.div>
                                {isVisible('ascender') && (
                                    <span style={{ position: 'absolute', top: '2%', left: '85%', color: getTermColor('ascender'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Ascender</span>
                                )}

                                {/* Descender - g */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible('descender') ? 1 : 0 }}
                                    style={{ position: 'absolute', top: '90%', left: '50.5%', bottom: '-15%', width: 2, background: getTermColor('descender'), zIndex: 3 }}
                                >
                                    <div style={{ position: 'absolute', bottom: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${getTermColor('descender')}` }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '2px', background: getTermColor('descender') }} />
                                </motion.div>
                                {isVisible('descender') && (
                                    <span style={{ position: 'absolute', bottom: '-10%', right: '51%', color: getTermColor('descender'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Descender</span>
                                )}

                                {/* Stem - T */}
                                {isVisible('stem') && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{ position: 'absolute', top: '25%', left: '8%', width: '15px', bottom: '15%', border: `2px dashed ${getTermColor('stem')}`, borderRadius: '10px', zIndex: 3 }}
                                        />
                                        <span style={{ position: 'absolute', top: '15%', left: '7%', color: getTermColor('stem'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Stem</span>
                                    </>
                                )}

                                {/* Counter - o */}
                                {isVisible('counter') && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{ position: 'absolute', bottom: '20%', left: '35%', width: 'clamp(30px, 5vw, 55px)', height: 'clamp(35px, 6vw, 60px)', border: `2px dashed ${getTermColor('counter')}`, borderRadius: '50%', zIndex: 3 }}
                                        />
                                        <span style={{ position: 'absolute', bottom: '35%', left: '33%', color: getTermColor('counter'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Counter</span>
                                    </>
                                )}

                                {/* Terminal - r */}
                                {isVisible('terminal') && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{ position: 'absolute', top: '33%', left: '57%', width: '30px', height: '30px', border: `2px dashed ${getTermColor('terminal')}`, borderRadius: '50%', zIndex: 3 }}
                                        />
                                        <span style={{ position: 'absolute', top: '22%', left: '57%', color: getTermColor('terminal'), fontSize: 'clamp(9px, 2vw, 15px)', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Terminal</span>
                                    </>
                                )}

                                {/* Ligature (ffi in Affinity) */}
                                {activeTerm?.id === 'ligature' && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 0.4, width: '22%' }}
                                        style={{ position: 'absolute', top: '5%', left: '18%', height: '90%', background: activeTerm.color, zIndex: 3, borderRadius: '8px' }}
                                    />
                                )}

                                {/* Leading */}
                                {isVisible('leading') && !showAll && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ position: 'absolute', top: '-10%', bottom: '-10%', left: '0', width: '20px', borderLeft: `2px solid ${getTermColor('leading')}`, borderTop: `2px solid ${getTermColor('leading')}`, borderBottom: `2px solid ${getTermColor('leading')}`, zIndex: 3 }}
                                    />
                                )}

                                {/* Kerning */}
                                {isVisible('kerning') && !showAll && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ position: 'absolute', bottom: '8%', left: '6%', display: 'flex', justifyContent: 'center', zIndex: 4, color: getTermColor('kerning'), fontSize: '3rem', fontWeight: 'bold' }}
                                    >
                                        <span style={{ transform: 'translateX(8px)' }}>↔</span>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    {activeTerm ? (
                        <div className="anatomy-info-panel" style={{ borderLeftColor: activeTerm.color, borderLeftWidth: '3px' }}>
                            <motion.h3 whileHover={{ scale: 1.04 }} style={{
                                background: `linear-gradient(135deg, ${activeTerm.color}, ${activeTerm.color}aa)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                cursor: 'default',
                            }}>
                                {activeTerm.name}
                            </motion.h3>
                            <p>{activeTerm.definition}</p>
                        </div>
                    ) : (
                        <div className="anatomy-info-panel">
                            <p className="anatomy-hint">👆 Click on a term below to explore its meaning and see it highlighted on the diagram above.</p>
                        </div>
                    )}
                </div>

                {/* Term cards grid */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginTop: '2rem' }}>
                    <button
                        onClick={() => {
                            setShowAll(!showAll);
                            if (!showAll) setActiveTerm(null);
                        }}
                        style={{
                            padding: '10px 20px',
                            background: showAll ? 'var(--neon-pink)' : 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            border: `1px solid ${showAll ? 'var(--neon-pink)' : 'rgba(255, 255, 255, 0.2)'}`,
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: showAll ? '0 0 15px var(--neon-pink)' : 'none'
                        }}
                    >
                        {showAll ? 'Hide All Guides' : 'Reveal All Guides'}
                    </button>
                </div>

                <div className="anatomy-terms-grid" style={{ marginTop: 0 }}>
                    {ANATOMY_TERMS.map(term => (
                        <motion.button
                            key={term.id}
                            className={`anatomy-term-btn ${activeTerm?.id === term.id ? 'active' : ''} ${visitedTerms.has(term.id) ? 'visited' : ''}`}
                            onClick={() => handleTermClick(term)}
                            style={{
                                borderLeftColor: visitedTerms.has(term.id) ? term.color : undefined,
                            }}
                        >
                            <h4 style={{ color: activeTerm?.id === term.id ? term.color : undefined, margin: 0, textAlign: 'center' }}>
                                {visitedTerms.has(term.id) ? '✓ ' : ''}<HoverLetters text={term.name} hoverColor={term.color} />
                            </h4>
                        </motion.button>
                    ))}
                </div>

                {/* Progress + Next */}
                <div className="next-btn-container" style={{ marginTop: 32 }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                            {visitedTerms.size} / {ANATOMY_TERMS.length} terms explored
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn-secondary" onClick={onBack}>← Back</button>
                            <button className="btn-primary" onClick={onNext}>
                                Continue to Quiz →
                            </button>
                            <button className="btn-secondary" onClick={onNext}>
                                Skip →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
