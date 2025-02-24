import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Revu</h1>
          <p className="text-xl text-white/90">The Ultimate Smart Review App</p>
        </header>

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-12">
          <p className="text-lg text-gray-700 mb-6">
            Revu is an interactive and dynamic review platform designed to make learning more 
            effective, engaging, and fun! Whether you're a student preparing for exams, 
            a professional mastering new skills, or just someone who loves learning, 
            Revu offers multiple ways to study and retain information efficiently.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </Link>
            <Link href="/features" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Learn More
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/90 rounded-lg p-6 shadow-lg">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start reviewing smarter and faster today</h2>
          <p className="text-xl mb-8">With Revu, studying is no longer a chore—it's an experience!</p>
          <Link href="/signup" className="px-8 py-4 bg-white text-indigo-700 rounded-lg font-bold hover:bg-indigo-50 transition shadow-lg">
            Sign Up Free
          </Link>
        </section>
      </div>
    </div>
  );
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🔀',
    title: 'Flashcard Shuffle Mode',
    description: 'Mix questions and answers to challenge your memory.'
  },
  {
    icon: '📝',
    title: 'Custom Quizzes',
    description: 'Create and take quizzes in multiple formats (MCQ, True/False, Fill-in-the-Blanks).'
  },
  {
    icon: '🔄',
    title: 'Spaced Repetition (SRS)',
    description: 'Smart reminders help you review at the right time for maximum retention.'
  },
  {
    icon: '🎮',
    title: 'Matching Game',
    description: 'A fun way to connect terms with their meanings.'
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Monitor your learning streaks, scores, and improvement over time.'
  },
  {
    icon: '👥',
    title: 'Collaborative Study Sets',
    description: 'Create, organize, and share study decks with friends or classmates.'
  },
  {
    icon: '📴',
    title: 'Offline Mode',
    description: 'Review anytime, anywhere without needing an internet connection.'
  }
];