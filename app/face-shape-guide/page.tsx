'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Button, Card } from '@/components/ui'
import { ArrowRight, CheckCircle } from 'lucide-react'

const faceShapes = [
  {
    name: 'Oval',
    description: 'Your face is longer than it is wide, with a gently rounded jawline.',
    characteristics: ['Forehead slightly wider than jaw', 'Rounded jawline', 'Face length about 1.5x width'],
    bestFrames: ['Aviator', 'Cat-eye', 'Round', 'Square'],
    illustration: '⬬',
  },
  {
    name: 'Round',
    description: 'Your face has equal width and length with soft, curved features.',
    characteristics: ['Equal width and length', 'Full cheeks', 'Rounded jawline'],
    bestFrames: ['Rectangular', 'Square', 'Cat-eye', 'Aviator'],
    illustration: '⭕',
  },
  {
    name: 'Square',
    description: 'Your face has a strong jawline and angular features.',
    characteristics: ['Strong jawline', 'Wide forehead', 'Angular features'],
    bestFrames: ['Round', 'Oval', 'Cat-eye', 'Aviator'],
    illustration: '▢',
  },
  {
    name: 'Heart',
    description: 'Your face is wider at the forehead and tapers to a narrow chin.',
    characteristics: ['Wide forehead', 'High cheekbones', 'Narrow chin'],
    bestFrames: ['Round', 'Aviator', 'Cat-eye', 'Rimless'],
    illustration: '♡',
  },
  {
    name: 'Diamond',
    description: 'Your face is narrow at the forehead and jaw with wide cheekbones.',
    characteristics: ['Narrow forehead', 'Wide cheekbones', 'Narrow chin'],
    bestFrames: ['Oval', 'Cat-eye', 'Round', 'Rimless'],
    illustration: '◆',
  },
  {
    name: 'Triangle',
    description: 'Your face is wider at the jaw and narrower at the forehead.',
    characteristics: ['Narrow forehead', 'Wide jawline', 'Strong chin'],
    bestFrames: ['Cat-eye', 'Aviator', 'Round', 'Oval'],
    illustration: '▲',
  },
]

export default function FaceShapeGuidePage() {
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<string | null>(null)

  const quizQuestions = [
    {
      question: 'Is your face longer than it is wide?',
      options: ['Yes', 'No', 'About equal'],
    },
    {
      question: 'What best describes your jawline?',
      options: ['Rounded', 'Square/Angular', 'Pointed/Narrow'],
    },
    {
      question: 'Where is your face widest?',
      options: ['Forehead', 'Cheekbones', 'Jaw'],
    },
    {
      question: 'What best describes your forehead?',
      options: ['Wide', 'Narrow', 'Medium'],
    },
    {
      question: 'What best describes your chin?',
      options: ['Rounded', 'Pointed', 'Square'],
    },
  ]

  const calculateResult = () => {
    // Simple scoring logic (can be enhanced)
    const score: Record<string, number> = {}
    
    if (answers[0] === 'Yes') score['oval'] = (score['oval'] || 0) + 2
    if (answers[1] === 'Rounded') score['round'] = (score['round'] || 0) + 2
    if (answers[1] === 'Square/Angular') score['square'] = (score['square'] || 0) + 2
    if (answers[2] === 'Forehead') score['heart'] = (score['heart'] || 0) + 2
    if (answers[2] === 'Cheekbones') score['diamond'] = (score['diamond'] || 0) + 2
    if (answers[2] === 'Jaw') score['triangle'] = (score['triangle'] || 0) + 2

    const maxScore = Math.max(...Object.values(score))
    const detectedShape = Object.keys(score).find((key) => score[key] === maxScore) || 'oval'
    
    setResult(detectedShape)
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [quizStep]: answer }
    setAnswers(newAnswers)

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      calculateResult()
      setQuizStep(quizStep + 1)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setAnswers({})
    setResult(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Find Your Perfect Frame
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover which glasses suit your face shape best
          </p>
        </section>

        {/* Face Shape Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Face Shape Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faceShapes.map((shape) => (
              <Card key={shape.name} hover className="h-full">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{shape.illustration}</div>
                  <h3 className="text-2xl font-bold font-heading mb-2">{shape.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{shape.description}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Characteristics:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {shape.characteristics.map((char, i) => (
                      <li key={i}>• {char}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Best Frames:</h4>
                  <div className="flex flex-wrap gap-2">
                    {shape.bestFrames.map((frame) => (
                      <span
                        key={frame}
                        className="px-2 py-1 bg-bg-tertiary rounded text-xs"
                      >
                        {frame}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href={`/products?faceShape=${shape.name.toLowerCase()}`}>
                  <Button variant="secondary" size="small" fullWidth>
                    View Frames for {shape.name}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className="mb-16">
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-heading mb-6 text-center">
              Take Our Face Shape Quiz
            </h2>

            {quizStep < quizQuestions.length && !result && (
              <>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-text-secondary mb-2">
                    <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                    <span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-bg-tertiary rounded-full h-2">
                    <div
                      className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>
                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="w-full p-4 bg-bg-tertiary hover:bg-bg-hover border border-border-primary hover:border-brand-primary rounded-xl text-left transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {result && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-2">
                  Your Face Shape: {result.charAt(0).toUpperCase() + result.slice(1)}
                </h3>
                <p className="text-text-secondary mb-6">
                  Based on your answers, we recommend frames suited for {result} face shapes.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href={`/products?faceShape=${result}`}>
                    <Button variant="primary" size="large">
                      View Recommended Frames
                    </Button>
                  </Link>
                  <Button variant="secondary" size="large" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}

