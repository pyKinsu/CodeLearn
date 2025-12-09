'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';
import { getUserProfile } from '@/lib/userService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, X, LogOut, Settings, FileText, HelpCircle, User } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch user profile from Firestore
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          setProfileLoading(false);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setProfileLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return 'U';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Show loading state while checking authentication
  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-slate-800 border-r border-slate-700 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-white">Dashboard</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5 text-slate-300" /> : <Menu className="h-5 w-5 text-slate-300" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer text-slate-300 hover:text-white">
              <User className="h-5 w-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </div>
          </Link>

          <Link href="/profile">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer text-slate-300 hover:text-white">
              <Settings className="h-5 w-5" />
              {sidebarOpen && <span>Profile</span>}
            </div>
          </Link>

          <Link href="/terms">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer text-slate-300 hover:text-white">
              <FileText className="h-5 w-5" />
              {sidebarOpen && <span>Terms & Conditions</span>}
            </div>
          </Link>

          <Link href="/help">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer text-slate-300 hover:text-white">
              <HelpCircle className="h-5 w-5" />
              {sidebarOpen && <span>Help & Support</span>}
            </div>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Welcome to Dashboard</h2>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold cursor-pointer">
                {getInitials(userProfile?.firstName, userProfile?.lastName)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-white">
                  {userProfile?.firstName} {userProfile?.lastName}
                </p>
                <p className="text-xs text-slate-400">{userProfile?.email}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg border border-slate-600 z-10">
                <Link href="/profile">
                  <div className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-600 hover:text-white cursor-pointer rounded-t-lg transition-colors">
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-600 hover:text-white cursor-pointer transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </div>
                </Link>
                <div className="border-t border-slate-600"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-slate-600 cursor-pointer rounded-b-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <Card className="md:col-span-3 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
              <CardHeader>
                <CardTitle className="text-white text-3xl">
                  Welcome, {userProfile?.firstName}! 👋
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Your dashboard is ready. Manage your profile and account settings here.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>Your current profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Full Name</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{userProfile?.email}</p>
                </div>
                <Link href="/profile">
                  <Button className="w-full mt-4">Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Links Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
                <CardDescription>Access important resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/terms">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Terms & Conditions
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="ghost" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Stats</CardTitle>
                <CardDescription>Your account overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Account Status</p>
                  <p className="font-medium text-green-600">✓ Active</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Member Since</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {userProfile?.createdAt
                      ? new Date(userProfile.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}