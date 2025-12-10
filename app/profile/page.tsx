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
import { Mail, User, Edit2, Save, X, Loader2, ArrowLeft, Upload, CheckCircle, Book, Hash, MapPin, Code } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto">
          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-in fade-in duration-300">
              <p className="text-sm text-red-400 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0"></div>
                {error}
              </p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-in fade-in duration-300">
              <p className="text-sm text-green-400 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                {successMessage}
              </p>
            </div>
          )}

          {!isEditing ? (
            <>
              {/* Profile Header Card */}
              <div className="mb-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <img
                        src={displayAvatarUrl}
                        alt="Avatar"
                        className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
                      />
                    </div>
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="hidden sm:inline">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 sm:flex-1 px-6 sm:px-8 py-3 sm:py-4 border border-slate-700 hover:bg-slate-800/50 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <X className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  );
}>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                        {firstName} {lastName}
                      </h2>
                      {username && (
                        <p className="text-base sm:text-lg text-blue-400 font-semibold">@{username}</p>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {rollNum && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Roll Number</p>
                          <p className="text-sm font-bold text-white">{rollNum}</p>
                        </div>
                      )}
                      {branch && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Branch</p>
                          <p className="text-sm font-bold text-white">{branch}</p>
                        </div>
                      )}
                      {semester && (
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Semester</p>
                          <p className="text-sm font-bold text-white">{semester}</p>
                        </div>
                      )}
                    </div>

                    {/* Profile Completion */}
                    <div className="bg-slate-700/20 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-300">Profile Completion</p>
                        <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {profileCompletion}%
                        </p>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-blue-500/50"
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">First Name</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{firstName || 'Not set'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Last Name</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{lastName || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-400" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Email</p>
                      <p className="text-base sm:text-lg font-bold text-white break-all">{email || 'Not set'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Username</p>
                      <p className="text-base sm:text-lg font-bold text-white">{username ? `@${username}` : 'Not set'}</p>
                    </div>
                  </div>
                </div>

                {/* College Information */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-400" />
                    College Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Branch</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{branch || 'Not set'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Semester</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{semester ? `Semester ${semester}` : 'Not set'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-pink-500/50 transition-all">
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-2 uppercase tracking-wide">Roll Number</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{rollNum || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleEdit}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="h-5 w-5" />
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Avatar Section */}
              <div className="mb-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Update Avatar</h3>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative group flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75"></div>
                    <img
                      src={displayAvatarUrl}
                      alt="Avatar"
                      className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSaving}
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg disabled:opacity-50 transition-all transform hover:scale-110"
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      disabled={isSaving}
                      className="hidden"
                    />
                    <p className="text-slate-300 mb-3">Click the upload button to change your avatar</p>
                    <p className="text-sm text-slate-400">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Edit Form Sections */}
              <div className="space-y-8">
                {/* Personal Information Form */}
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        First Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-blue-400 pointer-events-none" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          value={tempFirstName}
                          onChange={(e) => setTempFirstName(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30 h-10 sm:h-12"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Last Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-purple-400 pointer-events-none" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          value={tempLastName}
                          onChange={(e) => setTempLastName(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/30 h-10 sm:h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Form */}
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-400" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="email" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400 pointer-events-none" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30 h-10 sm:h-12"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="username" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Username
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-blue-400 font-bold pointer-events-none">@</span>
                        <Input
                          id="username"
                          type="text"
                          placeholder="username"
                          value={tempUsername}
                          onChange={(e) => setTempUsername(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30 h-10 sm:h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* College Information Form */}
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-400" />
                    College Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="branch" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Branch
                      </Label>
                      <Input
                        id="branch"
                        type="text"
                        placeholder="e.g., CSE, ECE"
                        value={tempBranch}
                        onChange={(e) => setTempBranch(e.target.value)}
                        disabled={isSaving}
                        className="border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/30 h-10 sm:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="semester" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Semester
                      </Label>
                      <select
                        id="semester"
                        value={tempSemester}
                        onChange={(e) => setTempSemester(e.target.value)}
                        disabled={isSaving}
                        className="w-full px-3 py-2 sm:py-3 border border-slate-700 rounded-lg bg-slate-800/40 text-white focus:border-blue-500 focus:ring-blue-500/30 disabled:opacity-50 h-10 sm:h-12"
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
                    <div>
                      <Label htmlFor="rollNum" className="text-white font-bold mb-2 block text-sm sm:text-base">
                        Roll Number
                      </Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-3 h-5 w-5 text-purple-400 pointer-events-none" />
                        <Input
                          id="rollNum"
                          type="text"
                          placeholder="e.g., 12345"
                          value={tempRollNum}
                          onChange={(e) => setTempRollNum(e.target.value)}
                          disabled={isSaving}
                          className="pl-10 border-slate-700 bg-slate-800/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/30 h-10 sm:h-12"
                        />
                      </div>
                    </div>
                  </div
