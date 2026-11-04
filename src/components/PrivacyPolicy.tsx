import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileText,
  Lock,
  Cpu,
  CreditCard,
  Activity,
  Smartphone,
  Copy,
  Check,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  EyeOff,
  ServerOff,
  Database,
  Cookie,
  Users,
  Mail,
  Sparkles,
  Bug,
  Layers,
  Globe,
} from 'lucide-react';
import { useM3Theme, M3_SPRING_EXPRESSIVE } from '../theme/m3Theme';
import {
  AppPage,
  OFFICIAL_PRIVACY_URL,
  OFFICIAL_TERMS_URL,
  PLAY_STORE_URL,
  SUPPORT_EMAIL,
  getShareableUrlForPage,
} from '../utils/router';

interface PrivacyPolicyProps {
  setCurrentPage?: (page: AppPage, sectionId?: string) => void;
}

interface FlowNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  scopeBadge: string;
  description: string;
  dataPoints: string[];
  guarantee: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  containerVar: string;
  onContainerVar: string;
}

interface PolicySection {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  summary: string;
  content: React.ReactNode;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setCurrentPage }) => {
  const { mode, palette } = useM3Theme();
  const [copiedOfficial, setCopiedOfficial] = useState(false);
  const [copiedLive, setCopiedLive] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-device');
  const [activeSectionId, setActiveSectionId] = useState<string>('privacy-section-1');

  const handleCopyOfficialUrl = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_PRIVACY_URL);
      setCopiedOfficial(true);
      setTimeout(() => setCopiedOfficial(false), 2600);
    } catch {
      const input = document.createElement('input');
      input.value = OFFICIAL_PRIVACY_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedOfficial(true);
      setTimeout(() => setCopiedOfficial(false), 2600);
    }
  };

  const handleCopyLiveUrl = async () => {
    const shareUrl = getShareableUrlForPage('privacy');
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
      title: 'Zero Direct PII Collection',
      badge: 'No Account Required',
      description:
        'We never require you to create an account, sign in, or provide your name, email address, phone number, or contact list to use Frames for Pixel™.',
      icon: EyeOff,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
    {
      title: '100% On-Device Media & ML Kit AI',
      badge: 'Offline Sandbox',
      description:
        'Every screenshot, 60fps screen recording, and Google ML Kit AI Privacy Redaction pass executes locally in your device RAM—never uploaded to the cloud.',
      icon: Cpu,
      containerVar: 'var(--m3-secondary-container)',
      onContainerVar: 'var(--m3-on-secondary-container)',
    },
    {
      title: 'Secure Google Play Billing',
      badge: 'PCI-DSS via Google',
      description:
        'Frames Pro one-time unlocks and optional subscriptions are processed directly by Google Play. MichaelBTech, LLC never sees your payment card numbers.',
      icon: CreditCard,
      containerVar: 'var(--m3-tertiary-container)',
      onContainerVar: 'var(--m3-on-tertiary-container)',
    },
    {
      title: 'Anonymized Diagnostics',
      badge: 'Crash & Stability',
      description:
        'We use Google Analytics for Firebase and Firebase Crashlytics strictly for aggregated feature usage and anonymized crash stack traces.',
      icon: Activity,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
  ];

  const flowNodes: FlowNode[] = [
    {
      id: 'node-device',
      step: 'Node 01',
      title: 'Your Pixel Device',
      subtitle: '100% local image & video framing; your media never leaves your phone',
      scopeBadge: '100% Local RAM/GPU',
      description:
        'When you pick a screenshot or screen recording using the Android Photo Picker, the file is loaded directly into local device memory. Hardware bezels, shadows, mesh gradients, and 4K/60fps exports are rendered entirely on your phone.',
      dataPoints: [
        'Original screenshots & MP4 screen recordings (local read only)',
        'Exported 4K PNGs & 60fps MP4 mockups saved to /Pictures/FramesForPixel',
        'Local studio presets, favorite Pixel models, and theme preferences',
      ],
      guarantee: 'Zero bytes of your images or videos are ever transmitted off your device.',
      icon: Smartphone,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
    {
      id: 'node-mlkit',
      step: 'Node 02',
      title: 'On-Device ML Kit AI',
      subtitle: 'Local face, email & text detection for AI Privacy Redaction; zero cloud uploads',
      scopeBadge: 'Offline Neural Engine',
      description:
        'Frames Pro uses Google ML Kit On-Device Text Recognition and Face Detection APIs to locate email addresses, phone numbers, and faces so you can blur or pixelate them with a single tap—plus a manual freehand redaction lasso.',
      dataPoints: [
        'Bounding-box coordinates of detected text blocks, emails & phone numbers',
        'Facial bounding boxes for instant Gaussian blur / pixelation masking',
        'Ephemeral bitmap buffers cleared immediately after export',
      ],
      guarantee: 'Runs 100% offline on-device. No OCR text or facial geometry ever leaves your phone.',
      icon: Cpu,
      containerVar: 'var(--m3-secondary-container)',
      onContainerVar: 'var(--m3-on-secondary-container)',
    },
    {
      id: 'node-billing',
      step: 'Node 03',
      title: 'Google Play Billing',
      subtitle: 'Handles Frames Pro purchases securely; MichaelBTech, LLC never sees or stores your payment card details',
      scopeBadge: 'Google Play Encrypted',
      description:
        'When you upgrade to Frames Pro (via one-time purchase or optional subscription), the transaction is handled directly by the official Google Play Store Billing client on your Android device.',
      dataPoints: [
        'Cryptographic purchase token & product entitlement status (Pro unlocked)',
        'Anonymous order status verification via Google Play Services',
        'Cross-device entitlement restoration tied to your Google Play account',
      ],
      guarantee: 'MichaelBTech, LLC never receives your credit card number, billing address, or banking credentials.',
      icon: CreditCard,
      containerVar: 'var(--m3-tertiary-container)',
      onContainerVar: 'var(--m3-on-tertiary-container)',
    },
    {
      id: 'node-analytics',
      step: 'Node 04',
      title: 'Google Analytics',
      subtitle: 'Anonymized feature interaction and session metrics via Firebase',
      scopeBadge: 'Aggregated Telemetry',
      description:
        'Helps us understand which Pixel device frames (e.g., Pixel 10 Pro XL vs. Pixel 10 Pro Fold) and background styles are most popular so we can prioritize new hardware releases.',
      dataPoints: [
        'Anonymized app session counts and screen view events',
        'Aggregated frame model selection counts (never the image inside the frame)',
        'General country/region & Android OS version distribution',
      ],
      guarantee: 'Never linked to your personal identity, screenshots, or private files.',
      icon: Activity,
      containerVar: 'var(--m3-primary-container)',
      onContainerVar: 'var(--m3-on-primary-container)',
    },
    {
      id: 'node-crashlytics',
      step: 'Node 05',
      title: 'Firebase Crashlytics',
      subtitle: 'Anonymized crash stack traces and device model diagnostics to fix bugs',
      scopeBadge: 'Stability Diagnostics',
      description:
        'If the App encounters an unexpected error or GPU out-of-memory exception during 4K/60fps rendering, Firebase Crashlytics sends an anonymized diagnostic report so we can ship a fix rapidly.',
      dataPoints: [
        'De-obfuscated Kotlin/Java stack trace at the moment of a crash',
        'Device manufacturer, model name, available RAM, and Android API level',
        'Ephemeral Crashlytics installation UUID for deduplicating bug reports',
      ],
      guarantee: 'Contains zero user media, zero OCR text, and zero personal contact details.',
      icon: Bug,
      containerVar: 'var(--m3-secondary-container)',
      onContainerVar: 'var(--m3-on-secondary-container)',
    },
  ];

  const activeNode = flowNodes.find((n) => n.id === selectedNodeId) || flowNodes[0];

  const sections: PolicySection[] = [
    {
      id: 'privacy-section-1',
      number: '01',
      shortTitle: 'Introduction & Scope',
      title: '1. Introduction & Privacy Commitment',
      badge: 'Overview',
      icon: ShieldCheck,
      summary:
        'Explains who we are (MichaelBTech, LLC) and our core architecture principle: your media stays 100% on your device.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) built the{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong> Android application (Google
            Play package ID:{' '}
            <code
              className="px-2 py-0.5 rounded-md font-mono text-xs font-semibold"
              style={{
                backgroundColor: 'var(--m3-surface-container-highest)',
                color: 'var(--m3-primary)',
              }}
            >
              com.michaelbtech.framesforpixel
            </code>
            ) as a Freemium application with optional <strong style={{ color: 'var(--m3-on-surface)' }}>Frames Pro</strong>{' '}
            in-app upgrades. This SERVICE is provided by{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> and is intended for use as is.
          </p>
          <p>
            This Privacy Policy informs visitors and users regarding our policies with the collection, use, and
            disclosure of information if anyone decides to use our Service (`com.michaelbtech.framesforpixel` and
            `frames.michaelbtech.com`). By choosing to use our Service, you agree to the collection and use of
            anonymized diagnostic information in relation to this policy. We will not use or share your information with
            anyone except as described in this Privacy Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in our{' '}
            <button
              type="button"
              onClick={() => setCurrentPage?.('terms')}
              className="underline font-semibold cursor-pointer"
              style={{ color: 'var(--m3-primary)' }}
            >
              Terms of Service
            </button>
            , which are accessible at{' '}
            <code className="font-mono text-xs">{OFFICIAL_TERMS_URL}</code> unless otherwise defined in this Privacy
            Policy.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-2',
      number: '02',
      shortTitle: 'Information Collection',
      title: '2. Information Collection & Use',
      badge: 'Zero Direct PII',
      icon: EyeOff,
      summary:
        'We do not require registration or collect your name, email, or phone number. App preferences are stored locally on your device.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Zero Direct Personal Information Collection:</strong>{' '}
            We do not require you to create an account, log in, or submit any directly identifiable personal information
            (such as your name, email address, physical address, or phone number) to use{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong>.
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Local Device Preferences:</strong> Your workspace settings
            (such as your preferred default Pixel device model, Material You theme toggle, default shadow intensity, and
            custom studio watermark text) are stored strictly locally on your Android device using Android Jetpack
            DataStore / SharedPreferences and remain entirely under your control.
          </p>
          <p>
            The App does use vetted third-party services provided by Google (Google Play Services, Google Play Billing,
            Google Analytics for Firebase, and Firebase Crashlytics) that may collect limited, anonymized device
            identifiers and diagnostic telemetry used to verify purchase entitlements, analyze aggregate feature usage,
            and diagnose crashes.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-3',
      number: '03',
      shortTitle: 'On-Device AI & Media',
      title: '3. On-Device AI Privacy Redaction & Media Permissions',
      badge: '100% Local Processing',
      icon: Cpu,
      summary:
        'Screenshots, 60fps videos, and Google ML Kit AI face/text detection run 100% locally in your phone’s memory—never uploaded.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>Local Media Access &amp; Android Photo Picker:</strong>{' '}
            To frame your screenshots and screen recordings, the App accesses only the specific images or videos you
            select via the system Android Photo Picker, Android Share Sheet intent, or explicit local media storage
            permissions (`READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` on Android 13+ or `WRITE_EXTERNAL_STORAGE` on legacy
            Android versions for saving exports).
          </p>
          <p>
            <strong style={{ color: 'var(--m3-on-surface)' }}>On-Device Google ML Kit AI Redaction:</strong>{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames Pro</strong> includes an On-Device AI Privacy
            Redaction engine powered by <strong style={{ color: 'var(--m3-on-surface)' }}>Google ML Kit</strong> (Text
            Recognition &amp; Face Detection APIs) alongside a manual freehand redaction lasso. When you activate AI
            Privacy Redaction:
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--m3-primary)' }} />
              <span>
                All neural network inference (detecting text blocks, email addresses, phone numbers, and faces) executes{' '}
                <strong style={{ color: 'var(--m3-on-surface)' }}>100% locally on your Android device</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--m3-primary)' }} />
              <span>
                We <strong style={{ color: 'var(--m3-on-surface)' }}>never</strong> collect, store, transmit, or share
                facial geometry, biometric templates, OCR-extracted text, or your underlying images/videos with{' '}
                <strong style={{ color: 'var(--m3-on-surface)' }}>MichaelBTech, LLC</strong> or any external server.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--m3-primary)' }} />
              <span>
                Temporary detection bounding boxes exist solely in volatile device RAM while you edit your mockup and
                are immediately purged when you close the editor or export your flattened image.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'privacy-section-4',
      number: '04',
      shortTitle: 'Third-Party Services',
      title: '4. Third-Party Services & Official SDK Privacy Links',
      badge: 'Verified Google SDKs',
      icon: Layers,
      summary:
        'Lists the exact Google services integrated into the App with direct links to their official privacy policies and terms.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            The App integrates official Google first-party SDKs to deliver core Android platform functionality, In-App
            Billing, crash reporting, and on-device machine learning. Below are the links to the privacy policies and
            terms of the third-party service providers used by the App:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              {
                name: 'Google Play Services',
                purpose: 'Core Android runtime & ML Kit model delivery',
                url: 'https://policies.google.com/privacy',
              },
              {
                name: 'Google Play Billing',
                purpose: 'Frames Pro one-time purchases & subscriptions',
                url: 'https://play.google.com/about/play-terms/',
              },
              {
                name: 'Google Analytics for Firebase',
                purpose: 'Anonymized, aggregated feature usage telemetry',
                url: 'https://firebase.google.com/support/privacy',
              },
              {
                name: 'Firebase Crashlytics',
                purpose: 'Anonymized crash stack traces & stability logs',
                url: 'https://firebase.google.com/support/privacy/',
              },
              {
                name: 'Google ML Kit (On-Device APIs)',
                purpose: '100% local text & face bounding-box detection',
                url: 'https://developers.google.com/ml-kit/terms',
              },
              {
                name: 'Google Terms of Service',
                purpose: 'Standard Google platform legal policies',
                url: 'https://policies.google.com/terms',
              },
            ].map((sdk) => (
              <a
                key={sdk.name}
                href={sdk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border flex items-start justify-between gap-3 transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'var(--m3-surface-container-low)',
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                <div>
                  <div className="font-bold text-sm" style={{ color: 'var(--m3-on-surface)' }}>
                    {sdk.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--m3-on-surface-variant)' }}>
                    {sdk.purpose}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
              </a>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'privacy-section-5',
      number: '05',
      shortTitle: 'Log Data & Crash Traces',
      title: '5. Log Data & Crash Diagnostics',
      badge: 'Firebase Crashlytics',
      icon: Bug,
      summary:
        'Details what technical device metrics are included in a crash log if the App encounters an unexpected error.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            We want to inform you that whenever you use our Service, in a case of an error in the App we collect data
            and information (through third-party products such as <strong style={{ color: 'var(--m3-on-surface)' }}>Firebase Crashlytics</strong>) on your phone called{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Log Data</strong>.
          </p>
          <p>
            This Log Data may include technical diagnostic information such as your device Internet Protocol
            (&ldquo;IP&rdquo;) address (used transiently for network routing), device model name (e.g., Pixel 10 Pro XL),
            operating system version (e.g., Android 16), the configuration of the App when utilizing our Service, the
            time and date of your use of the Service, available memory, and de-obfuscated stack traces. Log Data never
            includes your screenshots, videos, or personal files.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-6',
      number: '06',
      shortTitle: 'Cookies & Identifiers',
      title: '6. Cookies & Local Identifiers',
      badge: 'No Tracking Cookies',
      icon: Cookie,
      summary:
        'The App does not use browser tracking cookies. Website theme preferences are saved in localStorage.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These
            are sent to your browser from the websites that you visit and are stored on your device&apos;s internal
            memory.
          </p>
          <p>
            This Service does not use these &ldquo;cookies&rdquo; explicitly for cross-site advertising. On our website
            (`frames.michaelbtech.com`), we use browser `localStorage` solely to remember your chosen Material 3
            Expressive color palette and Light/Dark mode preference. In the Android App, third-party code and libraries
            (such as Firebase Analytics and Crashlytics) use standard installation instance identifiers to measure
            aggregate stability and session metrics.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-7',
      number: '07',
      shortTitle: 'Security & Retention',
      title: '7. Data Security, Retention & User Deletion Controls',
      badge: 'Google Play Data Safety',
      icon: Lock,
      summary:
        'Explains how your media stays under your control and how diagnostic telemetry is encrypted in transit.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            We value your trust in using <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong>.
            Because your screenshots, videos, and AI redaction masks are processed 100% locally on your device, they are
            protected by your Android operating system&apos;s hardware-backed file encryption and sandbox permissions.
            Deleting an exported mockup from your device&apos;s gallery or clearing the App&apos;s storage in Android
            Settings immediately and permanently removes all local data.
          </p>
          <p>
            All anonymized telemetry and Google Play Billing verification requests transmitted by the integrated Google
            SDKs are encrypted in transit using industry-standard TLS/HTTPS. While we strive to use commercially
            acceptable means of protecting diagnostic data, remember that no method of transmission over the internet or
            method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-8',
      number: '08',
      shortTitle: 'External Links',
      title: '8. Links to Other Sites',
      badge: 'External URLs',
      icon: Globe,
      summary:
        'Clarifies that external links (such as Google Play or social links) are governed by their own privacy policies.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            This Service may contain links to other sites (such as the Google Play Store or official Google privacy
            documentation). If you click on a third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of
            these websites. We have no control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-9',
      number: '09',
      shortTitle: "Children's Privacy",
      title: "9. Children's Privacy (COPPA Compliance)",
      badge: 'Under-13 Protection',
      icon: Users,
      summary:
        'We do not knowingly collect personally identifiable information from children under 13 years of age.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            These Services do not address anyone under the age of 13. We do not knowingly collect personally
            identifiable information from children under 13 years of age. Because{' '}
            <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong> does not collect personal
            accounts, names, emails, or user media uploads from any user, no personal data from children is stored on
            our servers. If you are a parent or guardian and you have any questions or believe your child has somehow
            provided personal information to us via support email, please contact us at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="underline font-semibold"
              style={{ color: 'var(--m3-primary)' }}
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            so that we can immediately delete such correspondence.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-section-10',
      number: '10',
      shortTitle: 'Changes & Contact Us',
      title: '10. Changes to This Privacy Policy & Contact Us',
      badge: 'Direct Support',
      icon: Mail,
      summary:
        'Effective November 4, 2026. Contact MichaelBTech, LLC directly at michael@michaelbtech.com with any questions.',
      content: (
        <div className="space-y-4 leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
          <p>
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically
            for any changes. We will notify you of any changes by posting the new Privacy Policy on this page (`https://frames.michaelbtech.com/privacy`) and updating the &ldquo;Last Updated / Effective Date&rdquo; below.
          </p>
          <p>
            This policy is effective as of <strong style={{ color: 'var(--m3-on-surface)' }}>November 4, 2026</strong>.
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
                Privacy &amp; Data Protection Contact
              </div>
              <div className="font-bold text-base" style={{ color: 'var(--m3-on-surface)' }}>
                MichaelBTech, LLC — Frames for Pixel™
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
              href={`mailto:${SUPPORT_EMAIL}?subject=Frames%20for%20Pixel%20Privacy%20Policy%20Inquiry`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-transform active:scale-95 shrink-0"
              style={{
                backgroundColor: 'var(--m3-primary)',
                color: 'var(--m3-on-primary)',
              }}
            >
              <Mail className="w-4 h-4" />
              Contact {SUPPORT_EMAIL}
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
              onClick={() => setCurrentPage?.('terms')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--m3-secondary-container)',
                color: 'var(--m3-on-secondary-container)',
              }}
            >
              <FileText className="w-4 h-4" />
              View Terms of Service
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expressive Privacy Hero Header */}
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
              <Lock className="w-4 h-4" />
              Privacy by Architecture • 100% On-Device Media
            </div>

            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: 'var(--m3-on-surface)' }}
            >
              Privacy Policy for{' '}
              <span style={{ color: 'var(--m3-primary)' }}>Frames for Pixel™</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'var(--m3-on-surface-variant)' }}>
              Your screenshots, screen recordings, and ML Kit AI Privacy Redaction masks never leave your phone. Here is
              our complete, transparent disclosure of how <strong style={{ color: 'var(--m3-on-surface)' }}>Frames for Pixel™</strong>{' '}
              protects your privacy.
            </p>
          </div>

          {/* Metadata Pills */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 border-t"
            style={{ borderColor: 'var(--m3-outline-variant)' }}
          >
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'var(--m3-surface-container-low)' }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
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
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
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
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
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
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
                Privacy Officer Contact
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

        {/* Executive Summary & Data Breakdown Cards */}
        <section aria-labelledby="privacy-summary-heading" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--m3-primary)' }}
              >
                Executive Summary
              </span>
              <h2
                id="privacy-summary-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1"
                style={{ color: 'var(--m3-on-surface)' }}
              >
                 Google Play Data Safety Summary
              </h2>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
              Aligned with our official Google Play Store Data Safety declaration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {executiveCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.08 + idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[28px] p-6 border flex flex-col justify-between"
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

          {/* Data Breakdown Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="rounded-[28px] p-6 border"
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--m3-primary-container)',
                    color: 'var(--m3-on-primary-container)',
                  }}
                >
                  <ServerOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base" style={{ color: 'var(--m3-on-surface)' }}>
                    Data Never Collected or Uploaded
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--m3-on-surface-variant)' }}>
                    Processed 100% locally in your Android device&apos;s sandboxed memory
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Your photos, screenshots, 60fps videos, and exported mockups</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>ML Kit AI Privacy Redaction OCR text, emails, phone numbers &amp; face coordinates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Your name, email address, phone number, contacts, or precise GPS location</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Credit card numbers or bank details (handled strictly by Google Play Billing)</span>
                </li>
              </ul>
            </div>

            <div
              className="rounded-[28px] p-6 border"
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--m3-secondary-container)',
                    color: 'var(--m3-on-secondary-container)',
                  }}
                >
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base" style={{ color: 'var(--m3-on-surface)' }}>
                    Anonymized Telemetry &amp; Entitlement Tokens
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--m3-on-surface-variant)' }}>
                    Processed via official Google SDKs encrypted over TLS/HTTPS
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Google Play Billing cryptographic purchase tokens (to unlock &amp; restore Frames Pro)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Anonymized crash stack traces &amp; device model names via Firebase Crashlytics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Aggregated feature interaction metrics via Google Analytics for Firebase</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                  <span>Android OS API level &amp; app version code for hardware compatibility tuning</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive 5-Node Information Flow Diagram */}
        <section
          aria-labelledby="info-flow-heading"
          className="rounded-[36px] p-6 sm:p-9 mb-12 border"
          style={{
            backgroundColor: 'var(--m3-surface-container)',
            borderColor: 'var(--m3-outline-variant)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  backgroundColor: 'var(--m3-primary-container)',
                  color: 'var(--m3-on-primary-container)',
                }}
              >
                Interactive Architecture Map
              </span>
              <h2
                id="info-flow-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: 'var(--m3-on-surface)' }}
              >
                5-Node Information Flow Diagram
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--m3-on-surface-variant)' }}>
                Select any node below to inspect how data is isolated on your Pixel device or handled by Google SDKs.
              </p>
            </div>
          </div>

          {/* 5 Interactive Node Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
            {flowNodes.map((node) => {
              const NodeIcon = node.icon;
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className="text-left p-4 rounded-[24px] border transition-all flex flex-col justify-between cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? 'var(--m3-surface-container-high)'
                      : 'var(--m3-surface-container-low)',
                    borderColor: isSelected ? 'var(--m3-primary)' : 'var(--m3-outline-variant)',
                    boxShadow: isSelected ? `0 12px 30px -14px var(--m3-glow-primary)` : 'none',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: node.containerVar,
                          color: node.onContainerVar,
                        }}
                      >
                        <NodeIcon className="w-5 h-5" />
                      </div>
                      <span
                        className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: isSelected
                            ? 'var(--m3-primary)'
                            : 'var(--m3-surface-container-highest)',
                          color: isSelected ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)',
                        }}
                      >
                        {node.step}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base mb-1" style={{ color: 'var(--m3-on-surface)' }}>
                      {node.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
                      {node.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t flex items-center justify-between" style={{ borderColor: 'var(--m3-outline-variant)' }}>
                    <span className="text-[11px] font-bold" style={{ color: 'var(--m3-primary)' }}>
                      {node.scopeBadge}
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--m3-on-surface-variant)' }}>
                      {isSelected ? 'Active' : 'Inspect'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Deep-Dive Panel */}
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={M3_SPRING_EXPRESSIVE}
            className="rounded-[28px] p-6 sm:p-7 border"
            style={{
              backgroundColor: 'var(--m3-surface-container-low)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: activeNode.containerVar,
                      color: activeNode.onContainerVar,
                    }}
                  >
                    {activeNode.step} • {activeNode.scopeBadge}
                  </span>
                  <h3 className="text-xl font-extrabold" style={{ color: 'var(--m3-on-surface)' }}>
                    {activeNode.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  {activeNode.description}
                </p>

                <div
                  className="p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5"
                  style={{
                    backgroundColor: 'var(--m3-primary-container)',
                    color: 'var(--m3-on-primary-container)',
                  }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Privacy Guarantee: {activeNode.guarantee}</span>
                </div>
              </div>

              <div
                className="lg:col-span-5 p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--m3-surface-container)',
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--m3-primary)' }}>
                  Data Scope at {activeNode.title}
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  {activeNode.dataPoints.map((dp) => (
                    <li key={dp} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m3-primary)' }} />
                      <span>{dp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Detailed Policy Directory (Sections 1–10) */}
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
                  Policy Directory
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

              <nav aria-label="Privacy Policy Sections" className="space-y-1.5">
                {sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer"
                      style={{
                        backgroundColor: isActive ? 'var(--m3-primary-container)' : 'transparent',
                        color: isActive ? 'var(--m3-on-primary-container)' : 'var(--m3-on-surface-variant)',
                      }}
                    >
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-lg font-bold shrink-0"
                        style={{
                          backgroundColor: isActive ? 'var(--m3-primary)' : 'var(--m3-surface-container-high)',
                          color: isActive ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)',
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
                  onClick={() => setCurrentPage?.('terms')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-opacity hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--m3-secondary-container)',
                    color: 'var(--m3-on-secondary-container)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Read Official Terms of Service
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

          {/* 10 Policy Sections Content Column */}
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
                      activeSectionId === section.id ? 'var(--m3-primary)' : 'var(--m3-outline-variant)',
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

                  {/* Plain-language Summary */}
                  <div
                    className="p-3.5 rounded-2xl mb-5 text-xs sm:text-sm font-medium border-l-4"
                    style={{
                      backgroundColor: 'var(--m3-surface-container-low)',
                      color: 'var(--m3-on-surface)',
                      borderLeftColor: 'var(--m3-primary)',
                    }}
                  >
                    <strong>At a Glance:</strong> {section.summary}
                  </div>

                  {/* Full Section Content */}
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
                  Review our Commercial-Friendly Terms of Service
                </h3>
                <p className="text-sm" style={{ color: 'var(--m3-on-surface-variant)' }}>
                  Includes 100% commercial media ownership rights, Google Play Billing terms, and AI Redaction notices.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrentPage?.('terms')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-transform active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--m3-primary)',
                    color: 'var(--m3-on-primary)',
                  }}
                >
                  <FileText className="w-4 h-4" />
                  Open Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
