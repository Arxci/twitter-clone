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
				<CardTitle>Who to follow</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="flex flex-col gap-2">
					<ShowcaseItem />
					<ShowcaseItem />
					<ShowcaseItem />
					<ShowcaseItem />
				</ul>
			</CardContent>
			<CardFooter className="text-xs pt-6 text-muted-foreground">
				<Link
					href="/"
					className="text-blue-500 "
				>
					View More
				</Link>
			</CardFooter>
		</Card>
	)
}

const ShowcaseItem = () => {
	return (
		<li className="flex items-center p-2 hover:bg-muted  rounded">
			<Link
				href="/"
				className="flex pl-6"
			>
				<Avatar className="mr-2 h-6 w-6">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<span>John Doe</span>
			</Link>
			<Button
				variant="default"
				className="w-[100px] ml-auto mr-6 rounded-full"
			>
				Follow
			</Button>
		</li>
	)
}

export default FriendsShowcase
