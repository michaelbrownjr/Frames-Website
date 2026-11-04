import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  ArrowUpRight,
  Scale,
  Lock,
  CreditCard,
  Award,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Gavel,
  Mail,
  ExternalLink,
  Smartphone,
  Shield,
  BookOpen,
} from 'lucide-react';
import { useM3Theme, M3_SPRING_EXPRESSIVE } from '../theme/m3Theme';
import {
  AppPage,
  OFFICIAL_TERMS_URL,
  OFFICIAL_PRIVACY_URL,
  PLAY_STORE_URL,
  SUPPORT_EMAIL,
  getShareableUrlForPage,
} from '../utils/router';

interface TermsOfServiceProps {
  setCurrentPage?: (page: AppPage, sectionId?: string) => void;
}

interface TosSection {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  summary: string;
  content: React.ReactNode;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ setCurrentPage }) => {
  const { mode, palette } = useM3Theme();
  const [copiedOfficial, setCopiedOfficial] = useState(false);
  const [copiedLive, setCopiedLive] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('tos-section-1');

  const handleCopyOfficialUrl = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_TERMS_URL);
      setCopiedOfficial(true);
      setTimeout(() => setCopiedOfficial(false), 2600);
    } catch {
      const input = document.createElement('input');
      input.value = OFFICIAL_TERMS_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedOfficial(true);
      setTimeout(() => setCopiedOfficial(false), 2600);
    }
  };

  const handleCopyLiveUrl = async () => {
    const shareUrl = getShareableUrlForPage('terms');
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLive(true);
      setTimeout(() => setCopiedLive(false), 2600);
    } catch {
      setCopiedLive(true);
      setTimeout(() => setCopiedLive(false), 2600);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const executiveCards = [
    {
      title: '100% Media Ownership',
      badge: 'Commercial Ready',
      description:
        'You own every screenshot, screen recording, and mockup you create—for personal or commercial use across social media, client work, and Play Store listings.',
      icon: Award,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
    {
      title: '100% Local Processing',
      badge: 'Zero Cloud Uploads',
      description:
        'Framing, 60fps MP4 encoding, and ML Kit AI privacy redaction happen directly on your Android device; your media is never uploaded to our servers.',
      icon: Lock,
      containerVar: 'var(--m3-secondary-container)',
      onContainerVar: 'var(--m3-on-secondary-container)',
    },
    {
      title: 'Google Play Billing',
      badge: 'Verified Checkout',
      description:
        'All Frames Pro one-time purchases or optional subscriptions are securely processed, restored, and managed exclusively through Google Play.',
      icon: CreditCard,
      containerVar: 'var(--m3-tertiary-container)',
      onContainerVar: 'var(--m3-on-tertiary-container)',
    },
    {
      title: 'Independent Creator',
      badge: 'MichaelBTech, LLC',
      description:
        'Built independently by MichaelBTech, LLC for the Google Pixel community; not affiliated with, sponsored by, or endorsed by Google LLC.',
      icon: Sparkles,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
  ];

  const sections: TosSection[] = [
    {
      id: 'tos-section-1',
      number: '01',
      shortTitle: 'Acceptance & Scope',
      title: '1. Acceptance of Terms & Scope',
      badge: 'Binding Agreement',
      icon: BookOpen,
      summary:
        'Establishes the binding legal agreement between you and MichaelBTech, LLC governing the Frames for Pixel™ Android app and website.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            Welcome to <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong>. These Terms of
            Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo;
            &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> (&ldquo;Company,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your download, installation, access to,
            and use of the <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong> Android
            application (Google Play package identifier:{' '}
            <code
              className="px-2 py-0.5 rounded-md font-mono text-xs font-semibold"
              style={{
                backgroundColor: 'var(--m3-surface-container-highest)',
                color: 'var(--m3-primary)',
              }}
            >
              com.michaelbtech.framesforpixel
            </code>
            ) and our official website located at{' '}
            <code
              className="px-2 py-0.5 rounded-md font-mono text-xs font-semibold"
              style={{
                backgroundColor: 'var(--m3-surface-container-highest)',
                color: 'var(--m3-primary)',
              }}
            >
              frames.michaelbtech.com
            </code>{' '}
            (collectively, the &ldquo;Service&rdquo; or &ldquo;App&rdquo;).
          </p>
          <p>
            By downloading, installing, accessing, or using the App or Website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and our companion{' '}
            <button
              type="button"
              onClick={() => setCurrentPage?.('privacy')}
              className="underline font-semibold cursor-pointer transition-opacity hover:opacity-80"
              style={{ color: 'var(--m3-primary)' }}
            >
              Privacy Policy
            </button>
            . If you do not agree to these Terms, please do not install, access, or use the App.
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-2',
      number: '02',
      shortTitle: 'License & Commercial Use',
      title: '2. License Grant & Permitted Commercial Use',
      badge: 'Creator Friendly',
      icon: Award,
      summary:
        'Grants a license to use the App and expressly permits commercial publishing and monetization of your exported framed mockups.',
      content: (
        <div className="space-y-5 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            Subject to your compliance with these Terms, <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong>{' '}
            grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to download,
            install, and use the App on Android or ChromeOS devices that you own or control.
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Express Commercial & Editorial Output License:</strong>{' '}
            You are expressly permitted to publish, monetize, broadcast, and distribute the framed screenshots, video
            mockups, and visual compositions you export using the App for both personal and commercial purposes—including
            on social media, monetized YouTube videos, technology journalism, client portfolios, press kits, marketing
            materials, and Google Play Store or Apple App Store promotional listings—provided that you do not extract,
            rip, or redistribute the underlying raw device frame vector assets, 3D meshes, or shader templates as a
            standalone or competing mockup/framing product, asset pack, or template library.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div
              className="p-5 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--m3-primary)' }} />
                <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--m3-on-surface)' }}>
                  Permitted Uses (100% Allowed)
                </h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-primary)' }}>•</span>
                  <span>Google Play Store & App Store promotional screenshots and feature graphics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-primary)' }}>•</span>
                  <span>Monetized YouTube videos, TikTok/Reels, tech reviews, and sponsored posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-primary)' }}>•</span>
                  <span>Client UI/UX deliverables, agency pitch decks, and commercial landing pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-primary)' }}>•</span>
                  <span>Press kits, journalism, documentation, and social media showcases</span>
                </li>
              </ul>
            </div>

            <div
              className="p-5 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <XCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--m3-tertiary)' }} />
                <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--m3-on-surface)' }}>
                  Prohibited Asset Redistribution
                </h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-tertiary)' }}>•</span>
                  <span>Extracting or decompiling raw hardware frame vectors/PNGs from the APK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-tertiary)' }}>•</span>
                  <span>Reselling or bundling our custom Pixel hardware vectors in Figma/Canva asset packs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-tertiary)' }}>•</span>
                  <span>Using extracted App assets to build a competing device framing utility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--m3-tertiary)' }}>•</span>
                  <span>Modifying APK billing checks or redistributing modified APK packages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tos-section-3',
      number: '03',
      shortTitle: 'User Content & Local Processing',
      title: '3. User Content & Local Device Processing',
      badge: '100% On-Device',
      icon: Smartphone,
      summary:
        'You retain full ownership of your original screenshots, screen recordings, and exported mockups. All rendering happens locally on your phone.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Full Ownership of User Content:</strong> You retain all
            copyright, trademark, and other intellectual property rights in the original screenshots, photos, screen
            recordings, custom watermarks, and exported mockups (&ldquo;User Content&rdquo;) that you process using{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong>.{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> claims no ownership rights over
            your original media or your final exported creations.
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>100% Local On-Device Rendering:</strong> All image framing,
            4K PNG rendering, 60fps MP4 video compositing, background shader generation, and AI privacy redaction occur
            entirely locally on your Android device using your device&apos;s CPU, GPU, and RAM. We do not operate cloud
            media servers, and your screenshots and videos are never uploaded, transmitted, or stored on any{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> server.
          </p>
          <p>
            You are solely responsible for your User Content and represent that you have all necessary rights,
            permissions, or clearances to frame, modify, and share any screenshots or recordings you export.
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-4',
      number: '04',
      shortTitle: 'Frames Pro & Play Billing',
      title: '4. Frames Pro Upgrades, Subscriptions & Google Play Billing',
      badge: 'Google Play Billing',
      icon: CreditCard,
      summary:
        'Covers one-time purchases, optional auto-renewing subscriptions, 24-hour cancellation notice, purchase restoration, and refund policies.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong> is offered as a Freemium
            application. Core framing capabilities are available at no cost, while advanced studio capabilities—such as
            60fps MP4 Video Framing, Batch Queue Export (up to 15 images at once), On-Device AI Privacy Redaction,
            Foldable Dual-Posture presets, and Custom Studio Watermarks—may be unlocked via{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames Pro</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
            <div
              className="p-4 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--m3-primary)' }}>
                Exclusive Checkout
              </div>
              <div className="font-bold text-sm mb-1" style={{ color: 'var(--m3-on-surface)' }}>
                Google Play Billing
              </div>
              <p className="text-xs leading-relaxed">
                All Frames Pro one-time In-App Purchases or optional recurring subscriptions are processed exclusively
                through Google Play Billing. We never collect or store your payment card numbers.
              </p>
            </div>

            <div
              className="p-4 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--m3-primary)' }}>
                Auto-Renewal & Cancel
              </div>
              <div className="font-bold text-sm mb-1" style={{ color: 'var(--m3-on-surface)' }}>
                24-Hour Notice Window
              </div>
              <p className="text-xs leading-relaxed">
                If an optional subscription plan is selected, billing recurs automatically unless canceled at least 24
                hours before the end of the current billing period in Google Play Store &rarr; Subscriptions.
              </p>
            </div>

            <div
              className="p-4 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--m3-primary)' }}>
                Restore & Refunds
              </div>
              <div className="font-bold text-sm mb-1" style={{ color: 'var(--m3-on-surface)' }}>
                Cross-Device Entitlement
              </div>
              <p className="text-xs leading-relaxed">
                Purchases automatically restore across Android devices signed into the same Google account. Refunds
                follow Google Play&apos;s refund policies or can be requested via {SUPPORT_EMAIL}.
              </p>
            </div>
          </div>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Subscriptions & Auto-Renewal:</strong> If a recurring
            subscription plan is offered and selected, your Google Play account will be charged automatically at the
            confirmation of purchase and at the start of each renewal cycle unless you cancel at least{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>24 hours prior</strong> to the end of the current billing
            period. You can manage or cancel your subscription at any time by opening the{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Google Play Store</strong> app, tapping your profile icon,
            and selecting <strong style={{ color: 'var(--m3-on-surface)' }}>Payments &amp; subscriptions &rarr; Subscriptions</strong>.
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Refunds &amp; Restoration:</strong> Purchase restoration
            across devices signed into the same Google account is supported natively via Google Play Billing. Refund
            requests are subject to Google Play&apos;s standard refund policies, or you may contact us directly at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="underline font-semibold"
              style={{ color: 'var(--m3-primary)' }}
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            with your Google Play Order ID (e.g., <code className="font-mono text-xs">GPA.xxxx-xxxx-xxxx-xxxxx</code>)
            for assistance.
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-5',
      number: '05',
      shortTitle: 'AI Redaction Disclaimer',
      title: '5. On-Device AI Privacy Redaction Disclaimer',
      badge: 'ML Kit Limitation Notice',
      icon: Cpu,
      summary:
        'Explains that automated on-device ML Kit detection is a convenience aid and users must visually verify all redacted exports before sharing.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames Pro</strong> includes an{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>On-Device AI Privacy Redaction</strong> tool powered
            locally by <strong style={{ color: 'var(--m3-on-surface)' }}>Google ML Kit</strong> (along with a manual
            freehand redaction lasso) designed to assist users in detecting and blurring sensitive text, email
            addresses, phone numbers, and faces within screenshots.
          </p>
          <div
            className="p-5 rounded-2xl border flex items-start gap-3.5"
            style={{
              backgroundColor: 'var(--m3-tertiary-container)',
              color: 'var(--m3-on-tertiary-container)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="text-sm space-y-1.5">
              <div className="font-extrabold tracking-tight text-base">
                Important Limitation &amp; Visual Inspection Requirement
              </div>
              <p className="leading-relaxed opacity-95">
                Automated machine learning detection is provided strictly as a convenience aid and is{' '}
                <strong>not guaranteed to detect 100%</strong> of sensitive, confidential, financial, medical, or
                personally identifiable information (PII). Stylized fonts, low-contrast text, partial faces, or
                non-standard layouts may not be recognized automatically.{' '}
                <strong>
                  You are solely responsible for visually inspecting all exported images and videos prior to sharing or
                  publishing
                </strong>{' '}
                and using the manual freehand redaction lasso to cover any remaining sensitive information.
              </p>
            </div>
          </div>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> shall not be liable for any
            inadvertent disclosure of unredacted or partially redacted information resulting from reliance on automated
            detection without manual visual verification.
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-6',
      number: '06',
      shortTitle: 'IP & Trademarks',
      title: '6. Intellectual Property & Trademark Notice',
      badge: 'Independent App',
      icon: Scale,
      summary:
        'Clarifies MichaelBTech, LLC ownership of App code/shaders and states our independent status regarding Google LLC trademarks.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>App Ownership:</strong> The App&apos;s user interface
            design, source code, custom AGSL/GLSL shaders, original vector illustrations, studio templates, and the{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong> brand identity are owned by{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> and are protected by United
            States and international copyright, trade dress, and intellectual property laws.
          </p>
          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: 'var(--m3-surface-container-low)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--m3-primary)' }}>
              Official Trademark Disclaimer
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--m3-on-surface)' }}>
              <strong>Google</strong>, <strong>Google Pixel</strong>, <strong>Pixel</strong>,{' '}
              <strong>Pixel Fold</strong>, <strong>Pixel Pro Fold</strong>, <strong>Pixel Tablet</strong>,{' '}
              <strong>Android</strong>, <strong>ChromeOS</strong>, <strong>Material You</strong>, and{' '}
              <strong>Google Play</strong> are trademarks of <strong>Google LLC</strong>.{' '}
              <strong>Frames for Pixel™</strong> is an independent product developed by{' '}
              <strong>MichaelBTech, LLC</strong> and is not affiliated with, sponsored by, or endorsed by Google LLC.
              All device names and colorway names are used strictly for descriptive compatibility and identification
              purposes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'tos-section-7',
      number: '07',
      shortTitle: 'Acceptable Use',
      title: '7. Acceptable Use & Restrictions',
      badge: 'Fair Use Rules',
      icon: Shield,
      summary:
        'Prohibits reverse engineering, decompiling, tampering with Google Play Billing verification, or unlawful/deceptive use.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            You agree not to, and you will not permit any third party to:
          </p>
          <ul className="space-y-2.5 pl-1">
            <li className="flex items-start gap-2.5">
              <span className="font-bold" style={{ color: 'var(--m3-primary)' }}>a)</span>
              <span>
                Reverse engineer, decompile, disassemble, decrypt, or attempt to derive the source code, underlying
                shaders, or raw vector hardware assets of the App, except to the limited extent that such restriction is
                expressly prohibited by applicable law;
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold" style={{ color: 'var(--m3-primary)' }}>b)</span>
              <span>
                Bypass, spoof, patch, modify, or tamper with the App&apos;s{' '}
                <strong style={{ color: 'var(--m3-on-surface)' }}>Google Play Billing</strong> entitlement verification
                mechanisms or distribute modified/cracked APK or AAB packages;
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold" style={{ color: 'var(--m3-primary)' }}>c)</span>
              <span>
                Use the App to fabricate deceptive, fraudulent, defamatory, or unlawful content, or to infringe upon the
                intellectual property or privacy rights of any third party.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'tos-section-8',
      number: '08',
      shortTitle: 'Disclaimer of Warranties',
      title: '8. Disclaimer of Warranties ("AS IS" & "AS AVAILABLE")',
      badge: 'Warranty Notice',
      icon: AlertTriangle,
      summary:
        'Standard commercial warranty disclaimer stating the App is provided "AS IS" and "AS AVAILABLE" to the maximum extent permitted by law.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE APP AND WEBSITE ARE PROVIDED ON AN{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>&ldquo;AS IS&rdquo;</strong> AND{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>&ldquo;AS AVAILABLE&rdquo;</strong> BASIS, WITH ALL FAULTS
            AND WITHOUT WARRANTY OF ANY KIND. <strong style={{ color: 'var(--m3-on-surface)' }}>MICHAELBTECH, LLC</strong>{' '}
            EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT
            LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
            NON-INFRINGEMENT, AND QUIET ENJOYMENT.
          </p>
          <p>
            WITHOUT LIMITING THE FOREGOING, <strong style={{ color: 'var(--m3-on-surface)' }}>MICHAELBTECH, LLC</strong>{' '}
            DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, COMPATIBLE WITH EVERY ANDROID ROM OR
            HARDWARE CONFIGURATION, OR THAT AUTOMATED ON-DEVICE ML KIT PRIVACY REDACTION WILL DETECT EVERY INSTANCE OF
            SENSITIVE INFORMATION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE
            EXCLUSIONS MAY NOT APPLY TO YOU IN FULL.
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-9',
      number: '09',
      shortTitle: 'Limitation of Liability',
      title: '9. Limitation of Liability',
      badge: 'Liability Cap',
      icon: Gavel,
      summary:
        'Excludes indirect/consequential damages and caps aggregate liability for MichaelBTech, LLC to the amount paid for the App in the prior 12 months.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MICHAELBTECH, LLC</strong>, ITS FOUNDERS, OFFICERS,
            AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
            PUNITIVE DAMAGES (INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, OR BUSINESS INTERRUPTION) ARISING
            OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE APP OR ANY EXPORTED
            CONTENT, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR OTHERWISE), EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            IN NO EVENT SHALL THE AGGREGATE LIABILITY OF{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MICHAELBTECH, LLC</strong> FOR ALL CLAIMS RELATING TO THE
            APP EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT YOU PAID TO{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MICHAELBTECH, LLC</strong> VIA GOOGLE PLAY FOR{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>FRAMES PRO</strong> IN THE TWELVE (12) MONTHS PRECEDING
            THE CLAIM, OR (B) TEN UNITED STATES DOLLARS ($10.00 USD).
          </p>
        </div>
      ),
    },
    {
      id: 'tos-section-10',
      number: '10',
      shortTitle: 'Governing Law & Contact',
      title: '10. Governing Law, Changes to Terms & Contact Information',
      badge: 'Contact Support',
      icon: Mail,
      summary:
        'Governed by the federal laws of the United States and applicable state laws. Direct developer contact at michael@michaelbtech.com.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Governing Law:</strong> These Terms and any dispute or
            claim arising out of or in connection with them shall be governed by and construed in accordance with the
            federal laws of the United States and applicable state laws, without regard to conflict of law principles.
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Changes to These Terms:</strong> We may update these Terms
            from time to time to reflect new Pixel device support, new features, or legal/regulatory updates. When we
            make changes, we will update the &ldquo;Last Updated / Effective Date&rdquo; at the top of this page (`https://frames.michaelbtech.com/terms`). Continued use of the App after any changes become effective constitutes your acceptance of the revised Terms.
          </p>
          <div
            className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
            style={{
              backgroundColor: 'var(--m3-surface-container-low)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--m3-primary)' }}>
                Official Developer Contact
              </div>
              <div className="font-bold text-base" style={{ color: 'var(--m3-on-surface)' }}>
                MichaelBTech, LLC — Frames for Pixel™ Legal &amp; Support
              </div>
              <div className="text-sm mt-0.5">
                Email:{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-mono font-semibold underline"
                  style={{ color: 'var(--m3-primary)' }}
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Frames%20for%20Pixel%20Terms%20of%20Service%20Inquiry`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-transform active:scale-95 shrink-0"
              style={{
                backgroundColor: 'var(--m3-primary)',
                color: 'var(--m3-on-primary)',
              }}
            >
              <Mail className="w-4 h-4" />
              Email {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen pt-28 pb-24 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--m3-surface)',
        color: 'var(--m3-on-surface)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Cross-Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => setCurrentPage?.('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: 'var(--m3-surface-container)',
              color: 'var(--m3-on-surface)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: 'var(--m3-primary)' }} />
            Back to Frames for Pixel™ Home
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: 'var(--m3-surface-container-low)',
                color: 'var(--m3-on-surface-variant)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              M3 Theme: <strong style={{ color: 'var(--m3-primary)' }}>{palette.name}</strong> ({mode})
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage?.('privacy')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--m3-secondary-container)',
                color: 'var(--m3-on-secondary-container)',
              }}
            >
              <ShieldCheck className="w-4 h-4" />
              View Privacy Policy
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expressive Legal Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.05 }}
          className="rounded-[36px] p-7 sm:p-10 lg:p-12 mb-10 border relative overflow-hidden"
          style={{
            backgroundColor: 'var(--m3-surface-container)',
            borderColor: 'var(--m3-outline-variant)',
          }}
        >
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: 'var(--m3-primary-container)',
                color: 'var(--m3-on-primary-container)',
              }}
            >
              <Scale className="w-4 h-4" />
              Official Legal Agreement • Google Play Compliant
            </div>

            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: 'var(--m3-on-surface)' }}
            >
              Terms of Service for{' '}
              <span style={{ color: 'var(--m3-primary)' }}>Frames for Pixel™</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'var(--m3-on-surface-variant)' }}>
              Plain-English transparency paired with comprehensive legal protection. Built so creators, developers, and
              reviewers can frame, redact, and publish Google Pixel mockups with complete confidence.
            </p>
          </div>

          {/* Metadata Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 border-t" style={{ borderColor: 'var(--m3-outline-variant)' }}>
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'var(--m3-surface-container-low)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--m3-on-surface-variant)' }}>
                Last Updated / Effective Date
              </div>
              <div className="font-bold text-sm sm:text-base" style={{ color: 'var(--m3-on-surface)' }}>
                November 4, 2026
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'var(--m3-surface-container-low)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--m3-on-surface-variant)' }}>
                App Package ID
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm break-all" style={{ color: 'var(--m3-primary)' }}>
                com.michaelbtech.framesforpixel
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'var(--m3-surface-container-low)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--m3-on-surface-variant)' }}>
                Developer Entity
              </div>
              <div className="font-bold text-sm sm:text-base" style={{ color: 'var(--m3-on-surface)' }}>
                MichaelBTech, LLC
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'var(--m3-surface-container-low)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--m3-on-surface-variant)' }}>
                Direct Legal Contact
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-mono font-bold text-xs sm:text-sm underline"
                style={{ color: 'var(--m3-primary)' }}
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Executive Summary & At-a-Glance Rights Grid (4 M3 Expressive Tonal Cards) */}
        <section aria-labelledby="executive-summary-heading" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--m3-primary)' }}
              >
                Executive Summary
              </span>
              <h2
                id="executive-summary-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1"
                style={{ color: 'var(--m3-on-surface)' }}
              >
                Your Rights &amp; Protections at a Glance
              </h2>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
              Summary provided for convenience; the full 10 sections below govern legally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {executiveCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.08 + idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[28px] p-6 border flex flex-col justify-between transition-shadow"
                  style={{
                    backgroundColor: 'var(--m3-surface-container)',
                    borderColor: 'var(--m3-outline-variant)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: card.containerVar,
                          color: card.onContainerVar,
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: card.containerVar,
                          color: card.onContainerVar,
                        }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--m3-on-surface)' }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Interactive Table of Contents + Complete 10-Section Legal Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div
              className="rounded-[28px] p-6 border"
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-base tracking-tight" style={{ color: 'var(--m3-on-surface)' }}>
                  Table of Contents
                </h3>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--m3-primary-container)',
                    color: 'var(--m3-on-primary-container)',
                  }}
                >
                  10 Sections
                </span>
              </div>

              <nav aria-label="Terms of Service Sections" className="space-y-1.5">
                {sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer"
                      style={{
                        backgroundColor: isActive
                          ? 'var(--m3-primary-container)'
                          : 'transparent',
                        color: isActive
                          ? 'var(--m3-on-primary-container)'
                          : 'var(--m3-on-surface-variant)',
                      }}
                    >
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-lg font-bold shrink-0"
                        style={{
                          backgroundColor: isActive
                            ? 'var(--m3-primary)'
                            : 'var(--m3-surface-container-high)',
                          color: isActive
                            ? 'var(--m3-on-primary)'
                            : 'var(--m3-on-surface-variant)',
                        }}
                      >
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.shortTitle}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Cross-Links inside TOC */}
              <div
                className="mt-6 pt-5 border-t space-y-2.5"
                style={{ borderColor: 'var(--m3-outline-variant)' }}
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage?.('privacy')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-opacity hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--m3-secondary-container)',
                    color: 'var(--m3-on-secondary-container)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Read Official Privacy Policy
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold border transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--m3-surface-container-low)',
                    color: 'var(--m3-on-surface)',
                    borderColor: 'var(--m3-outline-variant)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" style={{ color: 'var(--m3-primary)' }} />
                    Google Play Store Listing
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* 10 Legal Sections Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  onMouseEnter={() => setActiveSectionId(section.id)}
                  className="rounded-[32px] p-6 sm:p-8 border transition-all scroll-mt-32"
                  style={{
                    backgroundColor: 'var(--m3-surface-container)',
                    borderColor:
                      activeSectionId === section.id
                        ? 'var(--m3-primary)'
                        : 'var(--m3-outline-variant)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--m3-primary-container)',
                          color: 'var(--m3-on-primary-container)',
                        }}
                      >
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className="text-xs font-mono font-bold uppercase tracking-wider"
                          style={{ color: 'var(--m3-primary)' }}
                        >
                          Section {section.number}
                        </span>
                        <h2
                          className="text-xl sm:text-2xl font-extrabold tracking-tight"
                          style={{ color: 'var(--m3-on-surface)' }}
                        >
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: 'var(--m3-surface-container-high)',
                        color: 'var(--m3-on-surface-variant)',
                      }}
                    >
                      {section.badge}
                    </span>
                  </div>

                  {/* Plain-language Takeaway Pill */}
                  <div
                    className="p-3.5 rounded-2xl mb-5 text-xs sm:text-sm font-medium border-l-4"
                    style={{
                      backgroundColor: 'var(--m3-surface-container-low)',
                      color: 'var(--m3-on-surface)',
                      borderLeftColor: 'var(--m3-primary)',
                    }}
                  >
                    <strong>Plain-English Summary:</strong> {section.summary}
                  </div>

                  {/* Full Legal Body */}
                  <div className="text-sm sm:text-base">{section.content}</div>
                </section>
              );
            })}

            {/* Bottom Legal Cross-Navigation Footer Card */}
            <div
              className="rounded-[32px] p-7 sm:p-8 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{
                backgroundColor: 'var(--m3-surface-container-high)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--m3-primary)' }}>
                  Companion Legal Document
                </div>
                <h3 className="text-xl font-extrabold" style={{ color: 'var(--m3-on-surface)' }}>
                  Review our On-Device Privacy Policy
                </h3>
                <p className="text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  See our interactive 5-node data flow diagram and how ML Kit AI Redaction operates 100% locally.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrentPage?.('privacy')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-transform active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--m3-primary)',
                    color: 'var(--m3-on-primary)',
                  }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Open Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
