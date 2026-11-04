import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  ShieldCheck,
  FileText,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
  Lock,
} from 'lucide-react';
import { M3_SPRING_BOUNCY } from '../theme/m3Theme';
import {
  AppPage,
  PLAY_STORE_URL,
  SUPPORT_EMAIL,
  getShareableUrlForPage,
} from '../utils/router';

interface FooterProps {
  currentPage?: AppPage;
  setCurrentPage: (page: AppPage, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage = 'home', setCurrentPage }) => {
  const [copiedType, setCopiedType] = useState<'terms' | 'privacy' | null>(null);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: AppPage,
    sectionId?: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    setCurrentPage(page, sectionId);
  };

  const handleCopyLegalUrl = async (page: 'terms' | 'privacy') => {
    const url = getShareableUrlForPage(page);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedType(page);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="relative px-4 sm:px-6 lg:px-8 pb-10 pt-16 max-w-7xl mx-auto">
      <div
        style={{
          backgroundColor: 'var(--m3-surface-container)',
          borderColor: 'var(--m3-outline-variant)',
          color: 'var(--m3-on-surface)',
          boxShadow: '0 32px 80px -24px rgba(0, 0, 0, 0.35)',
        }}
        className="relative overflow-hidden rounded-[3rem] border p-8 sm:p-12 lg:p-16"
      >
        {/* Ambient Expressive Tonal Glows */}
        <div
          style={{ background: 'var(--m3-glow-primary)' }}
          className="pointer-events-none absolute -top-28 -right-28 w-96 h-96 rounded-full blur-3xl opacity-50"
        />
        <div
          style={{ background: 'var(--m3-glow-tertiary)' }}
          className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full blur-3xl opacity-40"
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[var(--m3-outline-variant)]">
          {/* Column 1: Brand & Google Play Badge */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.06 }}
                transition={M3_SPRING_BOUNCY}
                style={{ borderColor: 'var(--m3-outline)' }}
                className="w-12 h-12 rounded-2xl overflow-hidden border shadow-md shrink-0"
              >
                <img
                  src="/assets/pixel-10-icon.jpeg"
                  alt="Frames for Pixel™ Icon"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-xl tracking-tight">
                    Frames <span style={{ color: 'var(--m3-primary)' }}>for Pixel™</span>
                  </span>
                </div>
                <p
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                  className="text-xs font-medium"
                >
                  Crafted by MichaelBTech, LLC
                </p>
              </div>
            </div>

            <p
              style={{ color: 'var(--m3-on-surface-variant)' }}
              className="text-sm leading-relaxed max-w-md"
            >
              Wrap your screenshots in ultra-crisp, authentic Google Pixel device frames. Featuring
              36+ official hardware silhouettes, Material 3 Expressive backdrops, and 100% private
              on-device rendering.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </a>

              <div
                style={{
                  backgroundColor: 'var(--m3-surface-container-high)',
                  borderColor: 'var(--m3-outline-variant)',
                  color: 'var(--m3-on-surface-variant)',
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold"
              >
                <Lock className="w-3.5 h-3.5" style={{ color: 'var(--m3-primary)' }} />
                <span>100% On-Device Processing</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3
              style={{ color: 'var(--m3-primary)' }}
              className="font-display font-bold text-xs uppercase tracking-widest"
            >
              Explore Studio
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  style={{
                    color:
                      currentPage === 'home'
                        ? 'var(--m3-on-surface)'
                        : 'var(--m3-on-surface-variant)',
                  }}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Home Overview
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  onClick={(e) => handleLinkClick(e, 'home', 'features')}
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Features & Capabilities
                </a>
              </li>
              <li>
                <a
                  href="/#pro"
                  onClick={(e) => handleLinkClick(e, 'home', 'pro')}
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Frames Pro Upgrade
                </a>
              </li>
              <li>
                <a
                  href="/#devices"
                  onClick={(e) => handleLinkClick(e, 'home', 'devices')}
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Supported Pixel Devices (36+)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Legal & Direct URLs */}
          <div className="lg:col-span-4 space-y-4">
            <h3
              style={{ color: 'var(--m3-primary)' }}
              className="font-display font-bold text-xs uppercase tracking-widest"
            >
              Legal & Direct Play Console Links
            </h3>

            <div className="space-y-2.5">
              {/* Privacy Policy Card Link */}
              <div
                style={{
                  backgroundColor:
                    currentPage === 'privacy'
                      ? 'var(--m3-primary-container)'
                      : 'var(--m3-surface-container-high)',
                  borderColor:
                    currentPage === 'privacy'
                      ? 'var(--m3-primary)'
                      : 'var(--m3-outline-variant)',
                }}
                className="flex items-center justify-between gap-2 p-3 rounded-2xl border transition-colors"
              >
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="flex items-center gap-2.5 min-w-0 flex-1 group"
                >
                  <ShieldCheck
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--m3-primary)' }}
                  />
                  <div className="truncate">
                    <div className="font-display font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:underline">
                      <span>Privacy Policy</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    </div>
                    <div
                      style={{ color: 'var(--m3-on-surface-variant)' }}
                      className="font-mono text-[11px] truncate"
                    >
                      /privacy
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyLegalUrl('privacy')}
                  title="Copy direct Privacy Policy URL"
                  style={{
                    backgroundColor: 'var(--m3-surface-container-highest)',
                    color: 'var(--m3-on-surface)',
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold cursor-pointer hover:opacity-90 shrink-0"
                >
                  {copiedType === 'privacy' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terms of Service Card Link */}
              <div
                style={{
                  backgroundColor:
                    currentPage === 'terms'
                      ? 'var(--m3-primary-container)'
                      : 'var(--m3-surface-container-high)',
                  borderColor:
                    currentPage === 'terms'
                      ? 'var(--m3-primary)'
                      : 'var(--m3-outline-variant)',
                }}
                className="flex items-center justify-between gap-2 p-3 rounded-2xl border transition-colors"
              >
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, 'terms')}
                  className="flex items-center gap-2.5 min-w-0 flex-1 group"
                >
                  <FileText
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--m3-primary)' }}
                  />
                  <div className="truncate">
                    <div className="font-display font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:underline">
                      <span>Terms of Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    </div>
                    <div
                      style={{ color: 'var(--m3-on-surface-variant)' }}
                      className="font-mono text-[11px] truncate"
                    >
                      /terms
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyLegalUrl('terms')}
                  title="Copy direct Terms of Service URL"
                  style={{
                    backgroundColor: 'var(--m3-surface-container-highest)',
                    color: 'var(--m3-on-surface)',
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold cursor-pointer hover:opacity-90 shrink-0"
                >
                  {copiedType === 'terms' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Support Email */}
            <div className="pt-1">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                style={{ color: 'var(--m3-on-surface-variant)' }}
                className="inline-flex items-center gap-2 text-xs font-semibold hover:underline"
              >
                <Mail className="w-3.5 h-3.5" style={{ color: 'var(--m3-primary)' }} />
                <span>Support: {SUPPORT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Trademark Attribution */}
        <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p
            style={{ color: 'var(--m3-on-surface-variant)' }}
            className="leading-relaxed max-w-3xl"
          >
            © 2026 MichaelBTech, LLC. All rights reserved. Google Pixel, Pixel Fold, Pixel Tablet,
            Android, ChromeOS, and Google Play are trademarks of Google LLC. Frames for Pixel™ is
            independently developed by MichaelBTech, LLC and is not affiliated with or endorsed by
            Google LLC.
          </p>

          <div className="flex items-center gap-4 shrink-0 font-semibold">
            <a
              href="/privacy"
              onClick={(e) => handleLinkClick(e, 'privacy')}
              style={{ color: 'var(--m3-primary)' }}
              className="hover:underline"
            >
              Privacy
            </a>
            <span style={{ color: 'var(--m3-outline)' }}>•</span>
            <a
              href="/terms"
              onClick={(e) => handleLinkClick(e, 'terms')}
              style={{ color: 'var(--m3-primary)' }}
              className="hover:underline"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
