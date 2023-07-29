import Link from 'next/link'
import { Icons } from '../ui/icons'
import NavSearchInput from '../nav-search-input'
import Container from '../ui/container'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const SiteMobileLowerNav = () => {
	return (
		<div className="sticky z-40 border-b top-16 lg:hidden bg-background/60 h-16 w-full flex items-center backdrop-blur-md">
			<Container className="flex gap-2 items-center">
				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: 'outline', size: 'icon' }),
						'w-10 h-10 '
					)}
				>
					<Icons.group className="w-4 h-4" />
				</Link>
				<NavSearchInput />
			</Container>
		</div>
	)
}

export default SiteMobileLowerNav
