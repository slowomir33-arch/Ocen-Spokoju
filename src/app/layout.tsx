import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import IntroReveal from '@/components/IntroReveal'
import StructuredData from '@/components/StructuredData'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ocean Spokoju: Premium Kąpiel w Dźwiękach - Zarezerwuj Swój Spokój',
  description: 'Odkryj Ocean Spokoju – 2,5h luksusowej kąpieli w dźwiękach. Uwolnij stres i znajdź harmonię. Małe grupy (7 os.). Zarezerwuj miejsce premium.',
  keywords: 'kąpiel w dźwiękach, warsztaty mis tybetańskich, relaksacja premium, zabieg dla duszy, harmonia i spokój, rozwój duchowy, kąpiel w dźwiękach Katowice, kąpiel w dźwiękach Kraków, kąpiel w dźwiękach Warszawa, kąpiel w dźwiękach Poznań, kąpiel w dźwiękach Racibórz',
  authors: [{ name: 'Ocean Spokoju' }],
  creator: 'Ocean Spokoju',
  publisher: 'Ocean Spokoju',
  metadataBase: new URL('https://oceanspokoju.studio'),
  alternates: {
    canonical: 'https://oceanspokoju.studio',
  },
  openGraph: {
    title: 'Ocean Spokoju: Premium Kąpiel w Dźwiękach - Zarezerwuj Swój Spokój',
    description: 'Odkryj Ocean Spokoju – 2,5h luksusowej kąpieli w dźwiękach. Uwolnij stres i znajdź harmonię. Małe grupy (7 os.).',
    url: 'https://oceanspokoju.studio',
    siteName: 'Ocean Spokoju',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Ocean Spokoju - Premium Kąpiel w Dźwiękach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ocean Spokoju: Premium Kąpiel w Dźwiękach',
    description: 'Odkryj Ocean Spokoju – 2,5h luksusowej kąpieli w dźwiękach. Uwolnij stres i znajdź harmonię.',
    images: ['/og-image.svg'],
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <meta name="theme-color" content="#4C2882" />
        <style dangerouslySetInnerHTML={{__html: `
          body:not(.intro-ready) {
            opacity: 0 !important;
            overflow: hidden;
          }
        `}} />
      </head>
      <body className={inter.className}>
        <StructuredData />
        <IntroReveal />
        {children}
      </body>
    </html>
  )
}
