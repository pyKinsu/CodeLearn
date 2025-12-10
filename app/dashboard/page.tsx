'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';
import { getUserProfile } from '@/lib/userService';
import { getCompletedQuizzesCount, getWeeklyCompletedQuizzes } from '@/lib/quizService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, X, LogOut, Settings, FileText, HelpCircle, User, Code, BookOpen, Zap, ChevronRight, Award, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [completedQuizzesCount, setCompletedQuizzesCount] = useState(0);
  const [weeklyQuizzes, setWeeklyQuizzes] = useState<any[]>([]);
  const [totalQuestionsAttempted, setTotalQuestionsAttempted] = useState(0);

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
          
          // Fetch completed quizzes
          const count = await getCompletedQuizzesCount(user.uid);
          const weekly = await getWeeklyCompletedQuizzes(user.uid);
          
          setCompletedQuizzesCount(count);
          setWeeklyQuizzes(weekly);
          
          // Calculate total questions attempted
          const totalQuestions = weekly.reduce((acc, quiz) => acc + (quiz.totalQuestions || 0), 0);
          setTotalQuestionsAttempted(totalQuestions);
          
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

  const getRoboHashUrl = (name: string) => {
    const hashString = name.replace(/\s+/g, '') || 'user';
    return `https://robohash.org/${hashString}?size=200x200&set=set1`;
  };

  const avatarUrl = userProfile?.avatarUrl || getRoboHashUrl(`${userProfile?.firstName || 'User'} ${userProfile?.lastName || ''}`);

  // Show loading state while checking authentication
  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const learningCards = [
    {
      title: 'Learn C',
      description: 'Master C fundamentals and advanced concepts',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      link: '#',
    },
    {
      title: 'Learn C++',
      description: 'Object-oriented programming with C++',
      icon: Code,
      color: 'from-cyan-500 to-cyan-600',
      link: '#',
    },
    {
      title: 'Learn Python',
      description: 'Versatile Python for all applications',
      icon: Code,
      color: 'from-yellow-500 to-yellow-600',
      link: '#',
    },
    {
      title: 'Learn Java',
      description: 'Enterprise-grade Java development',
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      link: '#',
    },
    {
      title: 'Read Books',
      description: 'Comprehensive programming books and guides',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      link: '#',
    },
    {
      title: 'Code Examples',
      description: 'Real-world code examples for all languages',
      icon: Zap,
      color: 'from-pink-500 to-pink-600',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl shadow-lg">
        <div className="px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/dashboard" className="flex items-center gap-3 group flex-1 sm:flex-none">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-slate-950 px-3 py-2 rounded-lg">
                  <Code className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  CodeLearn
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">Master Programming</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <a href="#learning" className="text-slate-300 hover:text-white transition-colors font-medium text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Courses</a>
              <Link href="/profile" className="text-slate-300 hover:text-white transition-colors font-medium text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Profile</Link>
              <Link href="/help" className="text-slate-300 hover:text-white transition-colors font-medium text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">Help</Link>
            </nav>

            {/* Right Side - Avatar & Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Avatar - Desktop */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800/50 transition-all group hidden sm:flex"
              >
                <img
                  src={avatarUrl}
                  alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-400 group-hover:border-purple-400 transition-colors shadow-lg"
                />
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-white leading-tight">
                    {userProfile?.firstName}
                  </p>
                  <p className="text-xs text-slate-500">Student</p>
                </div>
              </button>

              {/* Avatar - Mobile */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex sm:hidden h-10 w-10 items-center justify-center rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all overflow-hidden"
              >
                <img
                  src={avatarUrl}
                  alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                  className="h-full w-full rounded-full object-cover border-2 border-blue-400"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-4 top-20 sm:right-6 w-80 bg-slate-800/95 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 border-b border-slate-700/30 bg-gradient-to-r from-slate-800 to-slate-900">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={avatarUrl}
                        alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-400"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{userProfile?.firstName} {userProfile?.lastName}</p>
                        <p className="text-xs text-slate-500 mt-1">{userProfile?.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Today'}</p>
                  </div>
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}>
                    <div className="flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white cursor-pointer transition-colors">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">View Profile</span>
                    </div>
                  </Link>
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}>
                    <div className="flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white cursor-pointer transition-colors">
                      <Settings className="h-4 w-4" />
                      <span className="text-sm font-medium">Edit Profile</span>
                    </div>
                  </Link>
                  <div className="border-t border-slate-700/30"></div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-slate-700/50 cursor-pointer transition-colors text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="mt-4 space-y-1 pb-4 border-t border-slate-700/30 pt-4 animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden">
              <a href="#learning" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer transition-colors">
                  <Code className="h-5 w-5" />
                  <span className="font-medium">Courses</span>
                </div>
              </a>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer transition-colors">
                  <User className="h-5 w-5" />
                  <span className="font-medium">My Profile</span>
                </div>
              </Link>
              <Link href="/help" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer transition-colors">
                  <HelpCircle className="h-5 w-5" />
                  <span className="font-medium">Help</span>
                </div>
              </Link>
              <Link href="/terms" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer transition-colors">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Terms</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800/50 cursor-pointer transition-colors font-medium mt-2 border-t border-slate-700/30 pt-4"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Welcome Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Card */}
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-white">
                Welcome back, {userProfile?.firstName}! 👋
              </CardTitle>
              <CardDescription className="text-blue-100 mt-2">
                Continue your learning journey and explore new programming languages
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Profile Cards - Show Below Welcome on Mobile */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Profile Card */}
            <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600/80 transition-all duration-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-white">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <img
                    src={avatarUrl}
                    alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                    className="h-20 w-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-100">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </p>
                  <p className="text-sm text-slate-400 truncate">{userProfile?.email}</p>
                  {userProfile?.username && <p className="text-xs text-slate-500 mt-1">@{userProfile?.username}</p>}
                </div>
                <Link href="/profile" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600/80 transition-all duration-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-white">Member Since</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-bold text-blue-400">
                  {userProfile?.createdAt
                    ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'Today'}
                </p>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Status</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Active
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section id="learning" className="px-4 py-12 sm:px-6 lg:px-8 border-t border-slate-700/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
              Start <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning</span>
            </h2>
            <p className="text-slate-400">Choose your learning path and master programming</p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
            {learningCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.title}
                  className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:border-slate-600/80 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-l ${card.color} opacity-10 group-hover:opacity-20 transition-opacity blur-3xl`}></div>
                  <CardHeader className="relative">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <Link href={card.link}>
                      <Button className={`w-full bg-gradient-to-r ${card.color} hover:shadow-lg transition-all text-white border-0 group-hover:translate-y-1 duration-300`}>
                        Get Started
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-slate-700/30">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Level Up?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Start with any language and progress at your own pace with our interactive lessons and quizzes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#learning">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                Explore Courses
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <Link href="/help">
              <Button variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800/50">
                Need Help?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
