/** Small line icons, drawn here so the site needs no icon library. */
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
  </svg>
)
export const GitHubIcon = () => (
  <svg {...base}>
    <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.2c2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.3 5.6 2.6 5.6 2.6a4.5 4.5 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 3 5.9 5.8 6.2a3 3 0 0 0-.8 2.2V21" />
  </svg>
)
export const MailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)
export const WorkIcon = () => (
  <svg {...base}>
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
  </svg>
)
export const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9 6 6 6-6 6" />
  </svg>
)
export const UserIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c1.2-3.6 4-5.3 7.5-5.3s6.3 1.7 7.5 5.3" />
  </svg>
)
