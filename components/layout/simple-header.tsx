import { siteConfig } from '@/configs/siteConfig'

import Link from 'next/link'
import { Icons } from '../ui/icons'
import Container from '../ui/container'

const SimpleHeader = () => {
	return (
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
	)
}

export default SimpleHeader
