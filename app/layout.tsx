import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'EyeWear India - Online Eye Checkup, Prescription & Eyewear in One Place',
  description: 'Get your eyes checked by certified doctors, receive prescriptions, and buy the perfect eyewear. Online eye checkup, consultation, and eyewear store all in one platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary font-primary antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

