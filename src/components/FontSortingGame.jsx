import { useState } from 'react'
import { DndContext, useDraggable, useDroppable, pointerWithin } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverLetters } from './InteractiveHeader'

const ALL_FONTS = [
    { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'serif', sample: 'The art of typography' },
    { name: 'Merriweather', family: "'Merriweather', serif", category: 'serif', sample: 'Classic elegance' },
    { name: 'Lora', family: "'Lora', serif", category: 'serif', sample: 'Timeless design' },
    { name: 'Inter', family: "'Inter', sans-serif", category: 'sans-serif', sample: 'Modern & clean' },
    { name: 'Roboto', family: "'Roboto', sans-serif", category: 'sans-serif', sample: 'Digital first' },
    { name: 'Open Sans', family: "'Open Sans', sans-serif", category: 'sans-serif', sample: 'Universal design' },
    { name: 'Pacifico', family: "'Pacifico', cursive", category: 'script', sample: 'Flowing beauty' },
    { name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'script', sample: 'Graceful writing' },
    { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'display', sample: 'BOLD STATEMENT' },
    { name: 'Lobster', family: "'Lobster', cursive", category: 'display', sample: 'Eye catching' },
    { name: 'Abril Fatface', family: "'Abril Fatface', serif", category: 'display', sample: 'Dramatic headlines' },
    { name: 'Fira Code', family: "'Fira Code', monospace", category: 'monospace', sample: 'const x = 42;' },
    { name: 'Space Mono', family: "'Space Mono', monospace", category: 'monospace', sample: 'print("hello")' },
]

const CATEGORIES = [
    { id: 'serif', name: 'Serif', color: '#c94070' },
    { id: 'sans-serif', name: 'Sans-Serif', color: '#4a7bb5' },
    { id: 'script', name: 'Script', color: '#d65882' },
    { id: 'display', name: 'Display', color: '#c07830' },
    { id: 'monospace', name: 'Monospace', color: '#2e8b7a' },
]

function shuffleArray(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function DraggableFont({ font, id }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? (window.innerWidth > 768 ? 1.05 : 1.02) : 1})` : undefined,
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.9 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="sorting-font-display">
            <div className="font-preview" style={{ fontFamily: font.family }}>
                {font.sample}
            </div>
            <div className="font-name">{font.name}</div>
        </div>
    )
}

function DroppableBucket({ category, count, isOver, flashType }) {
    const { setNodeRef } = useDroppable({ id: category.id })

    let borderClass = ''
    if (isOver) borderClass = 'over-bucket'
    if (flashType === 'correct') borderClass = 'correct-flash'
    if (flashType === 'incorrect') borderClass = 'incorrect-flash'

    return (
        <div ref={setNodeRef} className={`sorting-bucket ${borderClass}`} data-cat={category.id}>
            <h4 style={{ color: category.color }}><HoverLetters text={category.name} hoverColor={category.color} /></h4>
            <div className="bucket-count">{count} sorted</div>
        </div>
    )
}

export default function FontSortingGame({ onNext, onBack, onScore, onGoHome }) {
    const [shuffledFonts] = useState(() => shuffleArray(ALL_FONTS))
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [bucketCounts, setBucketCounts] = useState({ serif: 0, 'sans-serif': 0, script: 0, display: 0, monospace: 0 })
    const [flashBucket, setFlashBucket] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [activeId, setActiveId] = useState(null)
    const [overId, setOverId] = useState(null)

    const currentFont = shuffledFonts[currentIndex]

    const handleDragStart = (event) => {
        setActiveId(event.active.id)
    }

    const handleDragMove = (event) => {
        setOverId(event.over?.id || null)
    }

    const handleDragEnd = (event) => {
        const { over } = event
        setActiveId(null)
        setOverId(null)

        if (over && over.id) {
            handleDrop(over.id)
        }
    }

    const handleDrop = (categoryId) => {
        if (gameOver) return

        const isCorrect = currentFont.category === categoryId

        if (isCorrect) {
            setScore(prev => prev + 1)
            onScore(1)
            setFlashBucket({ id: categoryId, type: 'correct' })
            setFeedback({ type: 'correct', message: `✅ Correct! ${currentFont.name} is a ${currentFont.category} typeface.` })
        } else {
            setFlashBucket({ id: categoryId, type: 'incorrect' })
            setFeedback({ type: 'incorrect', message: `❌ Wrong! ${currentFont.name} is actually a ${currentFont.category} typeface.` })
        }

        setBucketCounts(prev => ({ ...prev, [currentFont.category]: prev[currentFont.category] + 1 }))

        setTimeout(() => {
            setFlashBucket(null)
            setFeedback(null)
            if (currentIndex + 1 >= shuffledFonts.length) {
                setGameOver(true)
            } else {
                setCurrentIndex(prev => prev + 1)
            }
        }, 1500)
    }

    const handleSkipFont = () => {
        if (gameOver) return
        if (currentIndex + 1 >= shuffledFonts.length) {
            setGameOver(true)
        } else {
            setCurrentIndex(prev => prev + 1)
        }
    }

    if (gameOver) {
        return (
            <div className="section">
                <HomeButton onClick={onGoHome} />
                <InteractiveHeader
                    sectionNumber="Level 4 — Complete!"
                    title="Font Sorting Results"
                    description={`You scored ${score} out of ${shuffledFonts.length} fonts correctly!`}
                    accentColor="#10b981"
                    titleColor="#f59e0b"
                />
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: 24,
                        animation: 'bounceIn 0.8s ease',
                    }}>
                        {score >= shuffledFonts.length * 0.8 ? '🏆🎉' : score >= shuffledFonts.length * 0.5 ? '👍' : '💪📚'}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.05rem' }}>
                        {score >= shuffledFonts.length * 0.8
                            ? 'Amazing! You really know your typefaces!'
                            : score >= shuffledFonts.length * 0.5
                                ? 'Good job! Keep practicing to perfect your eye.'
                                : 'Keep learning! Review the typeface explorer again.'}
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>
                            Continue to Serif vs Sans →
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="section">
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Level 4"
                title="Font Sorting Game"
                description="Drag the font below into the correct category bucket!"
                accentColor="#4285f4"
                titleColor="#f59e0b"
            />

            <div className="sorting-game">
                <div className="quiz-score-bar">
                    <span className="score-text">Score: <span className="score-value">{score}/{shuffledFonts.length}</span></span>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: 12 }}>
                        Font {currentIndex + 1} of {shuffledFonts.length}
                    </span>
                    <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={handleSkipFont}>
                        Skip →
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem', marginLeft: 8, borderColor: 'rgba(232,69,122,.4)', color: '#e8457a' }} onClick={onNext}>
                        Skip Game ⏭
                    </button>
                </div>

                <DndContext
                    onDragStart={handleDragStart}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                    collisionDetection={pointerWithin}
                >
                    {/* Font display (Draggable) */}
                    <div style={{ minHeight: '160px', position: 'relative', marginTop: '20px' }}>
                        {flashBucket ? (
                            <div className="sorting-font-display" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                                <div className="font-preview" style={{ fontFamily: currentFont.family }}>
                                    {currentFont.sample}
                                </div>
                                <div className="font-name">{currentFont.name}</div>
                            </div>
                        ) : (
                            <DraggableFont font={currentFont} id="font-card" />
                        )}
                    </div>

                    {/* Category buckets (Droppable) */}
                    <div className="sorting-buckets" style={{ marginTop: '24px' }}>
                        {CATEGORIES.map(cat => (
                            <DroppableBucket
                                key={cat.id}
                                category={cat}
                                count={bucketCounts[cat.id]}
                                isOver={overId === cat.id}
                                flashType={flashBucket?.id === cat.id ? flashBucket.type : null}
                            />
                        ))}
                    </div>
                </DndContext>

                {/* Feedback toast */}
                <div className={`feedback-toast ${feedback ? 'visible' : ''} ${feedback?.type || ''}`}>
                    {feedback?.message}
                </div>
            </div>
        </div>
    )
}
