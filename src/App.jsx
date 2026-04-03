import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import Background3D from './components/Background3D'
import LandingScreen from './components/LandingScreen'
import AnatomyExplorer from './components/AnatomyExplorer'
import AnatomyQuiz from './components/AnatomyQuiz'
import TypefaceExplorer from './components/TypefaceExplorer'
import FontSortingGame from './components/FontSortingGame'
import SerifVsSansSerif from './components/SerifVsSansSerif'
import FontPsychology from './components/FontPsychology'
import ExpressiveTypography from './components/ExpressiveTypography'
import TypographyPoster from './components/TypographyPoster'
import BrandIdentityAnalysis from './components/BrandIdentityAnalysis'
import ResultsScreen from './components/ResultsScreen'

const LEVELS = ['landing', 'anatomy-explorer', 'anatomy-quiz', 'typeface-explorer', 'font-sorting', 'serif-vs-sans', 'font-psychology', 'expressive-typography', 'typography-poster', 'brand-analysis', 'results']

function App() {
  const [currentLevel, setCurrentLevel] = useState('landing')
  const [scores, setScores] = useState({ anatomyQuiz: 0, fontSorting: 0, fontPsychology: 0 })

  const goToLevel = (level) => {
    setCurrentLevel(level)
  }

  const updateScore = (game, points) => {
    setScores(prev => ({ ...prev, [game]: prev[game] + points }))
  }

  const renderLevel = () => {
    switch (currentLevel) {
      case 'landing':
        return <LandingScreen onStart={() => goToLevel('anatomy-explorer')} onGoTo={(level) => goToLevel(level)} />
      case 'anatomy-explorer':
        return <AnatomyExplorer onNext={() => goToLevel('anatomy-quiz')} onBack={() => goToLevel('landing')} onGoHome={() => goToLevel('landing')} />
      case 'anatomy-quiz':
        return <AnatomyQuiz onNext={() => goToLevel('typeface-explorer')} onBack={() => goToLevel('anatomy-explorer')} onScore={(pts) => updateScore('anatomyQuiz', pts)} onGoHome={() => goToLevel('landing')} />
      case 'typeface-explorer':
        return <TypefaceExplorer onNext={() => goToLevel('font-sorting')} onBack={() => goToLevel('anatomy-quiz')} onGoHome={() => goToLevel('landing')} />
      case 'font-sorting':
        return <FontSortingGame onNext={() => goToLevel('serif-vs-sans')} onBack={() => goToLevel('typeface-explorer')} onScore={(pts) => updateScore('fontSorting', pts)} onGoHome={() => goToLevel('landing')} />
      case 'serif-vs-sans':
        return <SerifVsSansSerif onNext={() => goToLevel('font-psychology')} onBack={() => goToLevel('font-sorting')} onGoHome={() => goToLevel('landing')} />
      case 'font-psychology':
        return <FontPsychology onNext={() => goToLevel('expressive-typography')} onBack={() => goToLevel('serif-vs-sans')} onScore={(pts) => updateScore('fontPsychology', pts)} onGoHome={() => goToLevel('landing')} />
      case 'expressive-typography':
        return <ExpressiveTypography onNext={() => goToLevel('typography-poster')} onBack={() => goToLevel('font-psychology')} onGoHome={() => goToLevel('landing')} />
      case 'typography-poster':
        return <TypographyPoster onNext={() => goToLevel('brand-analysis')} onBack={() => goToLevel('expressive-typography')} onGoHome={() => goToLevel('landing')} />
      case 'brand-analysis':
        return <BrandIdentityAnalysis onNext={() => goToLevel('results')} onBack={() => goToLevel('typography-poster')} onGoHome={() => goToLevel('landing')} />
      case 'results':
        return <ResultsScreen scores={scores} onBack={() => goToLevel('brand-analysis')} onGoHome={() => goToLevel('landing')} onRestart={() => {
          setScores({ anatomyQuiz: 0, fontSorting: 0, fontPsychology: 0 })
          goToLevel('landing')
        }} />
      default:
        return <LandingScreen onStart={() => goToLevel('anatomy-explorer')} />
    }
  }

  const currentIndex = LEVELS.indexOf(currentLevel)
  const progress = currentIndex > 0 ? ((currentIndex) / (LEVELS.length - 1)) * 100 : 0

  return (
    <div className="app">
      <Background3D />

      {currentLevel !== 'landing' && currentLevel !== 'results' && (
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-labels">
            {[
              { label: 'Anatomy', level: 'anatomy-explorer' },
              { label: 'Quiz', level: 'anatomy-quiz' },
              { label: 'Typefaces', level: 'typeface-explorer' },
              { label: 'Sorting', level: 'font-sorting' },
              { label: 'Serif vs Sans', level: 'serif-vs-sans' },
              { label: 'Psychology', level: 'font-psychology' },
              { label: 'Expressive', level: 'expressive-typography' },
              { label: 'Poster', level: 'typography-poster' },
              { label: 'Brands', level: 'brand-analysis' },
            ].map((item, i) => (
              <span key={i}
                className={`progress-label ${currentIndex >= i + 1 ? 'active' : ''}`}
                onClick={() => goToLevel(item.level)}
                style={{ cursor: 'pointer' }}
              >{item.label}</span>
            ))}
          </div>
        </div>
      )}

      <div className="level-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {renderLevel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
