'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { getUserProfile, updateUserProfile } from '@/lib/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, Edit2, Save, X, Loader2, ArrowLeft, Upload, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [shift, setYear] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [tempBranch, setTempBranch] = useState('');
  const [tempSemester, setTempSemester] = useState('');
  const [tempYear, setTempYear] = useState('');
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

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
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setEmail(profile.email || '');
            setUsername(profile.username || '');
            setBranch(profile.branch || '');
            setSemester(profile.semester || '');
            setShift(profile.shift || '');
            setAvatarUrl(profile.avatarUrl || '');
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

  const getRoboHashUrl = (name: string) => {
    const hashString = name.replace(/\s+/g, '') || 'user';
    return `https://robohash.org/${hashString}?size=200x200&set=set1`;
  };

  const calculateProfileCompletion = (data: any) => {
    const fields = ['firstName', 'lastName', 'email', 'username', 'branch', 'semester', 'shift'];
    const filledFields = fields.filter(field => data[field] && data[field].trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion({
    firstName,
    lastName,
    email,
    username,
    branch,
    semester,
    shift,
  });

  const handleEdit = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempEmail(email);
    setTempUsername(username);
    setTempBranch(branch);
    setTempSemester(semester);
    setTempShift(shift);
    setTempAvatarUrl(avatarUrl);
    setIsEditing(true);
    setError('');
    setSuccessMessage('');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccessMessage('');

    // Validate inputs
    if (!tempFirstName.trim() || !tempLastName.trim() || !tempEmail.trim()) {
      setError('Please fill in at least First Name, Last Name, and Email');
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
          username: tempUsername,
          branch: tempBranch,
          semester: tempSemester,
          shift: tempYear,
          avatarUrl: tempAvatarUrl,
        });

        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEmail(tempEmail);
        setUsername(tempUsername);
        setBranch(tempBranch);
        setSemester(tempSemester);
        setShift(tempYear);
        setAvatarUrl(tempAvatarUrl);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');

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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const roboHashUrl = getRoboHashUrl(`${firstName} ${lastName}`);
  const displayAvatarUrl = tempAvatarUrl || avatarUrl || roboHashUrl;

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account details</p>
          </div>
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="border-gray-300 bg-white shadow-lg">
          <CardContent className="pt-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {successMessage}
                </p>
              </div>
            )}

            {/* Profile Completion Progress */}
            <div className="space-y-2 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-black">Profile Completion</p>
                <p className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-full">{profileCompletion}%</p>
              </div>
              <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 border-b border-gray-200 pb-6">
              {!isEditing ? (
                <>
                  <img
                    src={displayAvatarUrl}
                    alt="Avatar"
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                  />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-black">
                      {firstName} {lastName}
                    </p>
                    {username && <p className="text-sm text-gray-600 mt-1">@{username}</p>}
                    {branch && semester && (
                      <p className="text-sm text-gray-500 mt-2">
                        {branch} • Semester {semester}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <img
                      src={displayAvatarUrl}
                      alt="Avatar"
                      className="h-32 w-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSaving}
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg disabled:opacity-50 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isSaving}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 text-center">Click upload icon to change avatar</p>
                </>
              )}
            </div>

            {/* Profile Details Section */}
            {!isEditing ? (
              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">First Name</Label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-black">{firstName || '-'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Last Name</Label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-black">{lastName || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Email & Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Email</Label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="text-black text-sm">{email || '-'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Username</Label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3">
                      <span className="text-gray-500">@</span>
                      <p className="text-black">{username || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* College Information */}
                <div className="space-y-3 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300">
                  <p className="font-semibold text-black">College Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm">Branch</Label>
                      <div className="rounded-lg border border-gray-300 bg-white p-2">
                        <p className="text-black text-sm font-medium">{branch || '-'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm">Semester</Label>
                      <div className="rounded-lg border border-gray-300 bg-white p-2">
                        <p className="text-black text-sm font-medium">{semester ? `${semester}` : '-'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm">Year</Label>
                      <div className="rounded-lg border border-gray-300 bg-white p-2">
                        <p className="text-black text-sm font-medium">{year || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleEdit}
                  className="w-full bg-black hover:bg-gray-900 text-white font-semibold gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-black font-semibold">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={tempFirstName}
                        onChange={(e) => setTempFirstName(e.target.value)}
                        disabled={isSaving}
                        className="pl-10 border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-black font-semibold">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={tempLastName}
                        onChange={(e) => setTempLastName(e.target.value)}
                        disabled={isSaving}
                        className="pl-10 border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-semibold">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        disabled={isSaving}
                        className="pl-10 border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-black font-semibold">Username</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 text-sm">@</span>
                      <Input
                        id="username"
                        type="text"
                        placeholder="username"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        disabled={isSaving}
                        className="pl-10 border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* College Information */}
                <div className="space-y-3 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300">
                  <p className="font-semibold text-black">College Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-black font-semibold text-sm">Branch</Label>
                      <Input
                        id="branch"
                        type="text"
                        placeholder="e.g., CSE, ECE, ME"
                        value={tempBranch}
                        onChange={(e) => setTempBranch(e.target.value)}
                        disabled={isSaving}
                        className="border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester" className="text-black font-semibold text-sm">Semester</Label>
                      <select
                        id="semester"
                        value={tempSemester}
                        onChange={(e) => setTempSemester(e.target.value)}
                        disabled={isSaving}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:border-blue-600 focus:ring-blue-600 disabled:opacity-50"
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="4">4th Semester</option>
                        <option value="5">5th Semester</option>
                        <option value="6">6th Semester</option>
                        <option value="7">7th Semester</option>
                        <option value="8">8th Semester</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shift" className="text-black font-semibold text-sm">Year</Label>
                      <select
                        id="shift"
                        value={tempYear}
                        onChange={(e) => setTempShift(e.target.value)}
                        disabled={isSaving}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:border-blue-600 focus:ring-blue-600 disabled:opacity-50"
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="5">5th year</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold gap-2"
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
                    className="flex-1 border-gray-300 text-black hover:bg-gray-100 font-semibold gap-2"
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Back Button */}
            <Link href="/dashboard" className="sm:hidden block">
              <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-100 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
