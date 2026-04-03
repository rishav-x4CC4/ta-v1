import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import InteractiveHeader, { HomeButton, HoverWords } from './InteractiveHeader'
import gtaPoster from '../assets/gta.png'

/* ----------------------------------------------------------
   TYPOGRAPHY POSTER — GTA V case study analyzing display
   & sans-serif typography in a real-world poster design.
   ---------------------------------------------------------- */

export default function TypographyPoster({ onNext, onBack, onGoHome }) {
    const posterRef = useRef(null)
    const [downloading, setDownloading] = useState(false)

    const handleDownload = async () => {
        setDownloading(true)
        try {
            const { default: html2canvas } = await import('html2canvas')
            const canvas = await html2canvas(posterRef.current, { scale: 3, useCORS: true })
            const link = document.createElement('a')
            link.download = 'gta-v-typography-poster.png'
            link.href = canvas.toDataURL('image/png')
            link.click()
        } catch (err) {
            console.warn('html2canvas not available, falling back to print:', err)
            window.print()
        }
        setDownloading(false)
    }

    return (
        <div className="section" style={{ maxWidth: '90vw' }}>
            <HomeButton onClick={onGoHome} />
            <InteractiveHeader
                sectionNumber="Poster"
                title="Typography Poster Design"
                description="An A4 poster highlighting the importance of typography in design, combining serif and sans-serif fonts with strong visual hierarchy."
                accentColor="#06b6d4"
                titleColor="#c9b08b"
            />

            {/* ---- GTA V CASE STUDY — Serif vs Sans-Serif in Action ---- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                style={{
                    maxWidth: 960, margin: '0 auto 48px', padding: '0 clamp(16px, 4vw, 32px)',
                }}
            >
                <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 8px 40px rgba(0,0,0,.15)',
                }}>
                    {/* Poster image */}
                    <div ref={posterRef} style={{ position: 'relative', overflow: 'hidden' }}>
                        <img
                            src={gtaPoster}
                            alt="Grand Theft Auto V — Poster showcasing serif and sans-serif typography"
                            style={{
                                width: '100%', display: 'block',
                                borderBottom: '1px solid var(--border-glass)',
                            }}
                        />

                        {/* Annotation overlays */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            style={{
                                position: 'absolute', top: '8%', right: '4%',
                                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
                                padding: '10px 16px', borderRadius: 8,
                                border: '1px solid rgba(229,201,123,0.4)',
                                maxWidth: 190,
                            }}
                        >
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                color: '#e5c97b', letterSpacing: '.12em', textTransform: 'uppercase',
                                fontWeight: 700, marginBottom: 4,
                            }}>Display Font</div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                                color: 'rgba(255,255,255,0.8)', lineHeight: 1.4,
                            }}>Custom Pricedown typeface — iconic brand identity</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            style={{
                                position: 'absolute', bottom: '35%', left: '4%',
                                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
                                padding: '10px 16px', borderRadius: 8,
                                border: '1px solid rgba(66,133,244,0.4)',
                                maxWidth: 190,
                            }}
                        >
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                color: '#4285f4', letterSpacing: '.12em', textTransform: 'uppercase',
                                fontWeight: 700, marginBottom: 4,
                            }}>Sans-Serif</div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                                color: 'rgba(255,255,255,0.8)', lineHeight: 1.4,
                            }}>Bold condensed sans-serif for urban impact</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.1 }}
                            style={{
                                position: 'absolute', bottom: '4%', right: '4%',
                                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
                                padding: '10px 16px', borderRadius: 8,
                                border: '1px solid rgba(232,69,122,0.4)',
                                maxWidth: 190,
                            }}
                        >
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.6rem',
                                color: '#e8457a', letterSpacing: '.12em', textTransform: 'uppercase',
                                fontWeight: 700, marginBottom: 4,
                            }}>Supporting Text</div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.7rem',
                                color: 'rgba(255,255,255,0.8)', lineHeight: 1.4,
                            }}>"A Rockstar Games Production" & "OUT NOW" anchor the hierarchy</div>
                        </motion.div>
                    </div>

                    {/* -- Download / Print button -- */}
                    <div style={{ textAlign: 'center', padding: '36px 0' }}>
                        <button onClick={handleDownload}
                            style={{
                                padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 36px)', borderRadius: 100,
                                border: '2px solid rgba(232, 69, 122, 0.3)',
                                background: 'rgba(232, 69, 122, 0.06)',
                                color: '#c94070', fontFamily: "'Inter', sans-serif",
                                fontSize: '.9rem', fontWeight: 600,
                                cursor: 'pointer', transition: 'all .3s ease',
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                            }}
                        >
                            {downloading ? '⏳ Preparing...' : '🖨️ Print / Save as PDF'}
                        </button>
                        <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.75rem',
                            color: 'var(--text-muted)', marginTop: 8,
                        }}>Use Ctrl+P → Save as PDF for high-resolution A4 output</p>
                    </div>

                    {/* Analysis panel */}
                    <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                            fontWeight: 700, color: '#fff', marginBottom: 8,
                            lineHeight: 1.2,
                        }}>
                            Grand Theft Auto V — Typography Breakdown
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '.85rem',
                            color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24, maxWidth: 700,
                        }}>
                            <HoverWords text="This iconic poster layers a custom display typeface with bold sans-serif and formal supporting text to create a cinematic visual hierarchy — from brand identity to call-to-action." hoverColor="#e8457a" />
                        </p>

                        {/* Two-column breakdown */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                            gap: 24,
                        }}>
                            {/* Display font analysis */}
                            <div style={{
                                background: 'rgba(229,201,123,0.06)',
                                border: '1px solid rgba(229,201,123,0.15)',
                                borderRadius: 12, padding: 'clamp(16px, 3vw, 24px)',
                            }}>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1.3rem', fontWeight: 800,
                                    color: '#e5c97b', marginBottom: 12,
                                    display: 'flex', alignItems: 'center', gap: 10,
                                }}>
                                    <span style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: 'rgba(229,201,123,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '.75rem', fontFamily: "'Inter', sans-serif", fontWeight: 800,
                                    }}>D</span>
                                    "grand theft auto V"
                                </div>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '.82rem',
                                    color: 'var(--text-secondary)', lineHeight: 1.7,
                                }}>
                                    <p style={{ margin: '0 0 8px' }}>The game title uses <strong style={{ color: '#e5c97b' }}>Pricedown</strong>, a custom display typeface with heavy outlines and 3D shadowing to convey:</p>
                                    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        <li><strong>Brand identity</strong> — the Pricedown display font IS the GTA brand; instantly recognizable worldwide without any other context</li>
                                        <li><strong>Retro pop culture</strong> — inspired by 1970s game-show lettering, it evokes nostalgia and Americana — core themes of GTA</li>
                                        <li><strong>Bold impact</strong> — heavy white letterforms with thick black outlines punch through the busy collage of action scenes behind them</li>
                                        <li><strong>Deliberate lowercase</strong> — using "grand theft auto" in lowercase creates a casual, irreverent tone that matches the game's satirical spirit</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Sans-serif analysis */}
                            <div style={{
                                background: 'rgba(66,133,244,0.06)',
                                border: '1px solid rgba(66,133,244,0.15)',
                                borderRadius: 12, padding: 'clamp(16px, 3vw, 24px)',
                            }}>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1.1rem', fontWeight: 800,
                                    color: '#4285f4', marginBottom: 12,
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    textTransform: 'uppercase', letterSpacing: '.02em',
                                }}>
                                    <span style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: 'rgba(66,133,244,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '.75rem', fontWeight: 800,
                                    }}>S</span>
                                    "WELCOME TO LOS SANTOS"
                                </div>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: '.82rem',
                                    color: 'var(--text-secondary)', lineHeight: 1.7,
                                }}>
                                    <p style={{ margin: '0 0 8px' }}>The subtitle and supporting text use a <strong style={{ color: '#4285f4' }}>bold condensed sans-serif</strong> with 3D shadowing to deliver:</p>
                                    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        <li><strong>Urban impact</strong> — the heavy, all-caps condensed sans-serif feels gritty and street-level, matching Los Santos' open-world energy</li>
                                        <li><strong>Layered hierarchy</strong> — "WELCOME TO LOS SANTOS" sits below the logo at a slightly smaller scale, guiding the eye from brand → setting</li>
                                        <li><strong>Contrast with display</strong> — the clean geometric sans-serif contrasts sharply with Pricedown's decorative curves, creating visual tension</li>
                                        <li><strong>Action framing</strong> — "A ROCKSTAR GAMES PRODUCTION" and "OUT NOW" anchor the poster's bottom in clean, authoritative sans-serif — studio credit above, call-to-action below</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Summary insight */}
                        <div style={{
                            marginTop: 24, padding: '16px 20px',
                            background: 'rgba(232,69,122,0.06)',
                            border: '1px solid rgba(232,69,122,0.15)',
                            borderRadius: 10, borderLeft: '3px solid #e8457a',
                        }}>
                            <div style={{
                                fontFamily: "'Inter', sans-serif", fontSize: '.82rem',
                                color: 'var(--text-secondary)', lineHeight: 1.7,
                            }}>
                                <strong style={{ color: '#e8457a' }}>Design Takeaway:</strong> This poster demonstrates a three-tier typographic hierarchy — <em>display font for the brand, condensed sans-serif for the setting, clean sans-serif for the CTA</em>. The custom Pricedown logo owns the top with maximum visual weight, "WELCOME TO LOS SANTOS" bridges brand to world, and "OUT NOW" drives action at the bottom. Each level uses a different scale, weight, and treatment — yet they all work together as a unified composition across the comic-panel layout.
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="next-btn-container" style={{ marginTop: 40 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" onClick={onBack}>← Back</button>
                        <button className="btn-primary" onClick={onNext}>
                            Continue to Brand Analysis →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
