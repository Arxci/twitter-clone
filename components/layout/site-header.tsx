import Container from '../ui/container'

import SiteDesktopNav from './site-desktop-nav'

const SiteHeader = () => {
	return (
		<header className="sticky top-0 w-full h-16 flex items-center justify-center border-b bg-background z-40">
			<Container className="w-full">
				<SiteDesktopNav />
			</Container>
		</header>
	)
}

export default SiteHeader
