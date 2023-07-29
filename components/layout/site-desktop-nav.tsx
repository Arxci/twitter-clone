import Link from 'next/link'

import { Icons } from '../ui/icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { siteConfig } from '@/configs/siteConfig'
import NavDropdown from '../nav-dropdown'

const SiteDesktopNav = () => {
	return (
		<nav className="hidden lg:grid grid-cols-3 ">
			<div className="bg-blue-500  text-white rounded-full h-10 w-10 flex items-center justify-center">
				<Link
					href="/"
					aria-label={siteConfig.title}
				>
					<Icons.logo className="h-5 w-5" />
				</Link>
			</div>
			<div className="relative">
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
			<div className="ml-auto">
				<NavDropdown />
			</div>
		</nav>
	)
}

export default SiteDesktopNav
