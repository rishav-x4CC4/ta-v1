/**
 * Shared anatomy terms data used by AnatomyExplorer and AnatomyQuiz.
 */
const ANATOMY_TERMS = [
    {
        id: 'baseline',
        name: 'Baseline',
        definition: 'The invisible line upon which most letters "sit." It is the primary reference line for aligning text. Characters like "a", "e", and "x" rest directly on the baseline.',
        color: '#8b5cf6' // Purple/Indigo
    },
    {
        id: 'x-height',
        name: 'X-Height',
        definition: 'The height of lowercase letters (specifically the letter "x"), measured from the baseline to the top of flat lowercase letters. It defines the visual size of a typeface.',
        color: '#ec4899' // Pink
    },
    {
        id: 'ascender',
        name: 'Ascender',
        definition: 'The part of a lowercase letter that extends above the x-height. Letters like "b", "d", "h", "k", and "l" have ascenders that rise above the main body.',
        color: '#f59e0b' // Orange
    },
    {
        id: 'descender',
        name: 'Descender',
        definition: 'The part of a lowercase letter that extends below the baseline. Letters like "g", "p", "q", "y", and "j" have descenders that dip below the line.',
        color: '#10b981' // Green
    },
    {
        id: 'stem',
        name: 'Stem',
        definition: 'The main vertical or near-vertical stroke in a letter. For example, the vertical stroke in "l", "b", "d", or the thick diagonal in "V". It forms the structural backbone of characters.',
        color: '#06b6d4' // Cyan
    },
    {
        id: 'counter',
        name: 'Counter',
        definition: 'The enclosed or partially enclosed space within a letter. The hole in "o", "d", and "p" are closed counters. The opening in "c" and "u" are open counters.',
        color: '#6366f1' // Indigo/Purple
    },
    {
        id: 'terminal',
        name: 'Terminal',
        definition: 'The end of a stroke that does not have a serif. Terminals can be ball-shaped (ball terminal), tapered, or flared. Commonly seen at the end of strokes in letters like "f", "a", and "c".',
        color: '#ef4444' // Red
    },
    {
        id: 'ligature',
        name: 'Ligature',
        definition: 'A single glyph formed by combining two or more characters. Common ligatures include "fi", "fl", "ff", and "ffi". They improve readability and aesthetics by resolving awkward character collisions.',
        color: '#2a9d7c'
    },
    {
        id: 'midline',
        name: 'Midline',
        definition: 'The imaginary horizontal line running through the middle of uppercase and lowercase letters, at the level of crossbars in letters like "H", "e", and "A". It sits between the baseline and the x-height, marking the visual center of the letter body.',
        color: '#f472b6' // Pink-400
    },
    {
        id: 'kerning',
        name: 'Kerning',
        definition: 'The adjustment of spacing between individual character pairs. For example, the pair "AV" often needs tighter spacing (negative kerning) so the letters don\'t appear too far apart.',
        color: '#c88a30'
    },
    {
        id: 'leading',
        name: 'Leading',
        definition: 'The vertical space between lines of text, measured from baseline to baseline. Derived from the lead strips typesetters placed between lines of metal type. Proper leading improves readability.',
        color: '#3d85b8'
    }
]

export default ANATOMY_TERMS
