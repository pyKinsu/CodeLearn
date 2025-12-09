
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, MessageCircle, Globe } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click the Sign Up button on the home page, fill in your first name, last name, email, and password. Agree to the Terms of Service and click Sign Up. You\'ll be automatically logged in and redirected to the dashboard.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click the "Forgot password?" link on the login page. Enter your email address and we\'ll send you a password reset link. Check your email and click the link to create a new password.'
    },
    {
      question: 'Can I change my email address?',
      answer: 'Yes, you can change your email by going to your Profile page and clicking "Edit Profile". Update your email and click "Save Changes".'
    },
    {
      question: 'How do I delete my account?',
      answer: 'To delete your account, please contact our support team at support@example.com. We\'ll help you with the account deletion process.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Your passwords are securely hashed and stored. We never share your personal information with third parties.'
    },
    {
      question: 'Why am I unable to sign up?',
      answer: 'If you\'re unable to sign up, it might be because the email is already registered. Try logging in with that email or use a different email address. If you still have issues, contact support@example.com.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link href="/dashboard" className="mb-6 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Help & Support</CardTitle>
            <CardDescription>
              Find answers to common questions and get support
            </CardDescription>
          </CardHeader>
        </Card>

        {/* FAQs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Still need help?</CardTitle>
            <CardDescription className="text-blue-100">
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Support */}
            <div className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-lg">
              <Mail className="h-8 w-8 text-white" />
              <div className="text-center">
                <p className="font-semibold text-white">Email Support</p>
                <a 
                  href="mailto:support@example.com"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  support@example.com
                </a>
              </div>
            </div>

            {/* Chat Support */}
            <div className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-lg">
              <MessageCircle className="h-8 w-8 text-white" />
              <div className="text-center">
                <p className="font-semibold text-white">Live Chat</p>
                <p className="text-blue-100 text-sm">
                  Available 24/7
                </p>
              </div>
            </div>

            {/* Visit Website */}
            <div className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-lg">
              <Globe className="h-8 w-8 text-white" />
              <div className="text-center">
                <p className="font-semibold text-white">Website</p>
                <a 
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  www.example.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Email: 24-48 hours</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">We typically respond to emails within 24-48 hours.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Live Chat: Instant</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Chat support is available 24/7 for immediate assistance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}