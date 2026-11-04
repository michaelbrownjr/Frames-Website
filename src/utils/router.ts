export type AppPage = 'home' | 'privacy' | 'terms';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.michaelbtech.framesforpixel';
export const CANONICAL_DOMAIN = 'https://frames.michaelbtech.com';
export const OFFICIAL_TERMS_URL = `${CANONICAL_DOMAIN}/terms`;
export const OFFICIAL_PRIVACY_URL = `${CANONICAL_DOMAIN}/privacy`;
export const SUPPORT_EMAIL = 'michael@michaelbtech.com';

const PAGE_TITLES: Record<AppPage, string> = {
  home: 'Frames for Pixel™ — Studio-Grade Google Pixel Mockups',
  privacy: 'Privacy Policy — Frames for Pixel™ | MichaelBTech, LLC',
  terms: 'Terms of Service — Frames for Pixel™ | MichaelBTech, LLC',
};

const PAGE_PATHS: Record<AppPage, string> = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
};

export function resolvePageFromLocation(): AppPage {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const queryPage = (searchParams.get('page') || '').toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');

  const candidates = [pathname, queryPage, hash];

  for (const c of candidates) {
    if (
      c === '/terms' ||
      c === 'terms' ||
      c.endsWith('/terms') ||
      c.endsWith('/terms/index.html') ||
      c.endsWith('/terms.html') ||
      c.includes('terms-of-service') ||
      c.includes('tos')
    ) {
      return 'terms';
    }
    if (
      c === '/privacy' ||
      c === 'privacy' ||
      c.endsWith('/privacy') ||
      c.endsWith('/privacy/index.html') ||
      c.endsWith('/privacy.html') ||
      c.includes('privacy-policy')
    ) {
      return 'privacy';
    }
  }

  return 'home';
}

export function syncPageToHistory(page: AppPage, replace = false): void {
  if (typeof window === 'undefined') return;
  document.title = PAGE_TITLES[page] || PAGE_TITLES.home;

  const targetPath = PAGE_PATHS[page];
  if (window.location.pathname !== targetPath) {
    try {
      if (replace) {
        window.history.replaceState({ page }, '', targetPath);
      } else {
        window.history.pushState({ page }, '', targetPath);
      }
    } catch {
      // Fallback if running in restricted iframe
      window.location.hash = page === 'home' ? '' : `#/${page}`;
    }
  }
}

export function getShareableUrlForPage(page: AppPage): string {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return `${window.location.origin}${PAGE_PATHS[page]}`;
  }
  return `${CANONICAL_DOMAIN}${PAGE_PATHS[page]}`;
}
