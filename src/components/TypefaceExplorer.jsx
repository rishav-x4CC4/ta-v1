import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverLetters, HoverWords } from './InteractiveHeader'

const TYPEFACE_DATA = [
    {
        id: 'serif',
        name: 'Serif',
        description: 'Typefaces with small decorative strokes (serifs) at the ends of letter strokes. They convey tradition, authority, and elegance. Often used in print, books, and formal documents.',
        features: ['Decorative end-strokes', 'High readability in print', 'Traditional & formal feel', 'Variable stroke width'],
        examples: [
            { name: 'Playfair Display', family: "'Playfair Display', serif", sample: 'The quick brown fox' },
            { name: 'Merriweather', family: "'Merriweather', serif", sample: 'Jumps over the lazy dog' },
            { name: 'Lora', family: "'Lora', serif", sample: 'Typography is beautiful' },
            { name: 'Source Serif 4', family: "'Source Serif 4', serif", sample: 'Elegance in every letter' },
        ],
        color: '#c94070',
    },
    {
        id: 'sans-serif',
        name: 'Sans-Serif',
        description: 'Typefaces without decorative strokes at the ends of letters ("sans" means "without"). They appear clean, modern, and minimal. Dominant in digital/screen design.',
        features: ['No decorative end-strokes', 'Clean & modern appearance', 'Great for screens', 'Uniform stroke width'],
        examples: [
            { name: 'Inter', family: "'Inter', sans-serif", sample: 'The quick brown fox' },
            { name: 'Roboto', family: "'Roboto', sans-serif", sample: 'Jumps over the lazy dog' },
            { name: 'Open Sans', family: "'Open Sans', sans-serif", sample: 'Clean digital typography' },
        ],
        color: '#4a7bb5',
    },
    {
        id: 'script',
        name: 'Script',
        description: 'Typefaces that mimic handwriting or calligraphic styles, with connected or flowing letterforms. They feel personal, elegant, or casual depending on the style.',
        features: ['Flowing, connected letters', 'Mimics handwriting', 'Decorative & personal', 'Best for headlines/accents'],
        examples: [
            { name: 'Pacifico', family: "'Pacifico', cursive", sample: 'The quick brown fox' },
            { name: 'Dancing Script', family: "'Dancing Script', cursive", sample: 'Jumps over the lazy dog' },
        ],
        color: '#d65882',
    },
    {
        id: 'display',
        name: 'Display',
        description: 'Typefaces designed specifically for large sizes — headlines, posters, and attention-grabbing text. They prioritize visual impact over body-text readability.',
        features: ['Designed for large sizes', 'High visual impact', 'Unique & decorative', 'Not for body text'],
        examples: [
            { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", sample: 'THE QUICK BROWN FOX' },
            { name: 'Lobster', family: "'Lobster', cursive", sample: 'Jumps over the lazy dog' },
            { name: 'Abril Fatface', family: "'Abril Fatface', serif", sample: 'Bold Typography' },
            { name: 'Righteous', family: "'Righteous', sans-serif", sample: 'Stand out from the crowd' },
        ],
        color: '#c07830',
    },
    {
        id: 'monospace',
        name: 'Monospace',
        description: 'Typefaces where every character occupies the same horizontal width. Originally designed for typewriters, now widely used in coding, terminals, and tabular data.',
        features: ['Equal character widths', 'Code & tabular data', 'Typewriter aesthetic', 'Great for alignment'],
        examples: [
            { name: 'Fira Code', family: "'Fira Code', monospace", sample: 'console.log("hello")' },
            { name: 'Space Mono', family: "'Space Mono', monospace", sample: 'const x = 42;' },
        ],
        color: '#2e8b7a',
    },
]

export default function TypefaceExplorer({ onNext, onBack, onGoHome }) {
    const [expandedCard, setExpandedCard] = useState(null)
    const [visitedCards, setVisitedCards] = useState(new Set())

    const handleCardClick = (typeface) => {
        setExpandedCard(typeface)
        setVisitedCards(prev => new Set([...prev, typeface.id]))
    }

    return (
        <div className="section">
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Level 3"
                title="Typeface Classification"
                description="Explore the 5 major typeface categories. Click each card to dive deeper."
                accentColor="#a855f7"
                titleColor="#c9b08b"
            />

            <div className="typeface-cards">
                {TYPEFACE_DATA.map(tf => (
                    <motion.div
                        layoutId={`card-container-${tf.id}`}
                        key={tf.id}
                        className="typeface-card"
                        data-category={tf.id}
                        onClick={() => handleCardClick(tf)}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div layoutId={`card-header-${tf.id}`} className="typeface-card-header">
                            <motion.div layoutId={`card-category-${tf.id}`} className="typeface-card-category">
                                {visitedCards.has(tf.id) ? '✓ ' : ''}{tf.id}
                            </motion.div>
                            <motion.div layoutId={`card-title-${tf.id}`} className="typeface-card-title">{tf.name}</motion.div>
                            <motion.div className="typeface-card-description">{tf.description.substring(0, 150)}...</motion.div>
                        </motion.div>
                        <div className="typeface-card-body">
                            <div className="typeface-examples">
                                {tf.examples.slice(0, 2).map(ex => (
                                    <div key={ex.name} className="typeface-example">
                                        <div className="typeface-example-name">{ex.name}</div>
                                        <div
                                            className="typeface-example-preview"
                                            style={{ fontFamily: ex.family, outline: 'none' }}
                                        >
                                            {ex.sample}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Overlay */}
            <AnimatePresence>
                {expandedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="typeface-expanded-overlay"
                        onClick={() => setExpandedCard(null)}
                    >
                        <motion.div
                            layoutId={`card-container-${expandedCard.id}`}
                            className="typeface-expanded-card"
                            onClick={e => e.stopPropagation()}
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)' }}
                        >
                            <button className="close-btn" onClick={() => setExpandedCard(null)}>×</button>
                            <div style={{ clear: 'both' }}>
                                <motion.div layoutId={`card-category-${expandedCard.id}`} className="typeface-card-category" style={{ color: expandedCard.color, marginBottom: 8 }}>
                                    {expandedCard.id}
                                </motion.div>
                                <motion.h2 layoutId={`card-title-${expandedCard.id}`} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>
                                    {expandedCard.name}
                                </motion.h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                                    <HoverWords text={expandedCard.description} hoverColor={expandedCard.color} />
                                </p>

                                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>
                                    <HoverLetters text="Key Features" hoverColor={expandedCard.color} />
                                </h4>
                                <div className="typeface-card-features" style={{ marginBottom: 24 }}>
                                    {expandedCard.features.map((f, i) => (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                                            key={f} className="typeface-feature-tag">{f}
                                        </motion.span>
                                    ))}
                                </div>

                                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>
                                    <HoverLetters text={`Examples (${expandedCard.examples.length})`} hoverColor={expandedCard.color} />
                                </h4>
                                <div className="typeface-examples">
                                    {expandedCard.examples.map((ex, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                                            key={ex.name} className="typeface-example"
                                        >
                                            <div className="typeface-example-name">{ex.name}</div>
                                            <div
                                                className="typeface-example-preview"
                                                style={{ fontFamily: ex.family, fontSize: '1.8rem', outline: 'none', caretColor: expandedCard.color }}
                                                contentEditable={true}
                                                suppressContentEditableWarning={true}
                                                spellCheck={false}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {ex.sample}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress + Next */}
            <div className="next-btn-container" style={{ marginTop: 40 }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                        {visitedCards.size} / {TYPEFACE_DATA.length} categories explored
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>
                            Continue to Sorting Game →
                        </button>
                        <button className="btn-secondary" onClick={onNext}>
                            Skip →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
