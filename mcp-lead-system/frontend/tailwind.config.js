export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bc13fe',
        'glass-bg': 'rgba(17, 25, 40, 0.75)',
        'glass-border': 'rgba(255, 255, 255, 0.125)',

        // The background "Deep Space" colors
        dashboard: {
          dark: '#0f172a',    // Main background (very dark blue-grey)
          card: '#1e293b',    // Card background (lighter blue-grey)
          border: '#334155',  // Borders
          text: '#94a3b8',    // Muted text
          textHighlight: '#f8fafc', // Bright text
        },
        // Status Colors (Neon accents)
        status: {
          total: '#3b82f6',   // Blue
          enriched: '#eab308',// Yellow/Gold
          ready: '#f97316',   // Orange
          sent: '#10b981',    // Green
          failed: '#ef4444',  // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern font
      }
    },
  },
  plugins: [],
}