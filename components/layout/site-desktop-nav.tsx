import Link from 'next/link'

import { Icons } from '../ui/icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { siteConfig } from '@/configs/siteConfig'
import NavDropdown from '../nav-dropdown'

const SiteDesktopNav = () => {
	return (
		<nav className="hidden lg:grid grid-cols-7 gap-6 items-center">
			<Link
				href="/"
				aria-label={siteConfig.title}
				className="mr-auto col-span-2"
			>
				<Icons.logo className="h-6 w-6 text-blue-500 fill-blue-500" />
			</Link>
			<div className="relative col-span-3">
				<Input
					type="text"
					placeholder="Search..."
					className="rounded-full"
				/>
				<Button
					variant="blue"
					className="absolute right-0 top-0 w-[75px] h-full flex items-center justify-center rounded-full"
				>
					<Icons.search className="h-5 w-5" />
				</Button>
			</div>
			<div className="ml-auto col-span-2">
				<NavDropdown />
			</div>
		</nav>
	)
}

export default SiteDesktopNav
