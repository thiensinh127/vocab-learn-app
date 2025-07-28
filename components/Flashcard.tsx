'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Vocabulary } from '@/types/vocabulary'

interface FlashcardProps {
  vocab: Vocabulary
}

export default function Flashcard({ vocab }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-80 h-48 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={clsx(
          'relative w-full h-full transition-transform duration-500 preserve-3d',
          flipped && 'rotate-y-180'
        )}
      >
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-white border border-gray-300 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold">
          {vocab.word}
        </div>

        {/* Back */}
        <div className="absolute rotate-y-180 backface-hidden w-full h-full bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4 flex flex-col justify-center">
          <p className="text-xl font-semibold">{vocab.meaning}</p>
          {vocab.example && (
            <p className="mt-2 text-sm italic text-gray-600">"{vocab.example}"</p>
          )}
        </div>
      </div>
    </div>
  )
}
