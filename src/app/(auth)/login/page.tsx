
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Shield, User, Stethoscope, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (!role) {
    return <RoleSelection />;
  }
  
  if (role === 'company') {
    return <CompanyLogin />;
  }

  if (role === 'veterinarian') {
    return <VeterinarianLogin />;
  }

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
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Shield className="h-8 w-8 mr-2 text-primary" />
              <CardTitle className="text-2xl">FarmGuard</CardTitle>
            </div>
          <CardDescription>
            Welcome Farmer! Please sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
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
          
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
            <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/setup">Register</Link>
                </Button>
            </p>
             <Button variant="link" size="sm" asChild className="text-xs">
                <Link href="/login"><ArrowLeft className="mr-1 h-3 w-3"/>Back to role selection</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


function RoleSelection() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to FarmGuard</CardTitle>
          <CardDescription>Please select your role to continue.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/login?role=farmer" className="block">
              <Card className="cursor-pointer hover:border-primary">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <User className="h-12 w-12 mb-2" />
                  <span className="font-semibold text-center">I'm a Farmer</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/login?role=company" className="block">
              <Card className="cursor-pointer hover:border-primary">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Building className="h-12 w-12 mb-2" />
                  <span className="font-semibold text-center">I'm a Company</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/login?role=veterinarian" className="block">
              <Card className="cursor-pointer hover:border-primary">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Stethoscope className="h-12 w-12 mb-2" />
                  <span className="font-semibold text-center">I'm a Veterinarian</span>
                </CardContent>
              </Card>
            </Link>
        </CardContent>
        <CardFooter>
            <Button variant="link" asChild>
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function CompanyLogin() {
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock sign-in logic
        setLoading(true);
        setTimeout(() => {
            if (companyName === 'AgriCorp' && password === 'password123') {
                router.push('/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setLoading(false);
        }, 1000);
    }
    return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
             <div className="flex justify-center items-center mb-4">
              <Building className="h-8 w-8 mr-2 text-primary" />
              <CardTitle className="text-2xl">Company Portal</CardTitle>
            </div>
          <CardDescription>
            Sign in to your company account.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  type="text"
                  placeholder="e.g., AgriCorp Supplies"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
          
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
            <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/register-company">Register your company</Link>
                </Button>
            </p>
            <Button variant="link" size="sm" asChild className="text-xs">
                <Link href="/login"><ArrowLeft className="mr-1 h-3 w-3"/>Back to role selection</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
    )
}

function VeterinarianLogin() {
    return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Veterinarian Portal</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">The veterinarian sign-in and registration flow is under construction.</p>
            <Button variant="link" asChild className="mt-4">
                <Link href="/login"><ArrowLeft className="mr-1 h-3 w-3"/>Back to role selection</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
    )
}
