import SimpleHeader from '@/components/layout/simple-header'
import Container from '@/components/ui/container'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<SimpleHeader />
			<main className="flex-1 ">
				<Container className="flex items-center  justify-center">
					{children}
				</Container>
			</main>
		</div>
	)
}
