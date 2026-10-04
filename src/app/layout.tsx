import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/lib/auth/theme-context';
import { AuthProvider } from '@/lib/auth/auth-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'AERIQ — Intelligent RAS Farm Management',
    template: '%s | AERIQ',
  },
  description:
    'Professional SaaS platform for managing, monitoring, analyzing, and optimizing Recirculating Aquaculture Systems (RAS) by Aero Intelli.',
  keywords: [
    'AERIQ',
    'Aero Intelli',
    'Aquaculture',
    'RAS',
    'Farm Management',
    'Water Quality',
    'IoT',
    'Fish Farming',
  ],
  authors: [{ name: 'Aero Intelli' }],
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#080c14' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-theme-flash inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('aeriq-theme-preference');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored || stored === 'system') && prefersDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary min-h-screen antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
