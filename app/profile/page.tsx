'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { getUserProfile, updateUserProfile } from '@/lib/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, User, Edit2, Save, X, Loader2, ArrowLeft, Upload, CheckCircle, Hash } from 'lucide-react';

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
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
    <div className="min-h-screen bg-slate-50">
      {/* Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile Header (Desktop) / Full Width (Mobile) */}
          {!isEditing && (
            <div className="lg:col-span-1">
              <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={displayAvatarUrl}
                      alt="Avatar"
                      className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-slate-200 shadow-md"
                    />
                  </div>

                  {/* Name */}
                  <div className="text-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                      {firstName} {lastName}
                    </h2>
                    {username && (
                      <p className="text-sm text-slate-600">@{username}</p>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6 border-t border-slate-200 pt-6">
                    {email && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-sm text-slate-700 break-all">{email}</p>
                      </div>
                    )}
                    {branch && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Branch</p>
                        <p className="text-sm text-slate-700">{branch}</p>
                      </div>
                    )}
                    {semester && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Semester</p>
                        <p className="text-sm text-slate-700">Semester {semester}</p>
                      </div>
                    )}
                    {rollNum && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Roll Number</p>
                        <p className="text-sm text-slate-700">{rollNum}</p>
                      </div>
                    )}
                  </div>

                  {/* Profile Completion */}
                  <div className="bg-slate-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-slate-600">Profile Completion</p>
                      <p className="text-lg font-bold text-slate-900">{profileCompletion}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600 transition-all duration-500 rounded-full"
                        style={{ width: `${profileCompletion}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={handleEdit}
                    className="w-full mt-6 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Right Column - Profile Details / Edit Form */}
          <div className={isEditing ? 'lg:col-span-3' : 'lg:col-span-2'}>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {successMessage}
                </p>
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-6">
                {/* Personal Information Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <User className="h-5 w-5 text-slate-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">First Name</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{firstName || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Last Name</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{lastName || '-'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-slate-600" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Email</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900 break-all">{email || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Username</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{username ? `@${username}` : '-'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* College Information Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">College Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Branch</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{branch || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Semester</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{semester ? `Semester ${semester}` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Roll Number</p>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">{rollNum || '-'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Edit Avatar Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Update Avatar</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={displayAvatarUrl}
                          alt="Avatar"
                          className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-slate-200 shadow-md"
                        />
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isSaving}
                          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Photo
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          disabled={isSaving}
                          className="hidden"
                        />
                        <p className="text-sm text-slate-600 mt-3">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information Form */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-slate-900 font-semibold mb-2 block text-sm">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          value={tempFirstName}
                          onChange={(e) => setTempFirstName(e.target.value)}
                          disabled={isSaving}
                          className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          value={tempLastName}
                          onChange={(e) => setTempLastName(e.target.value)}
                          disabled={isSaving}
                          className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information Form */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          disabled={isSaving}
                          className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="username" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Username
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500 font-semibold pointer-events-none">@</span>
                          <Input
                            id="username"
                            type="text"
                            placeholder="username"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            disabled={isSaving}
                            className="pl-8 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* College Information Form */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">College Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="branch" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Branch
                        </Label>
                        <Input
                          id="branch"
                          type="text"
                          placeholder="e.g., CSE, ECE"
                          value={tempBranch}
                          onChange={(e) => setTempBranch(e.target.value)}
                          disabled={isSaving}
                          className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="semester" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Semester
                        </Label>
                        <select
                          id="semester"
                          value={tempSemester}
                          onChange={(e) => setTempSemester(e.target.value)}
                          disabled={isSaving}
                          className="w-full px-3 py-2 sm:py-3 border border-slate-300 rounded-lg bg-white text-slate-900 focus:border-slate-600 focus:ring-slate-600/20 disabled:opacity-50 h-10 sm:h-12"
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
                      <div>
                        <Label htmlFor="rollNum" className="text-slate-900 font-semibold mb-2 block text-sm">
                          Roll Number
                        </Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 h-5 w-5 text-slate-400 pointer-events-none" />
                          <Input
                            id="rollNum"
                            type="text"
                            placeholder="e.g., 12345"
                            value={tempRollNum}
                            onChange={(e) => setTempRollNum(e.target.value)}
                            disabled={isSaving}
                            className="pl-10 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 h-10 sm:h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="hidden sm:inline">Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 px-6 sm:px-8 py-3 sm:py-4 border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
