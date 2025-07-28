import Flashcard from '@/components/Flashcard'
import { Vocabulary } from '@/types/vocabulary'

const vocabList: Vocabulary[] = [
  {
    id: '1',
    word: 'apple',
    meaning: 'quả táo',
    example: 'I eat an apple every morning.'
  },
  {
    id: '2',
    word: 'run',
    meaning: 'chạy',
    example: 'She runs 5 kilometers every day.'
  }
]

export default function FlashcardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-wrap gap-6 justify-center">
      {vocabList.map((vocab) => (
        <Flashcard key={vocab.id} vocab={vocab} />
      ))}
    </div>
  )
}
