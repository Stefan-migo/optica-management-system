'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { AuthIllustration, ShieldCheckIcon } from "@/components/ui/illustrations";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('Attempting to sign in with email:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      setError(error.message);
    } else {
      console.log('Login successful, redirecting...');
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white dark:bg-gray-900">
      {/* Illustration Side */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 hidden md:flex items-center justify-center p-12">
        <AuthIllustration className="w-full max-w-md text-white" />
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 md:p-12">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Staff Portal
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Manage optical shop operations
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}