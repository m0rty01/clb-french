'use client'

import Link from 'next/link'
import { ArrowLeft, ClipboardList, Mail, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/account" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-lg">Terms & Conditions</h1>
          <div className="w-5" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Terms & Conditions</h1>
                <p className="text-sm text-muted-foreground">Last updated: June 2025</p>
              </div>
            </div>

            {/* Important Notice */}
            <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                Please read these terms carefully before using CLB French Trainer. By accessing or using our service, you agree to be bound by these terms.
              </AlertDescription>
            </Alert>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
              {/* Agreement to Terms */}
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using CLB French Trainer (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  These Terms apply to all visitors, users, and others who access or use the Service, whether through a free account or a paid subscription.
                </p>
              </section>

              {/* Description of Service */}
              <section>
                <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CLB French Trainer is an online language learning platform designed to help users prepare for the Canadian Language Benchmarks (CLB) French proficiency tests, including TEF Canada and TCF Canada examinations.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Our Service includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                  <li>Practice tests for reading, listening, writing, and speaking</li>
                  <li>AI-powered writing evaluation (Premium feature)</li>
                  <li>Progress tracking and performance analytics</li>
                  <li>Daily learning activities and resources</li>
                  <li>Audio content for listening comprehension</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features of the Service, you must register for an account. When you create an account, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
                </p>
              </section>

              {/* Subscriptions and Payments */}
              <section>
                <h2 className="text-xl font-semibold mb-3">4. Subscriptions and Payments</h2>
                
                <h3 className="text-lg font-medium mt-4 mb-2">4.1 Free Tier</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our free tier provides limited access to practice tests and basic features. No payment is required for the free tier.
                </p>
                
                <h3 className="text-lg font-medium mt-4 mb-2">4.2 Paid Subscriptions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Premium features are available through paid subscriptions (Basic and Premium tiers). By subscribing, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                  <li>Pay all applicable fees as described at the time of purchase</li>
                  <li>Provide valid payment information</li>
                  <li>Accept that subscriptions may auto-renew unless cancelled</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-4 mb-2">4.3 Refund Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Refund requests are handled on a case-by-case basis. If you are unsatisfied with your subscription, please contact our support team within 7 days of purchase.
                </p>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-xl font-semibold mb-3">5. Acceptable Use Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You agree NOT to use the Service to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Share your account credentials with others</li>
                  <li>Attempt to reverse engineer or copy our content</li>
                  <li>Use automated systems to access the Service without permission</li>
                  <li>Distribute, sell, or commercially exploit our practice tests</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Transmit malware, viruses, or harmful code</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-xl font-semibold mb-3">6. Intellectual Property Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and functionality are owned by CLB French Trainer and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes in accordance with these Terms.
                </p>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-xl font-semibold mb-3">7. Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Educational Purpose:</strong> CLB French Trainer is designed for practice and preparation purposes only. We do not guarantee specific results on official TEF Canada or TCF Canada examinations.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  <strong>Service Availability:</strong> The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted or error-free access to the Service.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  <strong>AI Evaluation:</strong> Our AI-powered writing evaluation provides approximate assessments and should not be considered official CLB scores. Results are for practice guidance only.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, CLB French Trainer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use of the Service.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Our total liability for any claim arising from these Terms or the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  You may terminate your account at any time by contacting our support team. Upon termination, your right to use the Service will immediately cease.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-xl font-semibold mb-3">11. Changes to These Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice before the new terms take effect. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:support@clbfrenchtrainer.com" className="text-blue-600 hover:underline">
                    support@clbfrenchtrainer.com
                  </a>
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground italic">
                  By using CLB French Trainer, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
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
