import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const FriendsShowcase = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Friends</CardTitle>
				<CardDescription>View your most recent friends</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="flex flex-col gap-2">
					<ShowcaseItem />
					<ShowcaseItem />
					<ShowcaseItem />
					<ShowcaseItem />
				</ul>
			</CardContent>
			<CardFooter className="text-xs text-muted-foreground">
				<Link
					href="/"
					className="text-blue-500"
				>
					View More
				</Link>
			</CardFooter>
		</Card>
	)
}

const ShowcaseItem = () => {
	return (
		<li className="flex items-center p-2 hover:bg-muted h-10 rounded">
			<Link
				href="/"
				className="flex "
			>
				<Avatar className="mr-2 h-6 w-6">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<span>John Doe</span>
			</Link>
			<Button className="text-blue-500 p-0 bg-transparent ml-auto hover:bg-transparent">
				Following
			</Button>
		</li>
	)
}

export default FriendsShowcase
