// CamerOssaka Design System v2.0
// Design Tokens - Source of Truth

export const colors = {
  // Brand Colors
  brand: {
    primary: '#007A5E',      // Cameroon Green - Primary brand
    primaryDark: '#006B52',  // Darker variant for hover
    primaryLight: '#79d8b7',  // Mint - Accents & highlights
    secondary: '#1A2744',    // European Navy - Secondary elements
    gold: '#D4A03A',         // Gold - Premium accents
    goldLight: '#FCD116',    // Yellow - Cameroon flag
  },

  // Background Colors
  background: {
    base: '#0b141f',         // Dark base background
    surface: '#0e1a28',     // Card/surface background
    elevated: '#132235',     // Elevated surfaces — more distinct
    card: '#0c1824',         // Subtle card alternative
    overlay: 'rgba(8, 14, 23, 0.97)', // Overlay backgrounds
  },

  // Text Colors
  text: {
    primary: '#F7F8FB',      // Primary text - white
    secondary: '#A6AFBF',    // Secondary text - muted
    tertiary: '#6B7A8C',     // Tertiary text - very muted
    inverse: '#0b141f',      // Text on light backgrounds
  },

  // Border Colors
  border: {
    subtle: 'rgba(121, 216, 183, 0.06)',
    default: 'rgba(121, 216, 183, 0.12)',
    strong: 'rgba(121, 216, 183, 0.28)',
    emphasis: 'rgba(121, 216, 183, 0.50)',
    gold: 'rgba(212, 160, 58, 0.28)',
    goldStrong: 'rgba(212, 160, 58, 0.55)',
  },

  // State Colors
  state: {
    success: '#10B981',      // Emerald
    warning: '#F59E0B',      // Amber
    error: '#EF4444',        // Red
    info: '#3B82F6',         // Blue
  },

  // Cameroon Flag Colors
  cameroon: {
    green: '#007A5E',
    red: '#CE1126',
    yellow: '#FCD116',
  },
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const;

export const typography = {
  // Font Families
  fonts: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    sora: "'Sora', system-ui, sans-serif",
  },

  // Font Sizes
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },

  // Line Heights
  leading: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
  },

  // Font Weights
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const layout = {
  // Breakpoints (in pixels)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },

  // Section spacing
  section: {
    py: '6rem',      // 96px
    px: '1.5rem',    // 24px
    pxLg: '4vw',     // Responsive padding
  },
} as const;

export const effects = {
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    default: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    card: '0 0 0 1px rgba(121, 216, 183, 0.07), 0 8px 24px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 1px 0 rgba(121, 216, 183, 0.08)',
    glow: '0 0 24px rgba(121, 216, 183, 0.25), 0 0 48px rgba(121, 216, 183, 0.08)',
    glowStrong: '0 0 40px rgba(121, 216, 183, 0.45), 0 0 80px rgba(121, 216, 183, 0.18)',
    glowGold: '0 0 24px rgba(212, 160, 58, 0.30), 0 0 48px rgba(212, 160, 58, 0.10)',
  },

  // Blur
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },

  // Transitions
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.125rem',  // 2px
    default: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '1rem',      // 16px
    full: '9999px',
  },
} as const;

export const animations = {
  // Durations
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },

  // Easing
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Keyframes presets
  keyframes: {
    fadeIn: 'fadeIn 0.5s ease-out',
    slideUp: 'slideUp 0.5s ease-out',
    slideDown: 'slideDown 0.5s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
    pulse: 'pulse 2s infinite',
    float: 'float 3s ease-in-out infinite',
  },
} as const;

// CSS Custom Properties Export for Tailwind
export const cssVariables = `
  :root {
    /* Colors */
    --color-primary: ${colors.brand.primary};
    --color-primary-dark: ${colors.brand.primaryDark};
    --color-primary-light: ${colors.brand.primaryLight};
    --color-secondary: ${colors.brand.secondary};
    --color-gold: ${colors.brand.gold};
    --color-gold-light: ${colors.brand.goldLight};
    
    /* Backgrounds */
    --bg-base: ${colors.background.base};
    --bg-surface: ${colors.background.surface};
    --bg-elevated: ${colors.background.elevated};
    
    /* Text */
    --text-primary: ${colors.text.primary};
    --text-secondary: ${colors.text.secondary};
    --text-tertiary: ${colors.text.tertiary};
    
    /* Borders */
    --border-subtle: ${colors.border.subtle};
    --border-default: ${colors.border.default};
    --border-strong: ${colors.border.strong};
    
    /* Effects */
    --shadow-glow: ${effects.shadows.glow};
    --radius-default: ${effects.radius.default};
    --transition-normal: ${effects.transitions.normal};
  }
`;

// Gradients
export const gradients = {
  hero: 'linear-gradient(135deg, rgba(0, 122, 94, 0.18) 0%, transparent 60%)',
  card: 'linear-gradient(145deg, #132235 0%, #0e1a28 100%)',
  mint: 'linear-gradient(135deg, #79d8b7 0%, #4fcba0 100%)',
  mintText: 'linear-gradient(135deg, #79d8b7 0%, #a8e8d4 100%)',
  gold: 'linear-gradient(135deg, #D4A03A 0%, #FCD116 100%)',
  cameroon: 'linear-gradient(135deg, #007A5E 0%, #FCD116 50%, #CE1126 100%)',
  dark: 'linear-gradient(180deg, #0b141f 0%, #080e17 100%)',
  surface: 'linear-gradient(145deg, rgba(19, 34, 53, 0.8) 0%, rgba(14, 26, 40, 0.6) 100%)',
} as const;

// Utility classes
export const utilityClasses = {
  // Glass morphism
  glass: 'backdrop-blur-md bg-white/5 border border-white/10',
  glassStrong: 'backdrop-blur-xl bg-white/[0.07] border border-white/15',

  // Gradient text
  gradientText: 'bg-gradient-to-r from-[#79d8b7] to-[#007A5E] bg-clip-text text-transparent',
  gradientTextGold: 'bg-gradient-to-r from-[#D4A03A] to-[#FCD116] bg-clip-text text-transparent',

  // Glow effect
  glowBorder: 'border border-[#79d8b7]/30 hover:border-[#79d8b7]/60 transition-colors',
  glowBorderGold: 'border border-[#D4A03A]/30 hover:border-[#D4A03A]/60 transition-colors',

  // Feature card with hover depth
  featureCard: 'bg-[linear-gradient(145deg,#132235,#0e1a28)] border border-[rgba(121,216,183,0.07)] hover:border-[rgba(121,216,183,0.20)] hover:-translate-y-0.5 transition-all duration-300',

  // Tech label
  techBadge: 'inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium font-mono text-[#79d8b7] border border-[#79d8b7]/30 rounded-sm',
  goldBadge: 'inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium font-mono text-[#D4A03A] border border-[#D4A03A]/30 rounded-sm',

  // Capsule pill badges
  capsuleMint: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase font-mono text-[#79d8b7] bg-[rgba(121,216,183,0.10)] border border-[rgba(121,216,183,0.28)]',
  capsuleGold: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase font-mono text-[#D4A03A] bg-[rgba(212,160,58,0.10)] border border-[rgba(212,160,58,0.28)]',
};

// Export as default object
const designSystem = {
  colors,
  spacing,
  typography,
  layout,
  effects,
  animations,
  gradients,
  utilityClasses,
};

export default designSystem;
