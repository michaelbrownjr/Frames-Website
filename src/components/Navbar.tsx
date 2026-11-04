import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Check,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  FileText,
  Layers,
  Home,
} from 'lucide-react';
import {
  useM3Theme,
  M3_SEED_PALETTES,
  M3_SPRING_EXPRESSIVE,
  M3_SPRING_BOUNCY,
  SeedPaletteId,
} from '../theme/m3Theme';
import { AppPage, PLAY_STORE_URL } from '../utils/router';

interface NavbarProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage, sectionId?: string) => void;
}

type NavKey = 'home' | 'features' | 'privacy' | 'terms';

interface NavItem {
  key: NavKey;
  label: string;
  page: AppPage;
  sectionId?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', page: 'home', href: '/', icon: Home },
  { key: 'features', label: 'Features', page: 'home', sectionId: 'features', href: '/#features', icon: Layers },
  { key: 'privacy', label: 'Privacy', page: 'privacy', href: '/privacy', icon: ShieldCheck },
  { key: 'terms', label: 'Terms', page: 'terms', href: '/terms', icon: FileText },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { mode, toggleMode, seedId, setSeedId, palette } = useM3Theme();
  const [activeSection, setActiveSection] = useState<'home' | 'features'>('home');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      if (currentPage !== 'home') return;

      const featuresEl = document.getElementById('features');
      const y = window.scrollY + 220;

      if (featuresEl && y >= featuresEl.offsetTop) {
        setActiveSection('features');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    };
    if (isPaletteOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPaletteOpen]);

  const activeNavKey: NavKey =
    currentPage === 'privacy'
      ? 'privacy'
      : currentPage === 'terms'
        ? 'terms'
        : activeSection;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (item.sectionId) {
      setActiveSection('features');
    } else if (item.page === 'home') {
      setActiveSection('home');
    }
    setCurrentPage(item.page, item.sectionId);
    setIsMobileMenuOpen(false);
  };

  const seedList = Object.values(M3_SEED_PALETTES);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={M3_SPRING_EXPRESSIVE}
        aria-label="Primary Navigation"
        style={{
          backgroundColor: isScrolled
            ? 'color-mix(in srgb, var(--m3-surface-container-high) 88%, transparent)'
            : 'color-mix(in srgb, var(--m3-surface-container) 82%, transparent)',
          borderColor: 'var(--m3-outline-variant)',
          boxShadow: isScrolled
            ? '0 20px 50px -16px rgba(0, 0, 0, 0.45), 0 0 28px -10px var(--m3-glow-primary)'
            : '0 12px 32px -12px rgba(0, 0, 0, 0.25)',
        }}
        className="relative flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5 sm:py-3 rounded-full border backdrop-blur-2xl transition-colors duration-300"
      >
        {/* Brand Identity */}
        <a
          href="/"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            setActiveSection('home');
            setCurrentPage('home');
            setIsMobileMenuOpen(false);
          }}
          className="group flex items-center gap-3 pl-1 pr-2 py-0.5 rounded-full focus:outline-none"
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08, borderRadius: '1.1rem' }}
            whileTap={{ scale: 0.94 }}
            transition={M3_SPRING_BOUNCY}
            style={{
              borderColor: 'var(--m3-outline)',
              boxShadow: '0 6px 18px -4px var(--m3-glow-primary)',
            }}
            className="relative w-10 h-10 rounded-[14px] overflow-hidden border shrink-0 bg-slate-900"
          >
            <img
              src="/assets/pixel-10-icon.jpeg"
              alt="Frames for Pixel™ App Icon"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                style={{ color: 'var(--m3-on-surface)' }}
                className="font-display font-extrabold text-base sm:text-lg tracking-tight leading-none"
              >
                Frames <span style={{ color: 'var(--m3-primary)' }}>for Pixel™</span>
              </span>
              <span
                style={{
                  backgroundColor: 'var(--m3-primary-container)',
                  color: 'var(--m3-on-primary-container)',
                }}
                className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-2.5 h-2.5" />
                M3 Expressive
              </span>
            </div>
            <span
              style={{ color: 'var(--m3-on-surface-variant)' }}
              className="text-[11px] font-medium tracking-tight hidden sm:inline"
            >
              MichaelBTech Studio
            </span>
          </div>
        </a>

        {/* Center Navigation Pills */}
        <div
          style={{
            backgroundColor: 'color-mix(in srgb, var(--m3-surface-container-low) 90%, transparent)',
            borderColor: 'var(--m3-outline-variant)',
          }}
          className="hidden lg:flex items-center gap-1 p-1 rounded-full border"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNavKey === item.key;
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                style={{
                  color: isActive ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)',
                }}
                className="relative px-4 py-1.5 rounded-full text-sm font-semibold tracking-tight transition-colors duration-200 flex items-center gap-1.5 select-none hover:opacity-95"
              >
                {isActive && (
                  <motion.div
                    layoutId="m3-navbar-active-pill"
                    transition={M3_SPRING_EXPRESSIVE}
                    style={{
                      backgroundColor: 'var(--m3-primary)',
                      boxShadow: '0 6px 20px -4px var(--m3-glow-primary)',
                    }}
                    className="absolute inset-0 rounded-full -z-10"
                  />
                )}
                <Icon className="w-3.5 h-3.5 opacity-85" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Expressive Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2" ref={popoverRef}>
          {/* Material You Dynamic Palette Picker */}
          <div className="relative">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={M3_SPRING_BOUNCY}
              onClick={() => setIsPaletteOpen((prev) => !prev)}
              aria-label="Customize Material You Dynamic Palette"
              aria-expanded={isPaletteOpen}
              style={{
                backgroundColor: isPaletteOpen
                  ? 'var(--m3-primary-container)'
                  : 'var(--m3-surface-container-high)',
                color: isPaletteOpen
                  ? 'var(--m3-on-primary-container)'
                  : 'var(--m3-on-surface)',
                borderColor: 'var(--m3-outline-variant)',
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-bold tracking-tight cursor-pointer transition-colors"
            >
              <span
                style={{ backgroundColor: palette.swatchHex }}
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30 shrink-0"
              />
              <Palette className="w-4 h-4" />
              <span className="hidden md:inline">Material You</span>
            </motion.button>

            <AnimatePresence>
              {isPaletteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={M3_SPRING_EXPRESSIVE}
                  style={{
                    backgroundColor: 'var(--m3-surface-container-high)',
                    borderColor: 'var(--m3-outline)',
                    color: 'var(--m3-on-surface)',
                    boxShadow: '0 28px 60px -12px rgba(0, 0, 0, 0.55)',
                  }}
                  className="absolute right-0 mt-3 w-72 sm:w-80 p-4 rounded-[2rem] border backdrop-blur-2xl z-50"
                >
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[var(--m3-outline-variant)]">
                    <div>
                      <p className="font-display font-bold text-sm">Dynamic Color Seed</p>
                      <p
                        style={{ color: 'var(--m3-on-surface-variant)' }}
                        className="text-[11px]"
                      >
                        Material 3 Expressive Tonal Palettes
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleMode}
                      style={{
                        backgroundColor: 'var(--m3-surface-container-highest)',
                        color: 'var(--m3-on-surface)',
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-90"
                    >
                      {mode === 'dark' ? (
                        <>
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                          <span>Light</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Dark</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {seedList.map((seed) => {
                      const isSelected = seed.id === seedId;
                      const previewTokens = mode === 'dark' ? seed.dark : seed.light;
                      return (
                        <button
                          key={seed.id}
                          type="button"
                          onClick={() => {
                            setSeedId(seed.id as SeedPaletteId);
                          }}
                          style={{
                            backgroundColor: isSelected
                              ? 'var(--m3-primary-container)'
                              : 'var(--m3-surface-container)',
                            color: isSelected
                              ? 'var(--m3-on-primary-container)'
                              : 'var(--m3-on-surface)',
                            borderColor: isSelected
                              ? 'var(--m3-primary)'
                              : 'var(--m3-outline-variant)',
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-3">
                            {/* Expressive 3-tone M3 Swatch Circle */}
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0 grid grid-cols-2 grid-rows-2">
                              <span
                                style={{ backgroundColor: seed.swatchHex }}
                                className="col-span-1 row-span-2"
                              />
                              <span
                                style={{ backgroundColor: previewTokens.primary }}
                                className="col-span-1 row-span-1"
                              />
                              <span
                                style={{ backgroundColor: previewTokens.tertiary }}
                                className="col-span-1 row-span-1"
                              />
                            </div>
                            <div>
                              <div className="font-display font-bold text-xs leading-tight">
                                {seed.name}
                              </div>
                              <div className="text-[11px] opacity-75">{seed.label}</div>
                            </div>
                          </div>

                          {isSelected && (
                            <span
                              style={{
                                backgroundColor: 'var(--m3-primary)',
                                color: 'var(--m3-on-primary)',
                              }}
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Light / Dark Studio Mode Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            transition={M3_SPRING_BOUNCY}
            onClick={toggleMode}
            aria-label={mode === 'dark' ? 'Switch to Light Studio Mode' : 'Switch to Dark Studio Mode'}
            title={mode === 'dark' ? 'Switch to Light Studio Mode' : 'Switch to Dark Studio Mode'}
            style={{
              backgroundColor: 'var(--m3-surface-container-high)',
              color: 'var(--m3-on-surface)',
              borderColor: 'var(--m3-outline-variant)',
            }}
            className="p-2.5 rounded-full border cursor-pointer transition-colors"
          >
            {mode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </motion.button>

          {/* Primary Google Play Badge */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="hidden sm:inline-flex items-center transition-transform hover:scale-105 active:scale-95 shrink-0"
          >
            <img
              src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt="Get it on Google Play"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Mobile Drawer Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Drawer"
            aria-expanded={isMobileMenuOpen}
            style={{
              backgroundColor: 'var(--m3-surface-container-high)',
              color: 'var(--m3-on-surface)',
              borderColor: 'var(--m3-outline-variant)',
            }}
            className="lg:hidden p-2.5 rounded-full border cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Responsive Mobile Expressive Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={M3_SPRING_EXPRESSIVE}
            style={{
              backgroundColor: 'var(--m3-surface-container-high)',
              borderColor: 'var(--m3-outline)',
              color: 'var(--m3-on-surface)',
              boxShadow: '0 28px 64px -12px rgba(0, 0, 0, 0.6)',
            }}
            className="lg:hidden mt-2.5 p-5 rounded-[2.25rem] border backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 gap-1.5 mb-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeNavKey === item.key;
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    style={{
                      backgroundColor: isActive
                        ? 'var(--m3-primary)'
                        : 'var(--m3-surface-container)',
                      color: isActive ? 'var(--m3-on-primary)' : 'var(--m3-on-surface)',
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl font-display font-bold text-sm transition-transform active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="text-[11px] uppercase tracking-wider font-extrabold opacity-85">
                        Active
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Material You Swatch Bar */}
            <div
              style={{
                backgroundColor: 'var(--m3-surface-container)',
                borderColor: 'var(--m3-outline-variant)',
              }}
              className="p-3.5 rounded-2xl border mb-4"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-display font-bold">
                  Material You Palette: <span style={{ color: 'var(--m3-primary)' }}>{palette.name}</span>
                </span>
                <button
                  type="button"
                  onClick={toggleMode}
                  style={{
                    backgroundColor: 'var(--m3-surface-container-highest)',
                    color: 'var(--m3-on-surface)',
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                >
                  {mode === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                {seedList.map((seed) => {
                  const isSelected = seed.id === seedId;
                  return (
                    <button
                      key={seed.id}
                      type="button"
                      onClick={() => setSeedId(seed.id as SeedPaletteId)}
                      aria-label={`Select ${seed.name} palette`}
                      style={{
                        backgroundColor: seed.swatchHex,
                        outlineColor: isSelected ? 'var(--m3-on-surface)' : 'transparent',
                      }}
                      className={`h-9 flex-1 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? 'scale-105 outline-2 outline-offset-2' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-1">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  src="/assets/GetItOnGooglePlay_Badge_Web_color_English.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto object-contain drop-shadow-md"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
