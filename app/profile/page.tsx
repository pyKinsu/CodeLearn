'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { getUserProfile, updateUserProfile } from '@/lib/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, Edit2, Save, X, Loader2, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch user profile from Firestore
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          setIsLoading(true);
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setEmail(profile.email);
          }
          setIsLoading(false);
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile');
          setIsLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const getInitials = (first: string, last: string) => {
    if (!first || !last) return 'U';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const handleEdit = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempEmail(email);
    setIsEditing(true);
    setError('');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    setError('');
    setSuccessMessage('');

    // Validate inputs
    if (!tempFirstName.trim() || !tempLastName.trim() || !tempEmail.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (tempEmail !== email && !isValidEmail(tempEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsSaving(true);
      if (user) {
        await updateUserProfile(user.uid, {
          firstName: tempFirstName,
          lastName: tempLastName,
          email: tempEmail,
        });

        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEmail(tempEmail);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
      setIsSaving(false);
    } catch (err) {
      setIsSaving(false);
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccessMessage('');
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Show loading state while checking authentication
  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-slate-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back to Dashboard Button */}
        <Link href="/dashboard" className="mb-6 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              View and manage your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
                {getInitials(isEditing ? tempFirstName : firstName, isEditing ? tempLastName : lastName)}
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {isEditing ? `${tempFirstName} ${tempLastName}` : `${firstName} ${lastName}`}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isEditing ? tempEmail : email}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700" />

            {/* Profile Details Section */}
            {!isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400">First Name</Label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                    <User className="h-4 w-4 text-slate-400" />
                    <p className="text-slate-900 dark:text-slate-100">{firstName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400">Last Name</Label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                    <User className="h-4 w-4 text-slate-400" />
                    <p className="text-slate-900 dark:text-slate-100">{lastName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400">Email</Label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <p className="text-slate-900 dark:text-slate-100">{email}</p>
                  </div>
                </div>

                <Button
                  onClick={handleEdit}
                  className="w-full gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={tempFirstName}
                      onChange={(e) => setTempFirstName(e.target.value)}
                      disabled={isSaving}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={tempLastName}
                      onChange={(e) => setTempLastName(e.target.value)}
                      disabled={isSaving}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      disabled={isSaving}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="flex-1 gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 gap-2"
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}