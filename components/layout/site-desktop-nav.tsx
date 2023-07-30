import Link from 'next/link'

import { Icons } from '../ui/icons'
import { Input } from '../ui/input'
import { Button, buttonVariants } from '../ui/button'

import { siteConfig } from '@/configs/siteConfig'
import NavDropdown from '../nav-dropdown'
import NavSearchInput from '../nav-search-input'
import { auth } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const SiteDesktopNav = () => {
	const { userId } = auth()

	return (
		<nav className="grid grid-cols-2 lg:grid-cols-7 gap-6 items-center">
			<Link
				href="/"
				aria-label={siteConfig.title}
				className="mr-auto gird-cols-1 lg:col-span-2"
			>
				<Icons.logo className="h-6 w-6 text-blue-500 fill-blue-500" />
			</Link>
			<div className="hidden lg:block col-span-3">
				<NavSearchInput />
			</div>

			<div className="ml-auto grid-cols-1 lg:col-span-2">
				{userId && <NavDropdown />}
				{!userId && (
					<Link
						href="/sign-in"
						className={cn(buttonVariants({ variant: 'blue' }))}
					>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	)
}

export default SiteDesktopNav
