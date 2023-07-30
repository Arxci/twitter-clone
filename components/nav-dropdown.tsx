'use client'

import { useTheme } from 'next-themes'
import { useClerk, useUser } from '@clerk/nextjs'

import { Icons } from './ui/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

const NavDropdown = () => {
	const { setTheme, theme } = useTheme()
	const { signOut } = useClerk()
	const { user } = useUser()

	let initials = 'UN'

	if (user && user?.firstName && user?.lastName) {
		initials = user?.firstName?.substring(0) + user?.lastName?.substring(0)
	}

	const themeToggleHandler = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	return (
		<DropdownMenu>
			<Avatar>
				<DropdownMenuTrigger className="h-10 w-10 outline-none">
					{user?.imageUrl ? (
						<AvatarImage src={user?.imageUrl} />
					) : (
						<AvatarFallback>{initials}</AvatarFallback>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-56"
				>
					<DropdownMenuLabel>
						<div>My Account</div>
						<div className="text-muted-foreground">{user?.username}</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href={`/profile`}>
								<Icons.user className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={`/user-profile`}>
								<Icons.settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/support">
								<Icons.lifeBuoy className="mr-2 h-4 w-4" />
								<span>Support</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icons.moon className="mr-2 h-4 w-4" />
							<span>Dark Mode</span>
							<div className="ml-auto">
								<Switch
									checked={theme === 'dark'}
									onCheckedChange={themeToggleHandler}
								/>
							</div>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => signOut()}>
						<Icons.logout className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</Avatar>
		</DropdownMenu>
	)
}

export default NavDropdown
