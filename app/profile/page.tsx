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
import { Mail, User, Edit2, Save, X, Loader2, ArrowLeft, Upload, CheckCircle, Book, Hash } from 'lucide-react';

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
  const [rollNum, setRollNum] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [tempBranch, setTempBranch] = useState('');
  const [tempSemester, setTempSemester] = useState('');
  const [tempRollNum, setTempRollNum] = useState('');
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
            setRollNum(profile.rollNum || '');
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
    const fields = ['firstName', 'lastName', 'email', 'username', 'branch', 'semester', 'rollNum'];
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
    rollNum,
  });

  const handleEdit = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempEmail(email);
    setTempUsername(username);
    setTempBranch(branch);
    setTempSemester(semester);
    setTempRollNum(rollNum);
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
          rollNum: tempRollNum,
          avatarUrl: tempAvatarUrl,
        });

        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEmail(tempEmail);
        setUsername(tempUsername);
        setBranch(tempBranch);
        setSemester(tempSemester);
        setRollNum(tempRollNum);
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

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const roboHashUrl = getRoboHashUrl(`${firstName} ${lastName}`);
  const displayAvatarUrl = tempAvatarUrl || avatarUrl || roboHashUrl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-black text-white">My Profile</h1>
            <p className="text-slate-400 mt-2">Manage and showcase your account</p>
          </div>
          <Link href="/dashboard" className="hidden sm:block">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="pt-8 space-y-8">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-in fade-in duration-300">
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400"></div>
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-in fade-in duration-300">
                <p className="text-sm text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {successMessage}
                </p>
              </div>
            )}

            {/* Profile Completion Progress */}
            <div className="space-y-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-lg">Profile Completion</p>
                  <p className="text-sm text-slate-400 mt-1">Keep your profile up to date</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {profileCompletion}%
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-blue-500/50"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-6 border-b border-slate-700/30 pb-8">
              {!isEditing ? (
                <>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <img
                      src={displayAvatarUrl}
                      alt="Avatar"
                      className="relative h-40 w-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-white">
                      {firstName} {lastName}
                    </p>
                    {username && <p className="text-sm text-blue-400 mt-2 font-semibold">@{username}</p>}
                    {branch && semester && (
                      <p className="text-sm text-slate-400 mt-3 flex items-center justify-center gap-2">
                        <Book className="h-4 w-4" />
                        {branch} • Semester {semester}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
                    <img
                      src={displayAvatarUrl}
                      alt="Avatar"
                      className="relative h-40 w-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSaving}
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg disabled:opacity-50 transition-all transform hover:scale-110"
                    >
                      <Upload className="h-5 w-5" />
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
                  <p className="text-xs text-slate-400 text-center">Click the upload icon to change your avatar</p>
                </>
              )}
            </div>

            {/* Profile Details Section */}
            {!isEditing ? (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-700/20 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <p className="text-xs text-slate-400 font-semibold mb-2">FIRST NAME</p>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-400" />
                        <p className="text-white font-semibold">{firstName || '-'}</p>
                      </div>
                    </div>
                    <div className="bg-slate-700/20 border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <p className="text-xs text-slate-400 font-semibold mb-2">LAST NAME</p>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-400" />
                        <p className="text-white font-semibold">{lastName || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-700/20 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <p className="text-xs text-slate-400 font-semibold mb-2">EMAIL</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <p className="text-white font-semibold text-sm">{email || '-'}</p>
                      </div>
                    </div>
                    <div className="bg-slate-700/20 border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <p className="text-xs text-slate-400 font-semibold mb-2">USERNAME</p>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-bold">@</span>
                        <p className="text-white font-semibold">{username || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* College Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">College Information</h3>
                  <div className="bg-gradient-to-r from-slate-700/20 to-slate-800/20 border border-slate-700/50 rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs text-slate-400 font-semibold">BRANCH</p>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                          <p className="text-white font-semibold">{branch || '-'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-slate-400 font-semibold">SEMESTER</p>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                          <p className="text-white font-semibold">{semester ? `${semester}` : '-'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-slate-400 font-semibold">ROLL NUMBER</p>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/30">
                          <p className="text-white font-semibold">{rollNum || '-'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleEdit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold gap-2 shadow-lg h-12 text-base"
                >
                  <Edit2 className="h-5 w-5" />
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white font-bold">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          value={tempFirstName}
                          onChange={(e) => setTempFirstName(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white font-bold">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          value={tempLastName}
                          onChange={(e) => setTempLastName(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/30"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-bold">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white font-bold">Username</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-blue-400 font-bold">@</span>
                        <Input
                          id="username"
                          type="text"
                          placeholder="username"
                          value={tempUsername}
                          onChange={(e) => setTempUsername(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* College Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">College Information</h3>
                  <div className="bg-gradient-to-r from-slate-700/20 to-slate-800/20 border border-slate-700/50 rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="branch" className="text-white font-bold text-sm">Branch</Label>
                        <Input
                          id="branch"
                          type="text"
                          placeholder="e.g., CSE, ECE, ME"
                          value={tempBranch}
                          onChange={(e) => setTempBranch(e.target.value)}
                          disabled={isSaving}
                          className="border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester" className="text-white font-bold text-sm">Semester</Label>
                        <select
                          id="semester"
                          value={tempSemester}
                          onChange={(e) => setTempSemester(e.target.value)}
                          disabled={isSaving}
                          className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/40 text-white focus:border-blue-500 focus:ring-blue-500/30 disabled:opacity-50"
                        >
                          <option value="" className="bg-slate-900">Select Semester</option>
                          <option value="1" className="bg-slate-900">1st Semester</option>
                          <option value="2" className="bg-slate-900">2nd Semester</option>
                          <option value="3" className="bg-slate-900">3rd Semester</option>
                          <option value="4" className="bg-slate-900">4th Semester</option>
                          <option value="5" className="bg-slate-900">5th Semester</option>
                          <option value="6" className="bg-slate-900">6th Semester</option>
                          <option value="7" className="bg-slate-900">7th Semester</option>
                          <option value="8" className="bg-slate-900">8th Semester</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rollNum" className="text-white font-bold text-sm">Roll Number</Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                          <Input
                            id="rollNum"
                            type="text"
                            placeholder="e.g., 12345"
                            value={tempRollNum}
                            onChange={(e) => setTempRollNum(e.target.value)}
                            disabled={isSaving}
                            className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/30"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold gap-2 shadow-lg h-12"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="flex-1 border-slate-700 text-white hover:bg-slate-800/50 font-bold gap-2 h-12"
                    variant="outline"
                    disabled={isSaving}
                  >
                    <X className="h-5 w-5" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Back Button */}
            <Link href="/dashboard" className="sm:hidden block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold gap-2 h-12">
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
