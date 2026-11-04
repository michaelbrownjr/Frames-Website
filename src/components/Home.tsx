import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Smartphone,
  Tablet,
  Laptop,
  Layers,
  Palette,
  Maximize2,
  Magnet,
  Video,
  Cpu,
  Wand2,
  CheckCircle2,
  ArrowRight,
  Lock,
  Zap,
  FileText,
  Shield,
} from 'lucide-react';
import {
  M3_SPRING_EXPRESSIVE,
  M3_SPRING_BOUNCY,
  useM3Theme,
} from '../theme/m3Theme';
import { AppPage, PLAY_STORE_URL } from '../utils/router';

export interface HomeProps {
  setCurrentPage?: (page: AppPage, sectionId?: string) => void;
}

type HardwareCategory = 'all' | 'phones' | 'foldables' | 'large-screens';

interface HardwareDeviceItem {
  id: string;
  name: string;
  category: Exclude<HardwareCategory, 'all'>;
  categoryLabel: string;
  displaySpec: string;
  finish: string;
  highlight: string;
  badge?: string;
}

const HARDWARE_LINEUP: HardwareDeviceItem[] = [
  {
    id: 'pixel-11-pro',
    name: 'Pixel 11 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.8" Super Actua LTPO OLED',
    finish: 'Satin Titanium & Obsidian Rail',
    highlight: 'Ultra-thin symmetrical bezel with precision punch-hole',
    badge: 'NEW',
  },
  {
    id: 'pixel-10-pro',
    name: 'Pixel 10 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.8" Super Actua Display',
    finish: 'Polished Aluminum Frame',
    highlight: 'Flat-edge flagship silhouette with Tensor G5 era styling',
    badge: 'POPULAR',
  },
  {
    id: 'pixel-9-pro',
    name: 'Pixel 9 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.3" / 6.8" Super Actua',
    finish: 'Porcelain, Hazel & Rose Quartz',
    highlight: 'Sculpted radius corners and authentic side button geometry',
  },
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.7" Super Actua Display',
    finish: 'Bay Blue, Mint & Obsidian',
    highlight: 'Flat glass canvas with signature matte aluminum contour',
  },
  {
    id: 'pixel-7-pro',
    name: 'Pixel 7 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.7" QHD+ Smooth Display',
    finish: 'Hazel & Snow Polished Alloy',
    highlight: 'Iconic curved-edge highlight and tall flagship aspect ratio',
  },
  {
    id: 'pixel-6-pro',
    name: 'Pixel 6 Pro',
    category: 'phones',
    categoryLabel: 'Flagship Phone',
    displaySpec: '6.7" LTPO AMOLED',
    finish: 'Sorta Sunny & Stormy Black',
    highlight: 'The original Material You two-tone flagship frame',
  },
  {
    id: 'pixel-pro-fold',
    name: 'Pixel Pro Fold (Inner & Outer)',
    category: 'foldables',
    categoryLabel: 'Foldable Dual-Mode',
    displaySpec: '8.0" Super Actua Flex + 6.3" Actua Cover',
    finish: 'Aerospace Aluminum Hinge',
    highlight: 'Supports both expansive unfolded tablet mode and outer cover screen',
    badge: 'DUAL DISPLAY',
  },
  {
    id: 'pixel-fold',
    name: 'Pixel Fold (Inner & Outer)',
    category: 'foldables',
    categoryLabel: 'Foldable Dual-Mode',
    displaySpec: '7.6" Inner OLED + 5.8" Passport Cover',
    finish: 'Polished Stainless Steel Hinge',
    highlight: 'Authentic wide passport cover bezel and landscape inner canvas',
    badge: 'DUAL DISPLAY',
  },
  {
    id: 'pixel-tablet',
    name: 'Pixel Tablet',
    category: 'large-screens',
    categoryLabel: 'Large Screen',
    displaySpec: '11" High-Res 16:10 Display',
    finish: 'Porcelain & Hazel Nano-Ceramic Bezel',
    highlight: 'Engineered for tablet UI showcases in both landscape and portrait',
    badge: '11" CANVAS',
  },
  {
    id: 'googlebook-14',
    name: '14" Googlebook Studio',
    category: 'large-screens',
    categoryLabel: 'Large Screen',
    displaySpec: '14" 3:2 HiDPI Studio Display',
    finish: 'Anodized Magnesium-Aluminum Deck',
    highlight: 'Complete laptop frame with precision keyboard deck for web & desktop apps',
    badge: 'STUDIO LAPTOP',
  },
];

interface BentoFeature {
  id: string;
  number: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  spanClass: string;
  tone: 'primary' | 'secondary' | 'tertiary' | 'surface';
  icon: React.FC<{ className?: string }>;
}

const BENTO_FEATURES: BentoFeature[] = [
  {
    id: 'bezels',
    number: '01',
    title: '11+ Authentic Hardware Bezels',
    badge: 'COMPLETE PIXEL ECOSYSTEM',
    description:
      'Wrap your captures in pixel-accurate hardware frames spanning Pixel 6 Pro, 7 Pro, 8 Pro, 9 Pro, 10 Pro, 11 Pro, Pixel Fold, Pixel Pro Fold (inner & outer displays), Pixel Tablet, and the 14" Googlebook.',
    highlights: ['Phones, Foldables, Tablet & Laptop', 'True-to-life metallic rails & camera cutouts'],
    spanClass: 'md:col-span-7',
    tone: 'primary',
    icon: Smartphone,
  },
  {
    id: 'ai-redaction',
    number: '02',
    title: 'On-Device AI Privacy Redaction',
    badge: 'FRAMES PRO • GOOGLE ML KIT',
    description:
      'Powered by local Google ML Kit vision models to automatically detect and blur sensitive text, emails, OTP codes, and faces—plus a custom freehand redaction lasso. 100% offline with zero data leaving your Pixel.',
    highlights: ['Auto-detects PII, emails & faces', 'Custom freehand blur lasso'],
    spanClass: 'md:col-span-5',
    tone: 'tertiary',
    icon: ShieldCheck,
  },
  {
    id: 'auto-detect',
    number: '03',
    title: 'Smart Hardware Auto-Detect',
    badge: 'ZERO-CONFIG WORKFLOW',
    description:
      'Frames for Pixel™ automatically identifies your active Google Pixel model on launch and pre-selects the matching authentic bezel for instant 1-tap framing.',
    highlights: ['Instant device recognition', 'One-tap share sheet framing'],
    spanClass: 'md:col-span-4',
    tone: 'surface',
    icon: Cpu,
  },
  {
    id: 'material-you',
    number: '04',
    title: 'Dynamic Material You Backdrops',
    badge: 'COLOR EXTRACTION ENGINE',
    description:
      'Extracts vibrant seed colors and harmonious tonal swatches directly from your screenshot or screen recording to craft multi-stop aurora meshes and studio spotlights.',
    highlights: ['Live media palette extraction', 'Harmonious M3 tonal gradients'],
    spanClass: 'md:col-span-4',
    tone: 'secondary',
    icon: Palette,
  },
  {
    id: 'aspect-ratios',
    number: '05',
    title: 'Social-Ready Aspect Ratios',
    badge: 'MULTI-PLATFORM EXPORT',
    description:
      'Switch effortlessly between 9:16 Story/Reel, 4:5 Feed Portrait, 1:1 Universal Square, and 16:9 YouTube/Landscape canvases without cropping your device frame.',
    highlights: ['9:16 • 4:5 • 1:1 • 16:9', 'Crisp high-DPI rendering'],
    spanClass: 'md:col-span-4',
    tone: 'surface',
    icon: Maximize2,
  },
  {
    id: '3d-perspective',
    number: '06',
    title: '3D Perspective & Magnetic Snapping',
    badge: 'PRECISION COMPOSING',
    description:
      'Dial in expressive 3D tilt, rotation, scale, and custom studio padding with tactile haptic feedback and magnetic center-axis & cardinal angle snapping.',
    highlights: ['3D X/Y/Z axis perspective', 'Magnetic 0° center-axis snap'],
    spanClass: 'md:col-span-4',
    tone: 'surface',
    icon: Magnet,
  },
  {
    id: 'batch-video',
    number: '07',
    title: 'Batch Framing & Video Support',
    badge: 'PHOTO & 60FPS VIDEO',
    description:
      'Frame single captures, full screen recordings with smooth motion playback, or select an entire batch of screenshots at once and export in high resolution with a single tap.',
    highlights: ['MP4 screen recording framing', 'Multi-image batch export queue'],
    spanClass: 'md:col-span-4',
    tone: 'secondary',
    icon: Video,
  },
  {
    id: 'm3-expressive',
    number: '08',
    title: 'Material 3 Expressive Interface',
    badge: 'ANDROID 16 DESIGN LANGUAGE',
    description:
      'Crafted from the ground up with Material 3 Expressive spring physics, shape-morphing toolbars, ambient studio lighting, and full Material You dynamic color.',
    highlights: ['Fluid spring motion physics', 'Adaptive Light & Dark studio themes'],
    spanClass: 'md:col-span-4',
    tone: 'primary',
    icon: Wand2,
  },
];

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { palette } = useM3Theme();
  const [activeCategory, setActiveCategory] = useState<HardwareCategory>('all');

  const filteredHardware =
    activeCategory === 'all'
      ? HARDWARE_LINEUP
      : HARDWARE_LINEUP.filter((item) => item.category === activeCategory);

  const scrollToSection = (sectionId: string) => {
    if (setCurrentPage) {
      setCurrentPage('home', sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="w-full overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--m3-surface)',
        color: 'var(--m3-on-surface)',
      }}
    >
      {/* =====================================================================
          SECTION 1: EXPRESSIVE HERO SECTION
         ===================================================================== */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Ambient M3 Expressive Stage Lighting Blobs */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[44rem] h-[28rem] rounded-full blur-3xl opacity-60"
          style={{ background: 'var(--m3-glow-primary)' }}
        />
        <div
          className="pointer-events-none absolute top-40 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-45"
          style={{ background: 'var(--m3-glow-tertiary)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Hero Left Column: Typography & Expressive CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={M3_SPRING_EXPRESSIVE}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6 border shadow-sm"
                style={{
                  backgroundColor: 'var(--m3-primary-container)',
                  color: 'var(--m3-on-primary-container)',
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                <img
                  src="/assets/pixel-10-icon.jpeg"
                  alt="Frames for Pixel Icon"
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span>Material 3 Expressive • 11+ Pixel Bezels • Frames Pro AI</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.05 }}
                className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.06]"
              >
                Studio-Grade{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(95deg, var(--m3-primary) 0%, var(--m3-tertiary) 100%)',
                  }}
                >
                  Google Pixel
                </span>{' '}
                Mockups in Seconds.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.1 }}
                className="mt-6 text-base sm:text-xl leading-relaxed max-w-xl"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
                Wrap your screenshots, 60fps screen recordings, and home screen setups
                in authentic Google Pixel hardware frames—from Pixel 6 Pro through
                Pixel 11 Pro, Pixel Pro Fold, Pixel Tablet, and 14&quot; Googlebook—with
                100% on-device ML Kit privacy redaction.
              </motion.p>

              {/* Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...M3_SPRING_EXPRESSIVE, delay: 0.15 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  aria-label="Get Frames for Pixel on Google Play"
                >
                  <img
                    src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
                    alt="Get it on Google Play"
                    className="h-14 sm:h-16 w-auto object-contain drop-shadow-md"
                  />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('features')}
                  className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-[24px] hover:rounded-[16px] text-sm sm:text-base font-extrabold border transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                  style={{
                    backgroundColor: 'var(--m3-surface-container-high)',
                    color: 'var(--m3-on-surface)',
                    borderColor: 'var(--m3-outline)',
                  }}
                >
                  <Sparkles
                    className="w-4 h-4 transition-transform group-hover:rotate-12"
                    style={{ color: 'var(--m3-primary)' }}
                  />
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Trust / Privacy Micro-pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-4 h-4" style={{ color: 'var(--m3-primary)' }} />
                  100% Local Processing
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4" style={{ color: 'var(--m3-primary)' }} />
                  Zero Cloud Uploads
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Palette className="w-4 h-4" style={{ color: 'var(--m3-primary)' }} />
                  Active Theme: {palette.name}
                </span>
              </motion.div>
            </div>

            {/* Hero Right Column: Visual Stage with Real Framed Screenshots */}
            <div className="lg:col-span-6 relative">
              <div
                className="relative rounded-[40px] p-6 sm:p-8 border overflow-hidden shadow-2xl"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, var(--m3-glow-primary) 0%, transparent 60%),
                    radial-gradient(circle at 85% 80%, var(--m3-glow-tertiary) 0%, transparent 60%),
                    linear-gradient(145deg, var(--m3-surface-container-high) 0%, var(--m3-surface-container) 100%)
                  `,
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                {/* Showcase Composition of Fold & Flagship Phone */}
                <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
                  {/* Real Pixel Pro Fold Screenshot Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -28, rotate: -4 }}
                    animate={{ opacity: 1, x: 0, rotate: -3 }}
                    whileHover={{ rotate: 0, scale: 1.03, zIndex: 30 }}
                    transition={M3_SPRING_EXPRESSIVE}
                    className="relative z-10 w-[68%] sm:w-[66%] -ml-8 sm:-ml-12 rounded-[28px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)] border"
                    style={{
                      borderColor: 'var(--m3-outline)',
                      backgroundColor: 'var(--m3-surface-dim)',
                    }}
                  >
                    <img
                      src="/assets/fold-photo.png"
                      alt="Pixel Pro Fold framed showcase from Frames for Pixel"
                      className="w-full h-auto object-cover block"
                    />
                  </motion.div>

                  {/* Real Pixel Flagship Phone Screenshot Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 28, y: 20, rotate: 6 }}
                    animate={{ opacity: 1, x: 0, y: 12, rotate: 5 }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                    transition={{ ...M3_SPRING_BOUNCY, delay: 0.08 }}
                    className="relative z-20 w-[46%] sm:w-[44%] -ml-14 sm:-ml-16 rounded-[28px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.65)] border"
                    style={{
                      borderColor: 'var(--m3-primary)',
                      backgroundColor: 'var(--m3-surface-dim)',
                    }}
                  >
                    <img
                      src="/assets/phone-photo.png"
                      alt="Pixel Flagship Phone framed showcase from Frames for Pixel"
                      className="w-full h-auto object-cover block"
                    />
                  </motion.div>
                </div>

                {/* Floating M3 Stat Chips */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      icon: Smartphone,
                      label: '11+ Authentic Pixel Bezels',
                      sub: 'Phones, Foldables, Tablet & Laptop',
                    },
                    {
                      icon: ShieldCheck,
                      label: '100% On-Device ML Kit Privacy',
                      sub: 'Auto-blur PII & Freehand Lasso',
                    },
                    {
                      icon: Video,
                      label: 'Photo & Video Export',
                      sub: 'Batch framing & 60fps recordings',
                    },
                  ].map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <div
                        key={chip.label}
                        className="rounded-2xl p-3 border flex items-start gap-2.5 backdrop-blur-md"
                        style={{
                          backgroundColor: 'var(--m3-surface-container-low)',
                          borderColor: 'var(--m3-outline-variant)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: 'var(--m3-primary-container)',
                            color: 'var(--m3-on-primary-container)',
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold leading-snug">
                            {chip.label}
                          </div>
                          <div
                            className="text-[11px] truncate mt-0.5"
                            style={{ color: 'var(--m3-on-surface-variant)' }}
                          >
                            {chip.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: UPDATED MATERIAL 3 EXPRESSIVE BENTO GRID (id="features")
         ===================================================================== */}
      <section
        id="features"
        className="py-20 sm:py-28 border-t"
        style={{
          backgroundColor: 'var(--m3-surface-container-low)',
          borderColor: 'var(--m3-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-4 border"
              style={{
                backgroundColor: 'var(--m3-secondary-container)',
                color: 'var(--m3-on-secondary-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <Wand2 className="w-4 h-4" />
              <span>8 SIGNATURE STUDIO CAPABILITIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Engineered for{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--m3-primary), var(--m3-tertiary))',
                }}
              >
                Material 3 Expressive
              </span>{' '}
              Creators.
            </h2>
            <p
              className="mt-4 text-base sm:text-lg"
              style={{ color: 'var(--m3-on-surface-variant)' }}
            >
              Every detail of Frames for Pixel™ is built around Google&apos;s latest
              Material 3 Expressive motion system, authentic hardware proportions, and
              uncompromising on-device privacy.
            </p>
          </div>

          {/* Asymmetric 12-Column M3 Expressive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {BENTO_FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              const getCardStyles = (): React.CSSProperties => {
                if (feature.tone === 'primary') {
                  return {
                    backgroundColor: 'var(--m3-primary-container)',
                    color: 'var(--m3-on-primary-container)',
                    borderColor: 'var(--m3-primary)',
                  };
                }
                if (feature.tone === 'tertiary') {
                  return {
                    backgroundColor: 'var(--m3-tertiary-container)',
                    color: 'var(--m3-on-tertiary-container)',
                    borderColor: 'var(--m3-tertiary)',
                  };
                }
                if (feature.tone === 'secondary') {
                  return {
                    backgroundColor: 'var(--m3-secondary-container)',
                    color: 'var(--m3-on-secondary-container)',
                    borderColor: 'var(--m3-outline)',
                  };
                }
                return {
                  backgroundColor: 'var(--m3-surface-container)',
                  color: 'var(--m3-on-surface)',
                  borderColor: 'var(--m3-outline-variant)',
                };
              };

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...M3_SPRING_EXPRESSIVE, delay: index * 0.04 }}
                  style={getCardStyles()}
                  className={`${feature.spanClass} group relative rounded-[32px] hover:rounded-[22px] p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-black/10 dark:bg-white/10">
                        {feature.badge}
                      </span>
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-black/10 dark:bg-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="text-xs font-mono opacity-60 mb-1">
                      FEATURE {feature.number}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-current/15 flex flex-wrap gap-2">
                    {feature.highlights.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-black/10 dark:bg-white/10"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: COMPLETE HARDWARE LINEUP SHOWCASE (id="devices")
         ===================================================================== */}
      <section
        id="devices"
        className="py-20 sm:py-28 border-t"
        style={{
          backgroundColor: 'var(--m3-surface)',
          borderColor: 'var(--m3-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-4 border"
                style={{
                  backgroundColor: 'var(--m3-primary-container)',
                  color: 'var(--m3-on-primary-container)',
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                <Layers className="w-4 h-4" />
                <span>AUTHENTIC HARDWARE LINEUP</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
                Every Generation. Every Form Factor.
              </h2>
              <p
                className="mt-3 text-base sm:text-lg max-w-2xl"
                style={{ color: 'var(--m3-on-surface-variant)' }}
              >
                From the iconic Pixel 6 Pro through the latest Pixel 11 Pro, dual-mode
                Foldables, Pixel Tablet, and 14&quot; Googlebook studio frame.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div
              className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl border"
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              {[
                { id: 'all', label: 'All Hardware (11+ Bezels)', icon: Sparkles },
                { id: 'phones', label: 'Flagship Phones (6)', icon: Smartphone },
                { id: 'foldables', label: 'Foldables (Inner & Outer)', icon: Layers },
                { id: 'large-screens', label: 'Tablet & Googlebook', icon: Laptop },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as HardwareCategory)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--m3-primary)' : 'transparent',
                      color: active
                        ? 'var(--m3-on-primary)'
                        : 'var(--m3-on-surface-variant)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hardware Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHardware.map((device) => (
              <motion.div
                layout
                key={device.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={M3_SPRING_EXPRESSIVE}
                className="rounded-[28px] p-6 border flex flex-col justify-between transition-all hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--m3-surface-container)',
                  borderColor: 'var(--m3-outline-variant)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--m3-surface-container-highest)',
                        color: 'var(--m3-on-surface-variant)',
                      }}
                    >
                      {device.categoryLabel}
                    </span>
                    {device.badge && (
                      <span
                        className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--m3-primary-container)',
                          color: 'var(--m3-on-primary-container)',
                        }}
                      >
                        {device.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight mb-1">
                    {device.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-3"
                    style={{ color: 'var(--m3-primary)' }}
                  >
                    {device.displaySpec} • {device.finish}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--m3-on-surface-variant)' }}
                  >
                    {device.highlight}
                  </p>
                </div>

                <div
                  className="mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold"
                  style={{
                    borderColor: 'var(--m3-outline-variant)',
                    color: 'var(--m3-on-surface-variant)',
                  }}
                >
                  <span>Smart Auto-Detect Supported</span>
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: 'var(--m3-primary)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FRAMES PRO STUDIO SPOTLIGHT (id="pro")
         ===================================================================== */}
      <section
        id="pro"
        className="py-20 sm:py-28 border-t"
        style={{
          backgroundColor: 'var(--m3-surface-container-low)',
          borderColor: 'var(--m3-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-4 border"
              style={{
                backgroundColor: 'var(--m3-tertiary-container)',
                color: 'var(--m3-on-tertiary-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>FRAMES STUDIO &amp; FRAMES PRO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
              Built for Everyday Sharing &amp; Pro Workflows.
            </h2>
            <p
              className="mt-4 text-base sm:text-lg"
              style={{ color: 'var(--m3-on-surface-variant)' }}
            >
              Start framing immediately with our generous Core Studio, or unlock
              Frames Pro with a single optional upgrade via Google Play Billing.
            </p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
            {/* Tier 1: Frames Studio (Core) */}
            <div
              className="rounded-[36px] p-7 sm:p-10 border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span
                      className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--m3-surface-container-highest)',
                        color: 'var(--m3-on-surface-variant)',
                      }}
                    >
                      INCLUDED FREE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">
                      Frames Studio (Core)
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--m3-primary-container)',
                      color: 'var(--m3-on-primary-container)',
                    }}
                  >
                    <Smartphone className="w-6 h-6" />
                  </div>
                </div>

                <p
                  className="text-sm sm:text-base mb-8"
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                >
                  Everything you need to wrap screenshots and recordings in authentic
                  Pixel bezels with dynamic Material You colors.
                </p>

                <ul className="space-y-3.5 text-sm sm:text-base">
                  {[
                    '11+ Authentic Pixel Phone, Foldable, Tablet & Googlebook bezels',
                    'Smart Hardware Auto-Detect for your active Pixel device',
                    'Dynamic Material You color extraction & gradient backdrops',
                    'Social-ready aspect ratios (9:16, 4:5, 1:1, 16:9)',
                    'High-resolution screenshot & screen recording export',
                    '100% local processing with zero watermarks or ads',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: 'var(--m3-primary)' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--m3-outline-variant)' }}
              >
                <span
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                >
                  Available now on Google Play
                </span>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold"
                  style={{ color: 'var(--m3-primary)' }}
                >
                  <span>Download Free</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tier 2: Frames Pro Upgrade */}
            <div
              className="relative rounded-[36px] p-7 sm:p-10 border-2 flex flex-col justify-between shadow-xl overflow-hidden"
              style={{
                background: `
                  radial-gradient(circle at 90% 10%, var(--m3-glow-tertiary) 0%, transparent 55%),
                  linear-gradient(155deg, var(--m3-primary-container) 0%, var(--m3-surface-container-high) 100%)
                `,
                borderColor: 'var(--m3-primary)',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span
                      className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--m3-primary)',
                        color: 'var(--m3-on-primary)',
                      }}
                    >
                      OPTIONAL PRO UPGRADE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">
                      Frames Pro Studio
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: 'var(--m3-primary)',
                      color: 'var(--m3-on-primary)',
                    }}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                <p
                  className="text-sm sm:text-base mb-8"
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                >
                  Supercharge your workflow with on-device ML Kit privacy protection,
                  multi-item batch framing, and advanced 3D studio controls.
                </p>

                <ul className="space-y-3.5 text-sm sm:text-base font-medium">
                  {[
                    'Everything in Frames Studio (Core), plus:',
                    'On-Device AI Privacy Redaction (Google ML Kit auto-detects & blurs emails, PII, notifications & faces)',
                    'Custom Freehand Redaction Lasso for instant manual privacy masking',
                    'Batch Framing Queue — frame & export multiple screenshots at once',
                    'Pro 3D Perspective Studio Controls with magnetic axis snapping',
                    'Restorable anytime across your Pixel devices via Google Play Billing',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: 'var(--m3-primary)' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4"
                style={{ borderColor: 'var(--m3-outline)' }}
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <img
                    src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
                    alt="Get it on Google Play"
                    className="h-12 w-auto object-contain drop-shadow-md"
                  />
                </a>
                <span className="text-xs font-semibold opacity-80">
                  Managed securely by Google Play
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Expressive CTA & Legal Quick-Access Banner */}
          <div
            className="rounded-[36px] p-8 sm:p-12 border relative overflow-hidden"
            style={{
              backgroundColor: 'var(--m3-surface-container-high)',
              borderColor: 'var(--m3-outline-variant)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/pixel-10-icon.jpeg"
                    alt="Frames for Pixel Logo"
                    className="w-12 h-12 rounded-2xl object-cover shadow-md"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold">
                      Ready to Frame Your Pixel?
                    </h3>
                    <p
                      className="text-xs sm:text-sm"
                      style={{ color: 'var(--m3-on-surface-variant)' }}
                    >
                      Developed by MichaelBTech, LLC • Built exclusively for Android
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm sm:text-base max-w-2xl leading-relaxed"
                  style={{ color: 'var(--m3-on-surface-variant)' }}
                >
                  Download Frames for Pixel™ on Google Play today. Your media and AI
                  privacy redactions stay 100% on your device—review our transparent
                  Privacy Policy and Terms of Service anytime.
                </p>

                {/* Quick Legal Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage?.('privacy')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-transform active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--m3-surface-container)',
                      color: 'var(--m3-on-surface)',
                      borderColor: 'var(--m3-outline-variant)',
                    }}
                  >
                    <Shield
                      className="w-4 h-4"
                      style={{ color: 'var(--m3-primary)' }}
                    />
                    <span>Privacy Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage?.('terms')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-transform active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--m3-surface-container)',
                      color: 'var(--m3-on-surface)',
                      borderColor: 'var(--m3-outline-variant)',
                    }}
                  >
                    <FileText
                      className="w-4 h-4"
                      style={{ color: 'var(--m3-primary)' }}
                    />
                    <span>Terms of Service</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-transform hover:scale-105 active:scale-95"
                >
                  <img
                    src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
                    alt="Get it on Google Play"
                    className="h-16 w-auto object-contain drop-shadow-md"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
