
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
            <CardDescription>
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                1. Introduction
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Welcome to our Authentication App. These Terms & Conditions govern your use of our application and services. By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                2. User Accounts
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                When you create an account, you are responsible for maintaining the confidentiality of your password and account information. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                3. User Conduct
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                You agree not to use this application for any illegal or unauthorized purpose. You must comply with all laws, rules, and regulations applicable to your use of the service. Prohibited behavior includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 ml-4">
                <li>Harassing or causing distress or inconvenience to any person</li>
                <li>Obscene or abusive language or content</li>
                <li>Disrupting the normal flow of dialogue within our application</li>
                <li>Attempting to gain unauthorized access to our systems</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                4. Intellectual Property Rights
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Unless otherwise stated, we own the intellectual property rights for all material on this application. All intellectual property rights are reserved. You may view and print pages from the application for personal use, subject to restrictions set in these terms and conditions.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                5. Limitations of Liability
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                In no event shall our company, nor its directors, employees or agents, be liable to you in relation to the contents of, or use of, or otherwise in connection with, this application for any indirect, special or consequential loss, or for any business losses, loss of revenue, income, profits or anticipated savings.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                6. Termination
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms. Upon termination, your right to use the service will immediately cease.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                7. Changes to Terms
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We reserve the right to modify these terms and conditions at any time. Changes and clarifications will take effect immediately upon their posting on the website. Your continued use of the service following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                8. Governing Law
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                These Terms & Conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts located there.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Questions?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                If you have any questions about these Terms & Conditions, please contact us at support@example.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

