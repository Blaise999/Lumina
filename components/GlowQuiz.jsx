'use client';

import { useState } from 'react';

export default function GlowQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: 'What\'s your primary skin concern?',
      options: ['Hydration & Glow', 'Anti-aging', 'Acne & Blemishes', 'Even Tone'],
    },
    {
      q: 'How would you describe your style?',
      options: ['Minimalist Chic', 'Bold & Statement', 'Classic Elegance', 'Streetwear Glam'],
    },
    {
      q: 'What\'s your go-to accessory?',
      options: ['Dainty Jewellery', 'Designer Bag', 'Sunglasses', 'Statement Watch'],
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [step]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section id="quiz" className="py-16 lg:py-24 bg-gradient-to-br from-lumina-charcoal via-lumina-charcoal to-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.25em] text-lumina-teal uppercase">Personalized</span>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold">Find Your Glow Routine</h2>
          <p className="mt-3 text-white/60 text-sm">Take our 30-second quiz to discover your perfect beauty & fashion match.</p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-lumina-teal to-lumina-gold mx-auto mt-4" />

          <div className="mt-12">
            {!submitted ? (
              <>
                {/* Progress */}
                <div className="flex items-center gap-2 justify-center mb-8">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'w-12 bg-lumina-teal' : 'w-8 bg-white/10'}`} />
                  ))}
                </div>

                <p className="text-xs text-white/40 mb-2">Question {step + 1} of {questions.length}</p>
                <h3 className="font-display text-xl lg:text-2xl font-semibold mb-8">{questions[step].q}</h3>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="px-5 py-4 rounded-xl border border-white/10 text-sm font-medium hover:bg-lumina-teal hover:border-lumina-teal transition-all duration-300 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-8">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-display text-2xl font-bold mb-3">Your Glow Profile is Ready!</h3>
                <p className="text-white/60 text-sm mb-8">We&apos;ve curated a personalized selection just for you. Check your email for exclusive recommendations.</p>
                <div className="relative max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input pr-28"
                  />
                  <button className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-lumina-teal rounded-full text-sm font-semibold hover:bg-lumina-teal-dark transition-colors">
                    Get Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
