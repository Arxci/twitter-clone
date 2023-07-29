import Container from '../ui/container'

import SiteDesktopNav from './site-desktop-nav'

const SiteHeader = () => {
	return (
		<header className="sticky top-1 w-full h-16 flex items-center justify-center border-b">
			<Container className="w-full">
				<SiteDesktopNav />
			</Container>
		</header>
	)
}

export default SiteHeader
