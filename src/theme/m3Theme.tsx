import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';
export type SeedPaletteId = 'pixel-blue' | 'emerald-mint' | 'rose-quartz' | 'amber-gold' | 'violet-iris';

export interface M3SeedPalette {
  id: SeedPaletteId;
  name: string;
  label: string;
  swatchHex: string;
  light: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    surface: string;
    surfaceDim: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    glowPrimary: string;
    glowTertiary: string;
  };
  dark: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    surface: string;
    surfaceDim: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    glowPrimary: string;
    glowTertiary: string;
  };
}

export const M3_SEED_PALETTES: Record<SeedPaletteId, M3SeedPalette> = {
  'pixel-blue': {
    id: 'pixel-blue',
    name: 'Pixel Sapphire',
    label: 'Bay Blue & Indigo',
    swatchHex: '#3B82F6',
    light: {
      primary: '#1D4ED8',
      onPrimary: '#FFFFFF',
      primaryContainer: '#DBEAFE',
      onPrimaryContainer: '#1E3A8A',
      secondary: '#4338CA',
      secondaryContainer: '#E0E7FF',
      onSecondaryContainer: '#312E81',
      tertiary: '#7C3AED',
      tertiaryContainer: '#F3E8FF',
      onTertiaryContainer: '#4C1D95',
      surface: '#F8FAFF',
      surfaceDim: '#EEF2FF',
      surfaceContainerLow: '#F1F5FD',
      surfaceContainer: '#FFFFFF',
      surfaceContainerHigh: '#E8EEFB',
      surfaceContainerHighest: '#DCE5F7',
      onSurface: '#0F172A',
      onSurfaceVariant: '#475569',
      outline: '#CBD5E1',
      outlineVariant: '#E2E8F0',
      glowPrimary: 'rgba(59, 130, 246, 0.25)',
      glowTertiary: 'rgba(139, 92, 246, 0.20)',
    },
    dark: {
      primary: '#93C5FD',
      onPrimary: '#0B2559',
      primaryContainer: '#1E3A8A',
      onPrimaryContainer: '#DBEAFE',
      secondary: '#A5B4FC',
      secondaryContainer: '#312E81',
      onSecondaryContainer: '#E0E7FF',
      tertiary: '#D8B4FE',
      tertiaryContainer: '#4C1D95',
      onTertiaryContainer: '#F3E8FF',
      surface: '#090D16',
      surfaceDim: '#060911',
      surfaceContainerLow: '#111726',
      surfaceContainer: '#161F33',
      surfaceContainerHigh: '#1E2942',
      surfaceContainerHighest: '#283554',
      onSurface: '#F1F5F9',
      onSurfaceVariant: '#94A3B8',
      outline: '#334155',
      outlineVariant: '#1E293B',
      glowPrimary: 'rgba(59, 130, 246, 0.32)',
      glowTertiary: 'rgba(139, 92, 246, 0.25)',
    },
  },
  'emerald-mint': {
    id: 'emerald-mint',
    name: 'Pixel Mint',
    label: 'Aloe & Emerald',
    swatchHex: '#10B981',
    light: {
      primary: '#047857',
      onPrimary: '#FFFFFF',
      primaryContainer: '#D1FAE5',
      onPrimaryContainer: '#064E3B',
      secondary: '#0F766E',
      secondaryContainer: '#CCFBF1',
      onSecondaryContainer: '#134E4A',
      tertiary: '#0284C7',
      tertiaryContainer: '#E0F2FE',
      onTertiaryContainer: '#0C4A6E',
      surface: '#F6FEF9',
      surfaceDim: '#ECFDF5',
      surfaceContainerLow: '#EFFAF4',
      surfaceContainer: '#FFFFFF',
      surfaceContainerHigh: '#E3F5EC',
      surfaceContainerHighest: '#D5EDE1',
      onSurface: '#062219',
      onSurfaceVariant: '#3F6256',
      outline: '#A7F3D0',
      outlineVariant: '#D1FAE5',
      glowPrimary: 'rgba(16, 185, 129, 0.24)',
      glowTertiary: 'rgba(14, 165, 233, 0.20)',
    },
    dark: {
      primary: '#6EE7B7',
      onPrimary: '#064E3B',
      primaryContainer: '#065F46',
      onPrimaryContainer: '#D1FAE5',
      secondary: '#5EEAD4',
      secondaryContainer: '#115E59',
      onSecondaryContainer: '#CCFBF1',
      tertiary: '#7DD3FC',
      tertiaryContainer: '#075985',
      onTertiaryContainer: '#E0F2FE',
      surface: '#07120E',
      surfaceDim: '#040B08',
      surfaceContainerLow: '#0D1F18',
      surfaceContainer: '#132A21',
      surfaceContainerHigh: '#1A382C',
      surfaceContainerHighest: '#234739',
      onSurface: '#ECFDF5',
      onSurfaceVariant: '#99C2B3',
      outline: '#1F4B3B',
      outlineVariant: '#153529',
      glowPrimary: 'rgba(16, 185, 129, 0.30)',
      glowTertiary: 'rgba(14, 165, 233, 0.25)',
    },
  },
  'rose-quartz': {
    id: 'rose-quartz',
    name: 'Peony Rose',
    label: 'Rose Quartz & Plum',
    swatchHex: '#F43F5E',
    light: {
      primary: '#BE123C',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FFE4E6',
      onPrimaryContainer: '#881337',
      secondary: '#9D174D',
      secondaryContainer: '#FCE7F3',
      onSecondaryContainer: '#831843',
      tertiary: '#7E22CE',
      tertiaryContainer: '#F3E8FF',
      onTertiaryContainer: '#581C87',
      surface: '#FFF8F9',
      surfaceDim: '#FFF1F2',
      surfaceContainerLow: '#FDF2F4',
      surfaceContainer: '#FFFFFF',
      surfaceContainerHigh: '#FCE7EB',
      surfaceContainerHighest: '#F9D8DF',
      onSurface: '#270910',
      onSurfaceVariant: '#68424B',
      outline: '#FECDD3',
      outlineVariant: '#FFE4E6',
      glowPrimary: 'rgba(244, 63, 94, 0.24)',
      glowTertiary: 'rgba(168, 85, 247, 0.20)',
    },
    dark: {
      primary: '#FDA4AF',
      onPrimary: '#690922',
      primaryContainer: '#9F1239',
      onPrimaryContainer: '#FFE4E6',
      secondary: '#F9A8D4',
      secondaryContainer: '#831843',
      onSecondaryContainer: '#FCE7F3',
      tertiary: '#D8B4FE',
      tertiaryContainer: '#581C87',
      onTertiaryContainer: '#F3E8FF',
      surface: '#14080B',
      surfaceDim: '#0D0507',
      surfaceContainerLow: '#210E13',
      surfaceContainer: '#2B141A',
      surfaceContainerHigh: '#381B23',
      surfaceContainerHighest: '#47242D',
      onSurface: '#FFF1F2',
      onSurfaceVariant: '#CFA3AD',
      outline: '#542934',
      outlineVariant: '#381921',
      glowPrimary: 'rgba(244, 63, 94, 0.30)',
      glowTertiary: 'rgba(168, 85, 247, 0.24)',
    },
  },
  'amber-gold': {
    id: 'amber-gold',
    name: 'Lemongrass',
    label: 'Warm Amber & Teal',
    swatchHex: '#F59E0B',
    light: {
      primary: '#B45309',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FEF3C7',
      onPrimaryContainer: '#78350F',
      secondary: '#A16207',
      secondaryContainer: '#FEF9C3',
      onSecondaryContainer: '#713F12',
      tertiary: '#0F766E',
      tertiaryContainer: '#CCFBF1',
      onTertiaryContainer: '#134E4A',
      surface: '#FFFDF7',
      surfaceDim: '#FEF9E7',
      surfaceContainerLow: '#FDF8EC',
      surfaceContainer: '#FFFFFF',
      surfaceContainerHigh: '#F9F0DB',
      surfaceContainerHighest: '#F3E5C8',
      onSurface: '#231705',
      onSurfaceVariant: '#66543B',
      outline: '#FDE68A',
      outlineVariant: '#FEF3C7',
      glowPrimary: 'rgba(245, 158, 11, 0.25)',
      glowTertiary: 'rgba(20, 184, 166, 0.20)',
    },
    dark: {
      primary: '#FCD34D',
      onPrimary: '#542404',
      primaryContainer: '#92400E',
      onPrimaryContainer: '#FEF3C7',
      secondary: '#FDE047',
      secondaryContainer: '#713F12',
      onSecondaryContainer: '#FEF9C3',
      tertiary: '#5EEAD4',
      tertiaryContainer: '#115E59',
      onTertiaryContainer: '#CCFBF1',
      surface: '#130E05',
      surfaceDim: '#0C0903',
      surfaceContainerLow: '#1F170A',
      surfaceContainer: '#29200F',
      surfaceContainerHigh: '#362A15',
      surfaceContainerHighest: '#45361C',
      onSurface: '#FFFBEB',
      onSurfaceVariant: '#CDB898',
      outline: '#524022',
      outlineVariant: '#332714',
      glowPrimary: 'rgba(245, 158, 11, 0.28)',
      glowTertiary: 'rgba(20, 184, 166, 0.24)',
    },
  },
  'violet-iris': {
    id: 'violet-iris',
    name: 'Obsidian Iris',
    label: 'Violet & Magenta',
    swatchHex: '#8B5CF6',
    light: {
      primary: '#6D28D9',
      onPrimary: '#FFFFFF',
      primaryContainer: '#EDE9FE',
      onPrimaryContainer: '#4C1D95',
      secondary: '#7E22CE',
      secondaryContainer: '#F3E8FF',
      onSecondaryContainer: '#581C87',
      tertiary: '#DB2777',
      tertiaryContainer: '#FCE7F3',
      onTertiaryContainer: '#831843',
      surface: '#FAF8FF',
      surfaceDim: '#F3F0FF',
      surfaceContainerLow: '#F5F2FD',
      surfaceContainer: '#FFFFFF',
      surfaceContainerHigh: '#ECE7FA',
      surfaceContainerHighest: '#E1DAF5',
      onSurface: '#170D2B',
      onSurfaceVariant: '#53456E',
      outline: '#DDD6FE',
      outlineVariant: '#EDE9FE',
      glowPrimary: 'rgba(139, 92, 246, 0.25)',
      glowTertiary: 'rgba(236, 72, 153, 0.20)',
    },
    dark: {
      primary: '#C4B5FD',
      onPrimary: '#361075',
      primaryContainer: '#5B21B6',
      onPrimaryContainer: '#EDE9FE',
      secondary: '#D8B4FE',
      secondaryContainer: '#581C87',
      onSecondaryContainer: '#F3E8FF',
      tertiary: '#F472B6',
      tertiaryContainer: '#831843',
      onTertiaryContainer: '#FCE7F3',
      surface: '#0D0917',
      surfaceDim: '#08050F',
      surfaceContainerLow: '#161026',
      surfaceContainer: '#1E1633',
      surfaceContainerHigh: '#281E42',
      surfaceContainerHighest: '#342854',
      onSurface: '#F5F3FF',
      onSurfaceVariant: '#B2A4CE',
      outline: '#423366',
      outlineVariant: '#291F42',
      glowPrimary: 'rgba(139, 92, 246, 0.32)',
      glowTertiary: 'rgba(236, 72, 153, 0.25)',
    },
  },
};

export const M3_SPRING_EXPRESSIVE = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 26,
  mass: 0.9,
};

export const M3_SPRING_BOUNCY = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 20,
  mass: 0.8,
};

export const M3_SPRING_GENTLE = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 1,
};

interface M3ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  seedId: SeedPaletteId;
  setSeedId: (id: SeedPaletteId) => void;
  palette: M3SeedPalette;
  tokens: M3SeedPalette['dark'];
}

const M3ThemeContext = createContext<M3ThemeContextValue | null>(null);

export const M3ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('frames-m3-mode');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [seedId, setSeedId] = useState<SeedPaletteId>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('frames-m3-seed') as SeedPaletteId | null;
      if (saved && M3_SEED_PALETTES[saved]) return saved;
    }
    return 'pixel-blue';
  });

  const palette = M3_SEED_PALETTES[seedId];
  const tokens = mode === 'dark' ? palette.dark : palette.light;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('frames-m3-mode', mode);
    window.localStorage.setItem('frames-m3-seed', seedId);

    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-seed', seedId);

    root.style.setProperty('--m3-primary', tokens.primary);
    root.style.setProperty('--m3-on-primary', tokens.onPrimary);
    root.style.setProperty('--m3-primary-container', tokens.primaryContainer);
    root.style.setProperty('--m3-on-primary-container', tokens.onPrimaryContainer);
    root.style.setProperty('--m3-secondary', tokens.secondary);
    root.style.setProperty('--m3-secondary-container', tokens.secondaryContainer);
    root.style.setProperty('--m3-on-secondary-container', tokens.onSecondaryContainer);
    root.style.setProperty('--m3-tertiary', tokens.tertiary);
    root.style.setProperty('--m3-tertiary-container', tokens.tertiaryContainer);
    root.style.setProperty('--m3-on-tertiary-container', tokens.onTertiaryContainer);
    root.style.setProperty('--m3-surface', tokens.surface);
    root.style.setProperty('--m3-surface-dim', tokens.surfaceDim);
    root.style.setProperty('--m3-surface-container-low', tokens.surfaceContainerLow);
    root.style.setProperty('--m3-surface-container', tokens.surfaceContainer);
    root.style.setProperty('--m3-surface-container-high', tokens.surfaceContainerHigh);
    root.style.setProperty('--m3-surface-container-highest', tokens.surfaceContainerHighest);
    root.style.setProperty('--m3-on-surface', tokens.onSurface);
    root.style.setProperty('--m3-on-surface-variant', tokens.onSurfaceVariant);
    root.style.setProperty('--m3-outline', tokens.outline);
    root.style.setProperty('--m3-outline-variant', tokens.outlineVariant);
    root.style.setProperty('--m3-glow-primary', tokens.glowPrimary);
    root.style.setProperty('--m3-glow-tertiary', tokens.glowTertiary);
  }, [mode, seedId, tokens]);

  const toggleMode = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <M3ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        seedId,
        setSeedId,
        palette,
        tokens,
      }}
    >
      {children}
    </M3ThemeContext.Provider>
  );
};

export function useM3Theme(): M3ThemeContextValue {
  const ctx = useContext(M3ThemeContext);
  if (!ctx) {
    throw new Error('useM3Theme must be used inside an M3ThemeProvider');
  }
  return ctx;
}
