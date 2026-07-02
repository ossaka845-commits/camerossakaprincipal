/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom CamerOssaka colors
        cameroon: {
          green: '#007A5E',
          red: '#CE1126',
          yellow: '#FCD116',
        },
        african: {
          ochre: '#C4956A',
          earth: '#8B4513',
          sand: '#E6D5AC',
        },
        european: {
          navy: '#1A2744',
          pearl: '#F5F5F0',
        },
        // Titan Structure — architectural accent palette
        titan: {
          brand: '#CC1A1A',
          mint: '#CC1A1A',
          emerald: '#CC1A1A',
          dark: '#0D0D0D',
          surface: '#111111',
          card: '#161616',
          border: '#1E1E1E',
          muted: '#3A3A3A',
        },
        gold: '#D4A03A',
        dark: '#0D0D0D',
        light: '#F4F6FA',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        special: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 20px rgba(0, 122, 94, 0.3)",
        'glow-gold': "0 0 20px rgba(212, 160, 58, 0.3)",
        'glow-mint': "0 0 24px rgba(121, 216, 183, 0.25)",
        'glow-mint-strong': "0 0 40px rgba(121, 216, 183, 0.45), 0 0 80px rgba(121, 216, 183, 0.18)",
        'glow-green': "0 0 24px rgba(0, 122, 94, 0.35)",
        'card-dark': "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(121,216,183,0.07)",
        'card-elevated': "0 0 0 1px rgba(121,216,183,0.08), 0 8px 24px rgba(0,0,0,0.5)",
        'inner-mint': "inset 0 1px 0 rgba(121, 216, 183, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "shimmer": {
          "from": { backgroundPosition: "200% center" },
          "to": { backgroundPosition: "-200% center" },
        },
        "fade-in": {
          "from": { opacity: "0", transform: "translateY(16px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "from": { opacity: "0", transform: "translateY(32px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          "from": { opacity: "0", transform: "translateX(-24px)" },
          "to": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(121, 216, 183, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(121, 216, 183, 0.42)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-up": "slide-up 0.6s ease-out both",
        "slide-right": "slide-right 0.6s ease-out both",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
