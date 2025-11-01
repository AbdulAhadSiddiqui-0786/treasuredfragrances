// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HiSparkles } from 'react-icons/hi';
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axiosInstance.post('/auth/forgot-password', { email });
      setSuccess(res.data.message);
      setStep('verify');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axiosInstance.post('/auth/verify-code', { email, code });
      setSuccess('Code verified! You can now reset your password.');
      setStep('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axiosInstance.post('/auth/reset-password', { email, code, newPassword: password });
      setSuccess(res.data.message + ' Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50 dark:bg-neutral-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl w-full max-w-md border border-stone-200 dark:border-neutral-700"
      >
        <div className="flex justify-center items-center gap-2 mb-6">
           <HiSparkles className="text-2xl text-amber-600 dark:text-amber-400" />
           <span className="text-xl font-light text-stone-900 dark:text-white">Admin Password Reset</span>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</p>}
        {success && <p className="text-emerald-500 text-sm mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">{success}</p>}

        {/* --- STEP 1: Request Code --- */}
        {step === 'request' && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <p className="text-sm text-stone-600 dark:text-stone-400">Enter your admin email to receive a 5-digit reset code.</p>
            <div>
              <Label htmlFor="email" className="text-stone-700 dark:text-stone-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </form>
        )}

        {/* --- STEP 2: Verify Code --- */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <Label htmlFor="email-verify" className="text-stone-700 dark:text-stone-300">Email</Label>
              <Input id="email-verify" type="email" value={email} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="code" className="text-stone-700 dark:text-stone-300">5-Digit Code</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={5}
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
        )}

        {/* --- STEP 3: Reset Password --- */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-stone-700 dark:text-stone-300">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-stone-700 dark:text-stone-300">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-amber-600 dark:text-amber-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;