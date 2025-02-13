import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = "https://www.image-pixelator.com"
const title = "Free Image Pixelator Online"
const description = "Create pixelated images fast and free. Transform your images into pixel art with our easy-to-use online tool."
const previewImage = `${siteUrl}/examples/preview.png`

export const metadata = {
  title,
  description,
  authors: [{ name: 'Vicente Muñoz' }],
  applicationName: 'Image Pixelator',
  keywords: ['pixel art', 'image editor', 'convert images', 'pixelator', 'online pixelator', 'free pixelator', 'image to pixel art'],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Image Pixelator',
    title,
    description,
    url: siteUrl,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'Image Pixelator Preview',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#8B5CF6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Image Pixelator',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: 
      { url: '/icon.png' },

  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}