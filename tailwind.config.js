/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", ".difinesai-dark"],
  theme: {
    extend: {
      colors: {
        'regal-white': '#373943',
        'landing-color': 'rgb(20, 21, 26)',

        // Scoped design-system palette. Values use the RGB-channel + `<alpha-value>`
        // pattern so Tailwind v3 can compose opacity modifiers (e.g. `bg-promo/50`,
        // `hover:bg-primary/90`, `border-primary-soft/60`). The channels live in
        // `--difinesai-*-rgb` variables defined by the scoped stylesheets:
        //   - `.difinesai-scope` (light + dark) → src/difinesai/styles.css
        //   - `.academy-scope` → src/academy/styles.css
        // Fallbacks match the DIFINES dark theme so shadcn-style utilities keep
        // working even outside a scope.
        background: 'rgb(var(--difinesai-background-rgb, 1 10 9) / <alpha-value>)',
        foreground: 'rgb(var(--difinesai-foreground-rgb, 244 246 244) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--difinesai-card-rgb, 1 10 9) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-card-foreground-rgb, 244 246 244) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--difinesai-popover-rgb, 1 10 9) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-popover-foreground-rgb, 244 246 244) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--difinesai-primary-rgb, 53 149 94) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-primary-foreground-rgb, 255 255 255) / <alpha-value>)',
          soft: 'rgb(var(--difinesai-primary-soft-rgb, 204 245 204) / <alpha-value>)',
          softer: 'rgb(var(--difinesai-primary-softer-rgb, 237 252 237) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--difinesai-secondary-rgb, 240 242 240) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-secondary-foreground-rgb, 31 37 34) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--difinesai-muted-rgb, 240 242 240) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-muted-foreground-rgb, 108 121 116) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--difinesai-accent-rgb, 232 240 232) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-accent-foreground-rgb, 0 73 12) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--difinesai-destructive-rgb, 230 44 44) / <alpha-value>)',
          foreground: 'rgb(var(--difinesai-destructive-foreground-rgb, 255 255 255) / <alpha-value>)',
        },
        border: 'rgb(var(--difinesai-border-rgb, 30 46 40) / <alpha-value>)',
        input: 'rgb(var(--difinesai-input-rgb, 30 46 40) / <alpha-value>)',
        ring: 'rgb(var(--difinesai-ring-rgb, 53 149 94) / <alpha-value>)',
        surface: 'rgb(var(--difinesai-surface-rgb, 1 10 9) / <alpha-value>)',
        'surface-2': 'rgb(var(--difinesai-surface-2-rgb, 20 20 20) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--difinesai-brand-rgb, 53 149 94) / <alpha-value>)',
          soft: 'rgb(var(--difinesai-brand-soft-rgb, 20 40 30) / <alpha-value>)',
        },
        promo: 'rgb(var(--difinesai-promo-rgb, 229 253 229) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--difinesai-radius, 0.875rem)',
        md: 'calc(var(--difinesai-radius, 0.875rem) - 2px)',
        sm: 'calc(var(--difinesai-radius, 0.875rem) - 4px)',
      },
      fontFamily: {
        zen: ['Zen Dots', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
