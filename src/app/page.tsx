import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/optic-logo.svg" // Replace with your logo in /public
            alt="OpticsPro Logo"
            width={120}
            height={40}
            className="dark:invert"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            OpticsPro
          </span>
        </div>

        <nav className="flex gap-6">
          <Link
            href="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Staff Login
          </Link>
          <Link
            href="/#services"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Precision Eye Care & Modern Eyewear
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Your vision is our mission. Explore our premium eyewear collection and
          book your next eye exam today.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Staff Login
          </Link>
          <Link
            href="/appointments"
            className="border-2 border-blue-600 text-blue-600 dark:text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <Image
              src="/icons/eye-exam.svg" // Replace with your icon in /public
              alt="Eye Exam"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">Comprehensive Eye Exams</h3>
            <p className="text-gray-600 dark:text-gray-300">
              State-of-the-art diagnostic technology for accurate prescriptions.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <Image
              src="/icons/eyewear.svg" // Replace with your icon in /public
              alt="Eyewear"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">Premium Eyewear</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our curated collection of stylish and functional eyewear.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
            <Image
              src="/icons/contact-lens.svg" // Replace with your icon in /public
              alt="Contact Lenses"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">Contact Lenses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find the perfect contact lenses for your lifestyle and vision needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} OpticsPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}