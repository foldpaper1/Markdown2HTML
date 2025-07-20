import './globals.css';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });
const merriweather = Merriweather({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Free Markdown to HTML Converter | Online MD to HTML Tool',
  description: 'Convert Markdown to clean HTML instantly with our free online tool. Live preview, syntax highlighting, and multiple templates. No registration required.',
  keywords: 'markdown to html, md to html converter, markdown converter, html generator, online markdown tool, free converter',
  authors: [{ name: 'Markdown2HTML' }],
  creator: 'Markdown2HTML',
  publisher: 'Markdown2HTML',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.vercel.app'), // Update with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Markdown to HTML Converter | Online MD to HTML Tool',
    description: 'Convert Markdown to clean HTML instantly with our free online tool. Live preview, syntax highlighting, and multiple templates.',
    url: 'https://your-domain.vercel.app', // Update with your actual domain
    siteName: 'Markdown2HTML',
    images: [
      {
        url: '/og-image.png', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'Markdown2HTML Converter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Markdown to HTML Converter | Online MD to HTML Tool',
    description: 'Convert Markdown to clean HTML instantly with our free online tool. Live preview, syntax highlighting, and multiple templates.',
    images: ['/og-image.png'], // You'll need to create this
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Markdown2HTML Converter",
              "description": "Free online tool to convert Markdown to HTML with live preview and syntax highlighting",
              "url": "https://your-domain.vercel.app", // Update with your actual domain
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Real-time Markdown to HTML conversion",
                "Live preview",
                "Syntax highlighting", 
                "Multiple templates",
                "Copy to clipboard",
                "Download HTML files",
                "Dark mode support"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${merriweather.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}