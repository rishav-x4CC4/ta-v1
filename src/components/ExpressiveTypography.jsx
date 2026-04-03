import { useState } from 'react'
import InteractiveHeader, { HomeButton, HoverLetters } from './InteractiveHeader'

/* -- Emotion compositions data -- */
const EMOTIONS = [
    {
        id: 'joy',
        name: 'Joy',
        emoji: '☀',
        accent: '#f59e0b',
        accentLight: 'rgba(245, 158, 11, 0.12)',
        gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #fbbf24 100%)',
        bgColor: '#fffbeb',
        rationale: [
            'Rounded, bouncy typeface (Dancing Script) mirrors the organic spontaneity of happiness.',
            'Ascending baseline & scattered sizes create visual "bubbling" energy — joy is uncontainable.',
            'Warm golden-amber palette triggers subconscious associations with sunlight and warmth.',
            'Generous letter-spacing lets each letter breathe — joy is open and expansive.',
            'Mixed case breaks formality; happiness doesn\'t follow rules.',
        ],
    },
    {
        id: 'fear',
        name: 'Fear',
        emoji: '👁',
        accent: '#6b21a8',
        accentLight: 'rgba(107, 33, 168, 0.1)',
        gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        bgColor: '#0d1117',
        rationale: [
            'Extreme contrast between massive & tiny text replicates the disorientation of fear.',
            'Tight, compressed letter-spacing creates claustrophobic tension — fear suffocates.',
            'Dark background with low-contrast grey text forces the eye to strain — unease is the goal.',
            'Fragmented words across the canvas mimic racing, panicked thoughts.',
            'Monospace font (Source Code Pro) for clinical coldness; Playfair Display for gothic unease.',
        ],
    },
    {
        id: 'anger',
        name: 'Anger',
        emoji: '🔥',
        accent: '#dc2626',
        accentLight: 'rgba(220, 38, 38, 0.12)',
        gradient: 'linear-gradient(135deg, #1a0000 0%, #3b0000 50%, #7f1d1d 100%)',
        bgColor: '#1c1010',
        rationale: [
            'ALL CAPS with maximum weight (900) conveys shouting — anger demands to be heard.',
            'Tight negative letter-spacing crushes letters together — anger is pressurized.',
            'Red-on-black is the universal danger palette; the eye cannot ignore it.',
            'Sharp, geometric sans-serif (Inter/Montserrat) — anger has no soft edges.',
            'Text breaking out of alignment represents loss of control.',
        ],
    },
    {
        id: 'serenity',
        name: 'Serenity',
        emoji: '🌿',
        accent: '#0d9488',
        accentLight: 'rgba(13, 148, 136, 0.08)',
        gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
        bgColor: '#f0fdfa',
        rationale: [
            'Ultra-light font weight (200) — serenity is weightless, it floats.',
            'Extreme letter-spacing (0.5em+) lets silence exist between letters — peace needs space.',
            'Centered, symmetrical layout creates visual balance and calm.',
            'Cool teal/mint palette reduces physiological arousal — scientifically calming.',
            'Serif typeface (Lora) with gentle curves evokes timelessness and quiet dignity.',
        ],
    },
    {
        id: 'excitement',
        name: 'Excitement',
        emoji: '⚡',
        accent: '#e11d48',
        accentLight: 'rgba(225, 29, 72, 0.1)',
        gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #fbcfe8 100%)',
        bgColor: '#fdf2f8',
        rationale: [
            'Mixed scales (tiny to massive) create visual rhythm — excitement is dynamic.',
            'Diagonal compositions break the grid — excitement defies structure.',
            'Bold, saturated magenta/pink palette is high-energy and attention-grabbing.',
            'Exclamation marks and stylistic flourishes amplify the sense of urgency.',
            'Multiple typefaces collide — excitement is chaotic and multi-layered.',
        ],
    },
    {
        id: 'melancholy',
        name: 'Melancholy',
        emoji: '🌧',
        accent: '#6b7280',
        accentLight: 'rgba(107, 114, 128, 0.08)',
        gradient: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
        bgColor: '#f3f4f6',
        rationale: [
            'Light grey text on slightly lighter grey — melancholy fades, it doesn\'t demand attention.',
            'Descending baseline makes text literally sink — sadness pulls things down.',
            'Generous leading (line-height) creates emptiness between lines — loneliness is spatial.',
            'Italic serif (Lora italic) conveys vulnerability and introspection.',
            'Right-aligned text feels like thoughts trailing off, incomplete.',
        ],
    },
]

function JoyComposition() {
    return (
        <div style={{
            background: '#fffbeb', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
        }}>
            {/* Background sparkles */}
            {['✦', '✧', '—', '✦', '✧', '—', '✦', '✧'].map((s, i) => (
                <span key={i} style={{
                    position: 'absolute', fontSize: [14, 20, 10, 16, 24, 8, 18, 12][i],
                    color: '#fbbf24', opacity: [.3, .2, .4, .25, .15, .35, .2, .3][i],
                    top: `${[8, 15, 70, 82, 25, 60, 45, 90][i]}%`,
                    left: `${[5, 80, 12, 75, 92, 35, 55, 20][i]}%`,
                    animation: `float ${2 + i * 0.3}s ease-in-out infinite alternate`,
                }}>{s}</span>
            ))}

            <div style={{
                fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem',
                color: '#d97706', letterSpacing: '.3em', textTransform: 'uppercase',
                marginBottom: 16, fontWeight: 400,
            }}>the feeling of</div>

            <div style={{
                fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(5rem, 12vw, 9rem)',
                fontWeight: 700, color: '#92400e', lineHeight: 0.9,
                textAlign: 'center', marginBottom: 20,
                textShadow: '3px 3px 0 rgba(251, 191, 36, 0.3)',
            }}>
                <span style={{ display: 'inline-block', transform: 'rotate(-3deg) translateY(-8px)' }}>P</span>
                <span style={{ display: 'inline-block', transform: 'rotate(2deg) translateY(4px)' }}>u</span>
                <span style={{ display: 'inline-block', transform: 'rotate(-1deg) translateY(-12px)' }}>r</span>
                <span style={{ display: 'inline-block', transform: 'rotate(4deg) translateY(2px)' }}>e</span>
                <span style={{ display: 'inline-block', width: 30 }}></span>
                <span style={{ display: 'inline-block', transform: 'rotate(-2deg) translateY(-6px)' }}>J</span>
                <span style={{ display: 'inline-block', transform: 'rotate(3deg) translateY(8px)' }}>o</span>
                <span style={{ display: 'inline-block', transform: 'rotate(-5deg) translateY(-4px)' }}>y</span>
                <span style={{ display: 'inline-block', transform: 'rotate(6deg) translateY(6px)', color: '#f59e0b' }}>!</span>
            </div>

            <div style={{
                display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center',
                marginBottom: 24,
            }}>
                {['laughter', 'sunshine', 'dance', 'bloom'].map((word, i) => (
                    <span key={word} style={{
                        fontFamily: "'Lora', serif",
                        fontSize: ['.95rem', '1.1rem', '1.3rem', '1rem'][i],
                        color: '#b45309', fontWeight: [400, 500, 600, 400][i],
                        letterSpacing: '.25em', fontStyle: 'italic',
                        opacity: .7, textTransform: 'lowercase',
                        transform: `translateY(${[-4, 6, -2, 8][i]}px)`,
                    }}>{word}</span>
                ))}
            </div>

            <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: '.85rem',
                color: '#d97706', letterSpacing: '.5em', fontWeight: 300,
                textTransform: 'uppercase', textAlign: 'center',
                borderTop: '1px solid rgba(217, 119, 6, 0.15)', paddingTop: 20,
                maxWidth: 400,
            }}>
                happiness rises
            </div>
        </div>
    )
}

function FearComposition() {
    return (
        <div style={{
            background: '#0d1117', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
        }}>
            {/* Whispered words scattered */}
            {['watching', 'closer', 'behind you', 'listen', 'run'].map((w, i) => (
                <span key={w} style={{
                    position: 'absolute',
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: ['.55rem', '.5rem', '.6rem', '.45rem', '.7rem'][i],
                    color: 'rgba(255,255,255,0.06)',
                    top: `${[12, 35, 75, 55, 88][i]}%`,
                    left: `${[70, 15, 60, 85, 8][i]}%`,
                    letterSpacing: '.3em', textTransform: 'uppercase',
                }}>{w}</span>
            ))}

            <div style={{
                fontFamily: "'Source Code Pro', monospace", fontSize: '.65rem',
                color: 'rgba(255,255,255,0.15)', letterSpacing: '.4em',
                textTransform: 'uppercase', marginBottom: 40,
            }}>something is wrong</div>

            <div style={{ position: 'relative', marginBottom: 48 }}>
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(5rem, 14vw, 10rem)',
                    fontWeight: 900, color: 'rgba(255,255,255,0.08)',
                    lineHeight: 0.85, letterSpacing: '-.04em',
                }}>FEAR</div>
                <div style={{
                    position: 'absolute', bottom: 8, left: 4,
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: '.7rem', color: 'rgba(147, 51, 234, 0.5)',
                    letterSpacing: '.3em',
                }}>f—e—a—r</div>
            </div>

            <div style={{
                fontFamily: "'Lora', serif", fontStyle: 'italic',
                fontSize: '1.4rem', fontWeight: 400,
                color: 'rgba(255,255,255,0.12)', lineHeight: 2,
                maxWidth: 350, letterSpacing: '.08em',
            }}>
                <span style={{ color: 'rgba(147, 51, 234, 0.4)' }}>the silence</span>{' '}
                that screams,{' '}
                <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.06)', letterSpacing: '.3em' }}>
                    the shadow
                </span>{' '}
                that follows
            </div>

            <div style={{
                marginTop: 40, fontFamily: "'Source Code Pro', monospace",
                fontSize: '.6rem', color: 'rgba(255,255,255,0.08)',
                letterSpacing: '.5em', textAlign: 'right',
            }}>
                don't look back — don't look back — don't look back
            </div>
        </div>
    )
}

function AngerComposition() {
    return (
        <div style={{
            background: '#1c1010', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
        }}>
            {/* Background pressure lines */}
            {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute', left: 0, right: 0,
                    height: 1, background: 'rgba(220, 38, 38, 0.04)',
                    top: `${12 + i * 12}%`,
                }} />
            ))}

            <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                color: 'rgba(220, 38, 38, 0.4)', letterSpacing: '.5em',
                textTransform: 'uppercase', marginBottom: 24, fontWeight: 700,
            }}>breaking point</div>

            <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(4.5rem, 14vw, 9rem)',
                fontWeight: 900, color: '#dc2626',
                lineHeight: 0.85, letterSpacing: '-.06em',
                textTransform: 'uppercase',
                marginBottom: 8,
                textShadow: '0 0 60px rgba(220, 38, 38, 0.3)',
            }}>RAGE</div>

            <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900, color: 'rgba(220, 38, 38, 0.35)',
                letterSpacing: '-.04em', textTransform: 'uppercase',
                lineHeight: 1, marginBottom: 24,
            }}>UNCONTAINED</div>

            <div style={{ display: 'flex', gap: 0, marginBottom: 32, flexWrap: 'wrap' }}>
                {['BURN', '—', 'SHATTER', '—', 'SCREAM', '—', 'BREAK'].map((w, i) => (
                    <span key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: w === '—' ? '1.2rem' : '.75rem',
                        fontWeight: 800, color: w === '—' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255,255,255,0.25)',
                        letterSpacing: w === '—' ? 0 : '.2em',
                        padding: '0 8px',
                    }}>{w}</span>
                ))}
            </div>

            <div style={{
                fontFamily: "'Source Code Pro', monospace",
                fontSize: '.65rem', color: 'rgba(255,255,255,0.08)',
                letterSpacing: '.15em', lineHeight: 2.2,
                borderLeft: '3px solid rgba(220, 38, 38, 0.4)',
                paddingLeft: 16,
            }}>
                every word a fist<br />
                every silence a wound<br />
                every breath — fuel
            </div>
        </div>
    )
}

function SerenityComposition() {
    return (
        <div style={{
            background: '#f0fdfa', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
        }}>
            <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: '.65rem',
                color: 'rgba(13, 148, 136, 0.35)', letterSpacing: '1em',
                textTransform: 'uppercase', marginBottom: 60, fontWeight: 300,
            }}>b r e a t h e</div>

            <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                fontWeight: 300, color: '#134e4a',
                lineHeight: 1, letterSpacing: '.12em',
                textAlign: 'center', marginBottom: 48,
                opacity: 0.7,
            }}>
                <div style={{ marginBottom: 12 }}>still</div>
                <div style={{
                    fontSize: '.35em', letterSpacing: '.8em',
                    color: '#0d9488', fontWeight: 400, opacity: .5,
                }}>w a t e r s</div>
            </div>

            {/* Horizontal divider */}
            <div style={{
                width: 120, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.25), transparent)',
                marginBottom: 48,
            }} />

            <div style={{
                fontFamily: "'Lora', serif", fontStyle: 'italic',
                fontSize: '1.1rem', fontWeight: 400,
                color: 'rgba(20, 78, 74, 0.4)',
                lineHeight: 2.8, textAlign: 'center',
                letterSpacing: '.15em', maxWidth: 380,
            }}>
                peace lives<br />
                in the space between<br />
                <span style={{ letterSpacing: '.6em', fontSize: '.9rem', opacity: .5 }}>thoughts</span>
            </div>

            <div style={{
                marginTop: 60, fontFamily: "'Inter', sans-serif",
                fontSize: '.6rem', color: 'rgba(13, 148, 136, 0.2)',
                letterSpacing: '1.2em', textTransform: 'lowercase',
            }}>8</div>
        </div>
    )
}

function ExcitementComposition() {
    return (
        <div style={{
            background: '#fdf2f8', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
        }}>
            {/* Background energy marks */}
            {['!', '!', '!', '⚡', '!', '★'].map((s, i) => (
                <span key={i} style={{
                    position: 'absolute', fontFamily: "'Montserrat', sans-serif",
                    fontSize: [60, 40, 80, 30, 50, 24][i],
                    fontWeight: 900, color: 'rgba(225, 29, 72, 0.04)',
                    top: `${[5, 25, 60, 80, 45, 10][i]}%`,
                    left: `${[8, 85, 75, 20, 5, 60][i]}%`,
                    transform: `rotate(${[-15, 20, -8, 30, 12, -25][i]}deg)`,
                }}>{s}</span>
            ))}

            <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                color: '#e11d48', letterSpacing: '.3em',
                textTransform: 'uppercase', fontWeight: 700, marginBottom: 12,
            }}>can you feel it?!</div>

            <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                fontWeight: 900, color: '#be123c',
                lineHeight: 0.9, textAlign: 'center',
                textTransform: 'uppercase', letterSpacing: '-.03em',
                marginBottom: 8,
            }}>
                <span style={{ display: 'inline-block', transform: 'rotate(-3deg) scale(1.1)' }}>GO</span>
                <span style={{ display: 'inline-block', fontSize: '.4em', color: '#f43f5e', verticalAlign: 'middle', margin: '0 8px' }}>GO</span>
                <span style={{ display: 'inline-block', transform: 'rotate(2deg) scale(1.15)' }}>GO!</span>
            </div>

            <div style={{
                display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {['THRILL', 'RUSH', 'ELECTRIC', 'ALIVE', 'NOW'].map((w, i) => (
                    <span key={w} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: ['.7rem', '.85rem', '.65rem', '1rem', '.75rem'][i],
                        fontWeight: [700, 800, 600, 900, 700][i],
                        color: '#e11d48',
                        background: 'rgba(225, 29, 72, 0.08)',
                        padding: '6px 14px', borderRadius: 100,
                        letterSpacing: '.15em',
                        transform: `rotate(${[-2, 1, -1, 3, -2][i]}deg)`,
                        display: 'inline-block',
                    }}>{w}</span>
                ))}
            </div>

            <div style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.8rem', fontWeight: 700,
                color: '#9f1239', textAlign: 'center',
                lineHeight: 1.4, fontStyle: 'italic',
            }}>
                every heartbeat says<br />
                <span style={{ fontSize: '2.4rem', color: '#e11d48' }}>YES!</span>
            </div>
        </div>
    )
}

function MelancholyComposition() {
    return (
        <div style={{
            background: '#f3f4f6', borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 60px)', position: 'relative', overflow: 'hidden',
            minHeight: 'clamp(350px, 70vh, 500px)', display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', alignItems: 'flex-end',
        }}>
            <div style={{
                position: 'absolute', top: 'clamp(30px, 5vw, 60px)', left: 'clamp(20px, 5vw, 60px)',
                fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                color: 'rgba(107, 114, 128, 0.2)',
                letterSpacing: '.4em', textTransform: 'uppercase',
            }}>fading</div>

            <div style={{
                position: 'absolute', top: '25%', left: 'clamp(20px, 5vw, 60px)',
                fontFamily: "'Lora', serif", fontStyle: 'italic',
                fontSize: 'clamp(3.5rem, 9vw, 6rem)',
                fontWeight: 400, color: 'rgba(107, 114, 128, 0.12)',
                lineHeight: 1, letterSpacing: '.05em',
            }}>gone</div>

            <div style={{
                textAlign: 'right', maxWidth: 400,
                marginBottom: 32,
            }}>
                <div style={{
                    fontFamily: "'Lora', serif", fontStyle: 'italic',
                    fontSize: '1.4rem', fontWeight: 400,
                    color: 'rgba(107, 114, 128, 0.45)',
                    lineHeight: 2.4, letterSpacing: '.08em',
                }}>
                    the words I never said<br />
                    sink like{' '}
                    <span style={{ letterSpacing: '.3em', fontSize: '.9rem', opacity: .4 }}>stones</span>
                    <br />
                    into quiet water
                </div>
            </div>

            <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 400, color: 'rgba(107, 114, 128, 0.2)',
                lineHeight: 1.2, textAlign: 'right',
                letterSpacing: '.15em',
                marginBottom: 24,
            }}>
                <span style={{ display: 'block', transform: 'translateY(0)' }}>m</span>
                <span style={{ display: 'block', transform: 'translateX(8px) translateY(4px)', opacity: .7 }}>e</span>
                <span style={{ display: 'block', transform: 'translateX(16px) translateY(8px)', opacity: .5 }}>l</span>
                <span style={{ display: 'block', transform: 'translateX(24px) translateY(12px)', opacity: .3 }}>t</span>
            </div>

            <div style={{
                width: 60, height: 1,
                background: 'rgba(107, 114, 128, 0.1)',
                marginBottom: 16, alignSelf: 'flex-end',
            }} />

            <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: '.55rem',
                color: 'rgba(107, 114, 128, 0.15)',
                letterSpacing: '.6em', textTransform: 'lowercase',
            }}>it was always this way</div>
        </div>
    )
}

const COMPOSITION_MAP = {
    joy: JoyComposition,
    fear: FearComposition,
    anger: AngerComposition,
    serenity: SerenityComposition,
    excitement: ExcitementComposition,
    melancholy: MelancholyComposition,
}

/* Emotion-specific typographic styles applied to user's custom text */
const CUSTOM_TEXT_STYLES = {
    joy: {
        container: {
            background: '#fffbeb', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700, color: '#92400e', lineHeight: 1.2,
            textShadow: '3px 3px 0 rgba(251, 191, 36, 0.3)', letterSpacing: '.04em',
        },
        input: { borderColor: 'rgba(245, 158, 11, 0.3)', color: '#92400e', background: 'rgba(251, 191, 36, 0.06)' },
    },
    fear: {
        container: {
            background: '#0d1117', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'left', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, color: 'rgba(255,255,255,0.08)', lineHeight: 0.95,
            letterSpacing: '-.04em',
        },
        input: { borderColor: 'rgba(147, 51, 234, 0.3)', color: 'rgba(255,255,255,0.6)', background: 'rgba(147, 51, 234, 0.06)' },
    },
    anger: {
        container: {
            background: '#1c1010', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'left', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, color: '#dc2626', lineHeight: 0.9,
            letterSpacing: '-.06em', textTransform: 'uppercase',
            textShadow: '0 0 60px rgba(220, 38, 38, 0.3)',
        },
        input: { borderColor: 'rgba(220, 38, 38, 0.3)', color: 'rgba(255,255,255,0.7)', background: 'rgba(220, 38, 38, 0.06)' },
    },
    serenity: {
        container: {
            background: '#f0fdfa', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Lora', serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 300, color: '#134e4a', lineHeight: 1.2,
            letterSpacing: '.12em', opacity: 0.7,
        },
        input: { borderColor: 'rgba(13, 148, 136, 0.3)', color: '#134e4a', background: 'rgba(13, 148, 136, 0.04)' },
    },
    excitement: {
        container: {
            background: '#fdf2f8', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, color: '#be123c', lineHeight: 0.95,
            textTransform: 'uppercase', letterSpacing: '-.03em',
        },
        input: { borderColor: 'rgba(225, 29, 72, 0.3)', color: '#9f1239', background: 'rgba(225, 29, 72, 0.06)' },
    },
    melancholy: {
        container: {
            background: '#f3f4f6', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'right', position: 'relative', overflow: 'hidden',
        },
        text: {
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 400, color: 'rgba(107, 114, 128, 0.35)', lineHeight: 1.4,
            letterSpacing: '.08em',
        },
        input: { borderColor: 'rgba(107, 114, 128, 0.2)', color: 'rgba(107, 114, 128, 0.7)', background: 'rgba(107, 114, 128, 0.04)' },
    },
}

export default function ExpressiveTypography({ onNext, onBack, onGoHome }) {
    const [activeEmotion, setActiveEmotion] = useState(EMOTIONS[0])
    const [showRationale, setShowRationale] = useState(false)
    const [customText, setCustomText] = useState('')

    const Composition = COMPOSITION_MAP[activeEmotion.id]

    return (
        <div className="section" style={{ maxWidth: '90vw' }}>
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Expressive"
                title="Expressive Typography"
                description="Typography isn't just for reading — it's for feeling. Each composition below uses only type to convey an emotion."
                accentColor="#ec4899"
                titleColor="#f59e0b"
            />

            {/* -- Emotion Selector Ribbon -- */}
            <div style={{
                display: 'flex', gap: 12, flexWrap: 'wrap',
                justifyContent: 'center', marginBottom: 48,
            }}>
                {EMOTIONS.map(e => (
                    <button key={e.id} onClick={() => { setActiveEmotion(e); setShowRationale(false) }}
                        style={{
                            padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 28px)', borderRadius: 100,
                            border: activeEmotion.id === e.id
                                ? `2px solid ${e.accent}`
                                : '2px solid rgba(255,255,255,.1)',
                            background: activeEmotion.id === e.id ? e.accentLight : 'rgba(255,255,255,.06)',
                            color: activeEmotion.id === e.id ? e.accent : 'var(--text-secondary)',
                            fontFamily: "'Inter', sans-serif", fontSize: '1rem',
                            fontWeight: activeEmotion.id === e.id ? 700 : 500,
                            cursor: 'pointer', transition: 'all .3s ease',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>{e.emoji}</span>
                        {e.name}
                    </button>
                ))}
            </div>

            {/* -- Composition Display -- */}
            <div style={{
                maxWidth: 1100, margin: '0 auto 40px',
                boxShadow: '0 8px 40px rgba(0,0,0,.08)',
                borderRadius: 24,
            }}>
                <Composition />
            </div>

            {/* -- Try Your Own Text Section -- */}
            <div style={{ maxWidth: 1100, margin: '0 auto 48px' }}>
                <div style={{
                    border: `1px solid ${activeEmotion.accent}22`,
                    borderRadius: 20, overflow: 'hidden',
                    background: 'rgba(255,255,255,.03)',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '16px 24px',
                        borderBottom: `1px solid ${activeEmotion.accent}15`,
                        display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.75rem',
                            fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '.12em', color: activeEmotion.accent,
                        }}>✍ Try Your Own Text</span>
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                            color: 'var(--text-secondary)', opacity: 0.5,
                        }}>— type anything and see it styled as <strong>{activeEmotion.name}</strong></span>
                    </div>

                    {/* Input */}
                    <div style={{ padding: '16px 24px' }}>
                        <input
                            type="text"
                            value={customText}
                            onChange={e => setCustomText(e.target.value)}
                            placeholder={`Type something to feel ${activeEmotion.name.toLowerCase()}...`}
                            style={{
                                width: '100%', padding: '12px 18px',
                                borderRadius: 12,
                                border: `1.5px solid ${CUSTOM_TEXT_STYLES[activeEmotion.id].input.borderColor}`,
                                background: CUSTOM_TEXT_STYLES[activeEmotion.id].input.background,
                                color: CUSTOM_TEXT_STYLES[activeEmotion.id].input.color,
                                fontFamily: "'Inter', sans-serif", fontSize: '1rem',
                                outline: 'none', transition: 'all .3s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = activeEmotion.accent}
                            onBlur={e => e.target.style.borderColor = CUSTOM_TEXT_STYLES[activeEmotion.id].input.borderColor}
                        />
                    </div>

                    {/* Preview */}
                    {customText.trim() && (
                        <div style={{ ...CUSTOM_TEXT_STYLES[activeEmotion.id].container, borderRadius: 0, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: CUSTOM_TEXT_STYLES[activeEmotion.id].container.textAlign === 'center' ? 'center' : CUSTOM_TEXT_STYLES[activeEmotion.id].container.textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                            <div style={CUSTOM_TEXT_STYLES[activeEmotion.id].text}>
                                {activeEmotion.id === 'joy'
                                    ? Array.from(customText).map((ch, i) => (
                                        <span key={i} style={{
                                            display: 'inline-block',
                                            transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + Math.random() * 3)}deg) translateY(${(i % 2 === 0 ? -1 : 1) * (3 + i % 5)}px)`,
                                        }}>{ch === ' ' ? '\u00A0' : ch}</span>
                                    ))
                                    : activeEmotion.id === 'melancholy'
                                    ? customText.split(' ').map((word, i, arr) => (
                                        <span key={i} style={{
                                            display: 'inline-block',
                                            opacity: 1 - (i * 0.12),
                                            transform: `translateY(${i * 4}px)`,
                                        }}>{word}{i < arr.length - 1 ? '\u00A0' : ''}</span>
                                    ))
                                    : customText
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* -- Design Rationale Toggle -- */}
            <div style={{ maxWidth: 1100, margin: '0 auto 48px' }}>
                <button onClick={() => setShowRationale(!showRationale)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '14px 28px', borderRadius: 14,
                        border: '1px solid rgba(255,255,255,.1)',
                        background: 'rgba(255,255,255,.05)',
                        cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        fontSize: '.9rem', fontWeight: 600,
                        color: activeEmotion.accent,
                        transition: 'all .3s ease',
                        width: '100%', justifyContent: 'center',
                    }}
                >
                    <span style={{
                        transform: showRationale ? 'rotate(180deg)' : 'none',
                        transition: 'transform .3s ease', fontSize: '.7rem',
                    }}>▼</span>
                    {showRationale ? 'Hide' : 'Show'} Design Rationale for "{activeEmotion.name}"
                </button>

                {showRationale && (
                    <div style={{
                        marginTop: 16, padding: 'clamp(20px, 4vw, 32px) clamp(20px, 4vw, 36px)',
                        background: 'rgba(255,255,255,.05)',
                        borderRadius: 16, border: '1px solid rgba(255,255,255,.08)',
                    }}>
                        <h4 style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.75rem',
                            fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '.15em', color: activeEmotion.accent,
                            marginBottom: 20,
                        }}>
                            <HoverLetters text={`Why This Works — ${activeEmotion.name}`} hoverColor={activeEmotion.accent} />
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {activeEmotion.rationale.map((r, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: 14, alignItems: 'flex-start',
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: activeEmotion.accentLight,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '.7rem', fontWeight: 700,
                                        color: activeEmotion.accent, flexShrink: 0,
                                    }}>{i + 1}</div>
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: '.95rem',
                                        color: 'var(--text-secondary)', lineHeight: 1.6,
                                        margin: 0, paddingTop: 3,
                                    }}>{r}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="next-btn-container" style={{ marginTop: 40 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>
                            Continue to Poster →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
