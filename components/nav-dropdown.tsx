'use client'

import { useTheme } from 'next-themes'
import { useClerk } from '@clerk/nextjs'

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

const NavDropdown = () => {
	const { setTheme, theme } = useTheme()
	const { signOut } = useClerk()

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
				<DropdownMenuTrigger className="h-10 w-10">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-56"
				>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Icons.user className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icons.settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icons.lifeBuoy className="mr-2 h-4 w-4" />
							<span>Support</span>
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
