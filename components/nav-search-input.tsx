'use client'

import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Input } from './ui/input'

const NavSearchInput = () => {
	return (
		<div className="relative w-full">
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
	)
}

export default NavSearchInput
