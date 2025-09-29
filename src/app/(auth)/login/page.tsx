
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, updateUser } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        await signIn(username, password);
        router.push('/dashboard');
    } catch (err: any) {
        setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
    setLoading(false);
  };
  
  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Simulating OTP login with phone:', phone);
    // Simulate OTP verification
    await new Promise(res => setTimeout(res, 500));
    
    // On successful OTP verification, we create a temporary user object
    // and redirect to the setup page to complete registration.
    updateUser({
      uid: `temp-user-${Date.now()}`,
      phoneNumber: phone,
    });

    router.push('/setup');
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Shield className="h-8 w-8 mr-2 text-primary" />
              <CardTitle className="text-2xl">FarmGuard</CardTitle>
            </div>
          <CardDescription>
            Welcome! Please sign in or register to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="register">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">New User (OTP)</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
                <form onSubmit={handleOtpLogin} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g., 08012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password (OTP)</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify & Continue'}
                    </Button>
                </form>
            </TabsContent>
            <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="e.g., farm_owner"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
            </TabsContent>
          </Tabs>
          
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
            <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="underline">Terms of Service</Link>.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
