import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/global.css'

import { siteConfig } from '@/configs/siteConfig'

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
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	)
}
