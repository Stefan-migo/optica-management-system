//src\app\page.tsx

import Link from "next/link";
import { 
  HeroIllustration,
  EyeExamIcon,
  EyewearIcon,
  ContactLensIcon,
  ShieldIcon
} from "@/components/ui/illustrations";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <HeroIllustration className="w-12 h-12 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-900 dark:text-white">
            OpticsPro
          </span>
        </div>

        <nav className="flex gap-6">
          <Link href="/login" className="group flex items-center gap-1 text-indigo-900 dark:text-gray-300 hover:text-indigo-600 transition">
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 group-hover:after:w-full after:transition-all">
              Staff Login
            </span>
          </Link>
          {/* Other navigation links */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <HeroIllustration className="w-full h-auto" />
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Precision Eye Care Management
        </h1>
        
        <div className="flex justify-center gap-6">
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <ShieldIcon className="w-5 h-5" />
            Staff Portal
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-indigo-100 rounded-xl">
                <EyeExamIcon className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Eye Exams</h3>
            {/* ... rest of card content ... */}
          </div>
          
          {/* Repeat for other service cards */}
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}