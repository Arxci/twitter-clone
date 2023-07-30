import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/global.css'

import { siteConfig } from '@/configs/siteConfig'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${font.className}`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
