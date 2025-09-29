
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import type { ConfirmationResult } from 'firebase/auth';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, confirmCode, setupRecaptcha } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        setupRecaptcha('recaptcha-container');
        const result = await signIn(phoneNumber);
        setConfirmationResult(result);
    } catch (err: any) {
        setError(err.message);
    }
    setLoading(false);
  };
  
  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!confirmationResult) {
        setError("Please request a code first.");
        setLoading(false);
        return;
    }
    try {
        await confirmCode(confirmationResult, code);
        router.push('/setup');
    } catch (err: any) {
        setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Shield className="h-8 w-8 mr-2 text-primary" />
              <CardTitle className="text-2xl">FarmGuard</CardTitle>
            </div>
          <CardDescription>
            {confirmationResult ? 'Enter the OTP sent to your phone.' : 'Enter your phone number to login or create an account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!confirmationResult ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., +15555555555"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleConfirmCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Confirmation Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </form>
          )}
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline">Terms of Service</Link>.
          </p>
          <Link href="/" className="text-sm text-primary hover:underline">
              Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
