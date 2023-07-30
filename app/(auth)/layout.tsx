import SiteFooter from '@/components/layout/site-footer'
import Container from '@/components/ui/container'
import { Icons } from '@/components/ui/icons'
import { siteConfig } from '@/configs/siteConfig'
import Link from 'next/link'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="sticky top-0 w-full h-16 flex items-center justify-center border-b bg-background z-40">
				<Container>
					<Link
						href="/"
						aria-label={siteConfig.title}
						className="mr-auto gird-cols-1 lg:col-span-2"
					>
						<Icons.logo className="h-8 w-8 text-blue-500 fill-blue-500" />
					</Link>
				</Container>
			</header>
			<main className="flex-1 ">
				<Container className="flex items-center py-20 justify-center">
					{children}
				</Container>
			</main>
		</div>
	)
}

/* 				 */
