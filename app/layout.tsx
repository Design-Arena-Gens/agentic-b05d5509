import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAP CPi Dashboard',
  description: 'SAP Cloud Platform Integration Monitoring Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
