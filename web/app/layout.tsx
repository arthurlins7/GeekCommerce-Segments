import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GeekCommerce Segments',
  description: 'Segmentação de clientes com RFM + Clustering',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
