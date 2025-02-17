'use client'
import React, { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, EyeIcon, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn  } from 'next-auth/react';
import axios from 'axios';


const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/LogIn' : '/api/SignUp';
      
      const requestData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };

      const response = await axios.post(endpoint, requestData);
      router.push(response.data.redirectTo);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        setError(error.message || "Authentication failed");
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } };
        setError(axiosError.response?.data?.error || "Authentication failed");
      } else {
        setError("Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-bl from-red-600 via-red-600 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-gradient-to-tr from-gray-800 via-gray-700 to-transparent" />
      
      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 shadow-2xl overflow-hidden border-0">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-800/10 rounded-full translate-x-16 translate-y-16" />
        
        <div className="p-8 relative z-10">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <h1 className='text-6xl font-bold text-red-600 mb-4'>UpDate</h1>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Sign in to continue your journey' : 'Begin your journey with us'}
            </p>
          </div>

          {/* Keep your existing form content but wrap it in this container */}
          <div className="space-y-6">
            {/* Your existing form elements go here - keeping them unchanged */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <User className="w-5 h-5" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? 
                      <EyeOff className="w-5 h-5" /> : 
                      <EyeIcon className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="px-32">
                <Button 
                  variant="outline" 
                  onClick={() =>signIn('google')}
                  className="w-full text-black hover:bg-red-500 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 mr-2 text-black group-hover:text-white transition-colors" />

                  Google
                </Button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="w-full text-center text-red-500 hover:text-red-600 font-medium mt-4"
              >
                {isLogin ? 'Create an account' : 'Sign in instead'}
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPages;