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

        // DIFINES / shadcn CSS-variable palette (scoped under .difinesai-scope)
        background: 'var(--difinesai-background, #010a09)',
        foreground: 'var(--difinesai-foreground, oklch(0.97 0.005 150))',
        card: {
          DEFAULT: 'var(--difinesai-card, #010a09)',
          foreground: 'var(--difinesai-card-foreground, oklch(0.97 0.005 150))',
        },
        popover: {
          DEFAULT: 'var(--difinesai-popover, #010a09)',
          foreground: 'var(--difinesai-popover-foreground, oklch(0.97 0.005 150))',
        },
        primary: {
          DEFAULT: 'var(--difinesai-primary, #35955e)',
          foreground: 'var(--difinesai-primary-foreground, oklch(1 0 0))',
        },
        secondary: {
          DEFAULT: 'var(--difinesai-secondary, oklch(0.96 0.01 150))',
          foreground: 'var(--difinesai-secondary-foreground, oklch(0.2 0.02 160))',
        },
        muted: {
          DEFAULT: 'var(--difinesai-muted, oklch(0.96 0.01 150))',
          foreground: 'var(--difinesai-muted-foreground, oklch(0.68 0.02 155))',
        },
        accent: {
          DEFAULT: 'var(--difinesai-accent, oklch(0.95 0.03 150))',
          foreground: 'var(--difinesai-accent-foreground, oklch(0.95 0.05 150))',
        },
        destructive: {
          DEFAULT: 'var(--difinesai-destructive, oklch(0.65 0.2 25))',
          foreground: 'var(--difinesai-destructive-foreground, oklch(0.98 0 0))',
        },
        border: 'var(--difinesai-border, color-mix(in srgb, #35955e 20%, #010a09))',
        input: 'var(--difinesai-input, color-mix(in srgb, #35955e 20%, #010a09))',
        ring: 'var(--difinesai-ring, #35955e)',
        surface: 'var(--difinesai-surface, #010a09)',
        'surface-2': 'var(--difinesai-surface-2, color-mix(in srgb, white 5%, #010a09))',
        brand: {
          DEFAULT: 'var(--difinesai-brand, #35955e)',
          soft: 'var(--difinesai-brand-soft, color-mix(in srgb, #35955e 14%, #010a09))',
        },
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
