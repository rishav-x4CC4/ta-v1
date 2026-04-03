import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ANATOMY_TERMS from '../data/anatomyTerms'
import InteractiveHeader, { HomeButton } from './InteractiveHeader'

const QUESTIONS = ANATOMY_TERMS

const ALL_LABELS = QUESTIONS.map(q => q.name)

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function AnatomyQuiz({ onNext, onBack, onScore, onGoHome }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [results, setResults] = useState([])

    const choices = useMemo(() => {
        return QUESTIONS.map(q => {
            const wrong = shuffle(ALL_LABELS.filter(l => l !== q.name)).slice(0, 3)
            return shuffle([q.name, ...wrong])
        })
    }, [])

    const question = QUESTIONS[currentQ]
    const isFinished = currentQ >= QUESTIONS.length

    const handleChoice = (choice) => {
        if (answered) return
        setAnswered(true)
        const correct = choice === question.name

        if (correct) {
            setScore(prev => prev + 1)
            onScore(1)
            setFeedback({ type: 'correct', message: `✅ Correct! ${question.definition}` })
        } else {
            setFeedback({ type: 'incorrect', message: `❌ It's "${question.name}". ${question.definition}` })
        }

        setResults(prev => [...prev, { id: question.id, correct, chosen: choice }])
    }

    const handleNext = () => {
        setFeedback(null)
        setAnswered(false)
        setCurrentQ(prev => prev + 1)
    }

    const isMarkerVisible = (termId) => {
        return question.id === termId;
    };

    const isLabelVisible = (termId) => {
        return answered && question.id === termId;
    };

    const getTermColor = (termId) => {
        return QUESTIONS.find(q => q.id === termId)?.color || 'white';
    };

    if (isFinished) {
        return (
            <div className="section">
                <HomeButton onClick={onGoHome} />
                <InteractiveHeader
                    sectionNumber="Level 2 — Complete!"
                    title="Anatomy Quiz Results"
                    description={`You scored ${score} out of ${QUESTIONS.length}!`}
                    accentColor="#10b981"
                    titleColor="#00f0ff"
                />
                <div style={{ maxWidth: 600, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10, marginBottom: 32 }}>
                        {results.map((r, i) => (
                            <div key={i} style={{
                                padding: '12px 16px',
                                background: r.correct ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 0, 85, 0.1)',
                                border: `1px solid ${r.correct ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 85, 0.3)'}`,
                                borderRadius: 10,
                                fontSize: '0.85rem',
                            }}>
                                <span style={{ fontWeight: 700, color: r.correct ? '#00f0ff' : '#ff0055' }}>
                                    {r.correct ? '✓' : '✗'}
                                </span>{' '}
                                {QUESTIONS[i].name}
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>Continue to Typefaces →</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="section">
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Level 2"
                title="Anatomy Quiz"
                description="Identify the highlighted element on the diagram below."
                accentColor="#f59e0b"
                titleColor="#e8457a"
            />

            <div className="quiz-container">
                <div className="quiz-score-bar">
                    <span className="score-text">Score: <span className="score-value" style={{ color: 'var(--accent-1)' }}>{score}/{QUESTIONS.length}</span></span>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: 12 }}>
                        Question {currentQ + 1} of {QUESTIONS.length}
                    </span>
                    <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={handleNext}>
                        Skip →
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem', marginLeft: 8, borderColor: 'rgba(232,69,122,.4)', color: '#e8457a' }} onClick={onNext}>
                        Skip Quiz ⏭
                    </button>
                </div>

                <div className="quiz-image-container" style={{ position: 'relative', height: 'clamp(220px, 45vw, 350px)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-glass)', background: 'var(--bg-card)' }}>
                    {/* Comprehensive DOM-based Anatomy Diagram */}
                    <div style={{
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: 200, height: 200, background: 'rgba(0, 240, 255, 0.1)', filter: 'blur(50px)' }} />
                        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 200, height: 200, background: 'rgba(232, 69, 122, 0.1)', filter: 'blur(50px)' }} />

                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {/* The Word */}
                            <motion.div
                                animate={answered ? { scale: 1.05 } : { scale: 1 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    fontSize: 'clamp(4rem, 11vw, 11rem)',
                                    fontFamily: "'Lora', serif",
                                    color: 'white',
                                    lineHeight: 1,
                                    margin: 0,
                                    padding: '0 20px',
                                    textShadow: `0 0 40px ${answered ? question.color : 'rgba(255,255,255,0.2)'}`,
                                    position: 'relative',
                                    zIndex: 2,
                                    display: 'flex',
                                    gap: '1vw'
                                }}
                            >
                                {question.id === 'ligature' ? (
                                    'Affinity'
                                ) : (
                                    'Typography'
                                )}
                            </motion.div>

                            {/* Diagram Overlays (only visible to highlight the part) */}
                            {/* Baseline */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('baseline') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '10%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('baseline')}`, zIndex: 1 }}
                            />
                            {isLabelVisible('baseline') && (
                                <span style={{ position: 'absolute', bottom: '12%', right: '0%', color: getTermColor('baseline'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Baseline</span>
                            )}

                            {/* X-Height — vertical bracket from baseline to top of lowercase + two horizontal guide lines */}
                            {/* X-Height: top horizontal line (mean line) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('x-height') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '62%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('x-height')}`, zIndex: 1 }}
                            />
                            {/* X-Height: bottom horizontal line (baseline) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('x-height') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '10%', left: '-5%', right: '-5%', height: 2, borderTop: `2px dashed ${getTermColor('x-height')}`, zIndex: 1 }}
                            />
                            {/* X-Height: vertical bracket */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('x-height') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '10%', left: '17%', height: '52%', width: 2, background: getTermColor('x-height'), zIndex: 3 }}
                            >
                                <div style={{ position: 'absolute', top: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: `8px solid ${getTermColor('x-height')}` }} />
                                <div style={{ position: 'absolute', bottom: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${getTermColor('x-height')}` }} />
                                <div style={{ position: 'absolute', top: 0, left: -6, width: 14, height: 2, background: getTermColor('x-height') }} />
                                <div style={{ position: 'absolute', bottom: 0, left: -6, width: 14, height: 2, background: getTermColor('x-height') }} />
                            </motion.div>
                            {isLabelVisible('x-height') && (
                                <>
                                    <span style={{ position: 'absolute', bottom: '42%', left: '19%', color: getTermColor('x-height'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>X-Height</span>
                                    <span style={{ position: 'absolute', bottom: '64%', right: '0%', color: getTermColor('x-height'), fontSize: '12px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', opacity: 0.7 }}>Mean Line</span>
                                    <span style={{ position: 'absolute', bottom: '12%', right: '0%', color: getTermColor('x-height'), fontSize: '12px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)', opacity: 0.7 }}>Base Line</span>
                                </>
                            )}

                            {/* Ascender - h */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('ascender') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '58%', left: '83.5%', top: '-5%', width: 2, background: getTermColor('ascender'), zIndex: 3 }}
                            >
                                <div style={{ position: 'absolute', top: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: `8px solid ${getTermColor('ascender')}` }} />
                                <div style={{ position: 'absolute', top: 0, left: '-20px', width: '20px', height: '2px', background: getTermColor('ascender') }} />
                            </motion.div>
                            {isLabelVisible('ascender') && (
                                <span style={{ position: 'absolute', top: '2%', left: '85%', color: getTermColor('ascender'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Ascender</span>
                            )}

                            {/* Descender - g */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('descender') ? 1 : 0 }}
                                style={{ position: 'absolute', top: '90%', left: '50.5%', bottom: '-15%', width: 2, background: getTermColor('descender'), zIndex: 3 }}
                            >
                                <div style={{ position: 'absolute', bottom: -5, left: -4, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${getTermColor('descender')}` }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '2px', background: getTermColor('descender') }} />
                            </motion.div>
                            {isLabelVisible('descender') && (
                                <span style={{ position: 'absolute', bottom: '-10%', right: '51%', color: getTermColor('descender'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Descender</span>
                            )}

                            {/* Stem - T */}
                            {isMarkerVisible('stem') && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ position: 'absolute', top: '25%', left: '8%', width: '15px', bottom: '15%', border: `2px dashed ${getTermColor('stem')}`, borderRadius: '10px', zIndex: 3 }}
                                    />
                                    {isLabelVisible('stem') && <span style={{ position: 'absolute', top: '15%', left: '7%', color: getTermColor('stem'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Stem</span>}
                                </>
                            )}

                            {/* Counter - o */}
                            {isMarkerVisible('counter') && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ position: 'absolute', bottom: '20%', left: '35%', width: 'clamp(30px, 5vw, 55px)', height: 'clamp(35px, 6vw, 60px)', border: `2px dashed ${getTermColor('counter')}`, borderRadius: '50%', zIndex: 3 }}
                                    />
                                    {isLabelVisible('counter') && <span style={{ position: 'absolute', bottom: '35%', left: '33%', color: getTermColor('counter'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Counter</span>}
                                </>
                            )}

                            {/* Terminal - r */}
                            {isMarkerVisible('terminal') && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ position: 'absolute', top: '33%', left: '57%', width: '30px', height: '30px', border: `2px dashed ${getTermColor('terminal')}`, borderRadius: '50%', zIndex: 3 }}
                                    />
                                    {isLabelVisible('terminal') && <span style={{ position: 'absolute', top: '22%', left: '57%', color: getTermColor('terminal'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Terminal</span>}
                                </>
                            )}

                            {/* Ligature (ffi in Affinity) */}
                            {isMarkerVisible('ligature') && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 0.4, width: '22%' }}
                                    style={{ position: 'absolute', top: '5%', left: '18%', height: '90%', background: getTermColor('ligature'), zIndex: 3, borderRadius: '8px' }}
                                />
                            )}

                            {/* Leading (brackets showing vertical space) */}
                            {isMarkerVisible('leading') && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ position: 'absolute', top: '-10%', bottom: '-10%', left: '0', width: '20px', borderLeft: `2px solid ${getTermColor('leading')}`, borderTop: `2px solid ${getTermColor('leading')}`, borderBottom: `2px solid ${getTermColor('leading')}`, zIndex: 3 }}
                                />
                            )}

                            {/* Kerning (arrows between Ty in Typography) */}
                            {isMarkerVisible('kerning') && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ position: 'absolute', bottom: '8%', left: '6%', display: 'flex', justifyContent: 'center', zIndex: 4, color: getTermColor('kerning'), fontSize: '3rem', fontWeight: 'bold' }}
                                >
                                    <span style={{ transform: 'translateX(8px)' }}>↔</span>
                                </motion.div>
                            )}

                            {/* Midline (middle of letter body) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isMarkerVisible('midline') ? 1 : 0 }}
                                style={{ position: 'absolute', bottom: '36%', left: '-5%', right: '-5%', height: 2, borderTop: `2px solid ${getTermColor('midline')}`, zIndex: 1 }}
                            />
                            {isLabelVisible('midline') && (
                                <span style={{ position: 'absolute', bottom: '38%', left: '0%', color: getTermColor('midline'), fontSize: '15px', fontWeight: 'bold', zIndex: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Midline</span>
                            )}
                        </div>
                    </div>

                    {/* Simplified Overlay Helpers */}
                    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', padding: '6px 16px', borderRadius: 20, border: `1px solid ${question.color}`, zIndex: 10 }}>
                        <span style={{ color: question.color, fontWeight: 'bold', fontSize: '0.9rem' }}>Highlight matches: {question.color}</span>
                    </div>
                </div>

                {/* Multiple choice answers */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 12,
                    width: '100%',
                    maxWidth: 500,
                    margin: '0 auto',
                }}>
                    {choices[currentQ].map(choice => {
                        const isCorrectAnswer = choice === question.name
                        const wasChosen = answered && results.length > 0 && results[results.length - 1]?.chosen === choice
                        let btnStyle = {}

                        if (answered) {
                            if (isCorrectAnswer) {
                                btnStyle = {
                                    background: 'rgba(46, 139, 122, 0.12)',
                                    borderColor: '#2e8b7a',
                                    color: '#2e8b7a',
                                }
                            } else if (wasChosen && !isCorrectAnswer) {
                                btnStyle = {
                                    background: 'rgba(201, 64, 112, 0.12)',
                                    borderColor: '#c94070',
                                    color: '#c94070',
                                }
                            } else {
                                btnStyle = { opacity: 0.4 }
                            }
                        }

                        return (
                            <button
                                key={choice}
                                onClick={() => handleChoice(choice)}
                                style={{
                                    padding: '14px 20px',
                                    background: 'var(--bg-card)',
                                    border: '1.5px solid var(--border-glass)',
                                    borderRadius: 12,
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-primary)',
                                    cursor: answered ? 'default' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    ...btnStyle,
                                }}
                                onMouseEnter={e => {
                                    if (!answered) {
                                        e.target.style.borderColor = 'var(--accent-1)'
                                        e.target.style.background = 'var(--bg-card-hover)'
                                        e.target.style.transform = 'translateY(-2px)'
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!answered) {
                                        e.target.style.borderColor = 'var(--border-glass)'
                                        e.target.style.background = 'var(--bg-card)'
                                        e.target.style.transform = 'translateY(0)'
                                    }
                                }}
                            >
                                {choice}
                            </button>
                        )
                    })}
                </div>

                {/* Feedback panel */}
                <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatePresence mode="wait">
                        {feedback && (
                            <motion.div
                                key={feedback.message}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                style={{
                                    padding: '16px 24px',
                                    background: feedback.type === 'correct' ? 'rgba(46,139,122,0.08)' : 'rgba(201,64,112,0.08)',
                                    border: `1px solid ${feedback.type === 'correct' ? 'rgba(46,139,122,0.3)' : 'rgba(201,64,112,0.3)'}`,
                                    borderRadius: 12,
                                    color: feedback.type === 'correct' ? '#2e8b7a' : '#c94070',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    width: '100%',
                                    maxWidth: 500,
                                    margin: '0 auto',
                                }}
                            >
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Next question button */}
                {answered && (
                    <div className="next-btn-container">
                        <button className="btn-secondary" onClick={handleNext}>
                            {currentQ + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
