'use client'

import { useState, useEffect } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Icons } from './ui/icons'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import Link from 'next/link'

const Post = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Post Title</CardTitle>
				<div className="flex flex-col gap-2 text-muted-foreground text-sm">
					<div className="flex items-center">
						<Avatar className="mr-2 h-6 w-6">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span>Author</span>
						<Icons.dot className="h-4 w-4" />
						<span>JUL 29</span>
						<Icons.dot className="h-4 w-4 hidden md:block" />
						<Button className="text-blue-500 hidden md:block p-0 bg-transparent hover:bg-transparent">
							Follow
						</Button>
					</div>
					<div className="flex items-center">
						<Badge
							variant="outline"
							className="text-muted-foreground"
						>
							#Politics
						</Badge>
					</div>
				</div>
			</CardHeader>
			<Link href="/">
				<CardContent>
					<p className="line-clamp-5">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
						distinctio quibusdam deserunt, pariatur at dolorem. Officiis nobis
						modi cumque impedit sed architecto repudiandae possimus minus sint
						laboriosam numquam, earum veritatis quae molestias quibusdam
						sapiente illum. Neque libero eum omnis necessitatibus magnam
						laboriosam ipsum iusto nisi dignissimos tempore, quos, alias vero.
					</p>
				</CardContent>
			</Link>

			<CardFooter>
				<ul className="grid grid-cols-3 gap-4 w-full ">
					<li className="flex justify-center text-muted-foreground">
						<Button
							variant="ghost"
							size="sm"
							className="flex gap-2"
						>
							<Icons.message className="h-4 w-4" />
							<span>13</span>
							<span className="sr-only">Comments</span>
						</Button>
					</li>
					<li className="flex justify-center text-muted-foreground">
						<Button
							variant="ghost"
							size="sm"
							className="flex gap-2"
						>
							<Icons.repeat className="h-4 w-4" />
							<span>45</span>
							<span className="sr-only">Retweets</span>
						</Button>
					</li>
					<li className="flex justify-center text-muted-foreground">
						<Button
							variant="ghost"
							size="sm"
							className="flex gap-2"
						>
							<Icons.heart className="h-4 w-4" />
							<span>145</span>
							<span className="sr-only">Likes</span>
						</Button>
					</li>
				</ul>
			</CardFooter>
		</Card>
	)
}

export default Post
