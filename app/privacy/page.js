'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/account" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-lg">Privacy Policy</h1>
          <div className="w-5" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground">Last updated: June 2025</p>
              </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to CLB French Trainer ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Create an account or register for our services</li>
                  <li>Complete practice tests and learning activities</li>
                  <li>Subscribe to our premium services</li>
                  <li>Contact us for customer support</li>
                  <li>Participate in surveys or promotional activities</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The personal information we may collect includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                  <li>Name and email address</li>
                  <li>Account credentials (encrypted)</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>Learning progress and test scores</li>
                  <li>Device and usage information</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Track your learning progress and personalize your experience</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Analyze usage patterns to improve our application</li>
                  <li>Protect against fraudulent or unauthorized activity</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure password hashing using industry-standard algorithms</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information by authorized personnel only</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We may use third-party services that collect, monitor, and analyze information to improve our service. These include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Google Analytics:</strong> For usage analytics and insights</li>
                  <li><strong>Google Cloud:</strong> For text-to-speech services in listening exercises</li>
                  <li><strong>MongoDB:</strong> For secure data storage</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  These third parties have their own privacy policies addressing how they use such information.
                </p>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-xl font-semibold mb-3">6. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our application and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-xl font-semibold mb-3">7. Your Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of inaccurate information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to withdraw consent at any time</li>
                  <li>The right to data portability</li>
                  <li>The right to opt-out of marketing communications</li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete that information.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-xl font-semibold mb-3">9. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <a href="mailto:support@clbfrenchtrainer.com" className="text-purple-600 hover:underline">
                    support@clbfrenchtrainer.com
                  </a>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>© 2025 CLB French Trainer. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}
