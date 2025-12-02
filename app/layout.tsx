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
    <html lang="en" className="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Force remove dark class and clear theme from localStorage
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                try {
                  localStorage.removeItem('theme');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-text-primary font-primary antialiased" style={{ backgroundColor: '#FFFFFF' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

