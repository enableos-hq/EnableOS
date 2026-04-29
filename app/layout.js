import { Libre_Baskerville, Sora } from 'next/font/google'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-display',
})

const sora = Sora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata = {
  title: 'EnableOS — The Operating System for Enablement',
  description: 'Stop managing enablement across 6 different tools.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  )
}
