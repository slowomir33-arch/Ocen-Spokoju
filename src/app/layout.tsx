import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import IntroReveal from '@/components/IntroReveal'

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
  title: 'Ocean Spokoju - Warsztaty Duchowe | Premium Sesje Relaksacyjne',
  description: 'Zabieg pielęgnacyjny dla duszy. Poczuj harmonię w zaledwie 2,5h. Ekskluzywne warsztaty duchowe w Katowicach, Krakowie, Warszawie, Poznaniu i Raciborzu.',
  keywords: 'warsztaty duchowe, sesje relaksacyjne, medytacja, kąpiel w dźwiękach, masaż dźwiękiem, rozwój osobisty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          body:not(.intro-ready) {
            opacity: 0 !important;
            overflow: hidden;
          }
        `}} />
      </head>
      <body className={inter.className}>
        <IntroReveal />
        {children}
      </body>
    </html>
  )
}
