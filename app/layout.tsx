import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/ModalProvider'
import ToasterProvider  from '@/components/ToasterProvider'
import { CrispProvider } from '@/components/CrispProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rage',
  description: 'AI app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CrispProvider/>
          <ToasterProvider/>
          <ModalProvider/>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
