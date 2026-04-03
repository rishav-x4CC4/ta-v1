import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Background3D() {
    const letters = useMemo(() => [
        { char: 'A', pos: { top: '20%', left: '15%' }, color: '#00f0ff', delay: 0 },
        { char: 'g', pos: { top: '70%', left: '80%' }, color: '#ff0055', delay: 1 },
        { char: 'R', pos: { top: '80%', left: '20%' }, color: '#ffcc00', delay: 0.5 },
        { char: 'S', pos: { top: '15%', left: '85%' }, color: '#8a2be2', delay: 1.5 },
        { char: '&', pos: { top: '50%', left: '50%' }, color: '#39ff14', delay: 2 },
    ], [])

    // Generate random static stars
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        }))
    }, [])

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: -1, pointerEvents: 'none', background: '#0a0a1a', overflow: 'hidden'
        }}>
            {/* Stars */}
            {stars.map(star => (
                <div key={star.id} style={{
                    position: 'absolute', top: star.top, left: star.left,
                    width: star.size, height: star.size,
                    backgroundColor: '#fff', borderRadius: '50%',
                    opacity: star.opacity
                }} />
            ))}

            {/* Glowing Orbs for depth */}
            <div style={{ position: 'absolute', top: '20%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', top: '70%', left: '70%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,69,122,0.05) 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translate(-50%, -50%)' }} />

            {/* Floating DOM Letters */}
            {letters.map((l, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        rotate: [-5, 5, -5]
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: l.delay
                    }}
                    style={{
                        position: 'absolute',
                        top: l.pos.top,
                        left: l.pos.left,
                        fontSize: 'clamp(6rem, 15vw, 15rem)',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: `1px ${l.color}`,
                        opacity: 0.2,
                        filter: `drop-shadow(0 0 10px ${l.color})`,
                        mixBlendMode: 'screen',
                        zIndex: 0
                    }}
                >
                    {l.char}
                </motion.div>
            ))}
        </div>
    )
}
