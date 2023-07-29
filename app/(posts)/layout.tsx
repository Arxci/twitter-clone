import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import Container from '@/components/ui/container'
import FriendsShowcase from './components/FriendsShowcase'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader />
			<main className="flex-1 ">
				<div className="py-6">
					<Container>
						<div className="grid gird-cols-1 lg:grid-cols-7 gap-6">
							<div className="col-span-2 hidden lg:block">
								<FriendsShowcase />
							</div>

							<div className="lg:col-span-3 ">{children}</div>
							<div className="col-span-2 hidden lg:block">Right</div>
						</div>
					</Container>
				</div>
			</main>
			<SiteFooter />
		</div>
	)
}
