'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { User } from '@clerk/nextjs/server'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Icons } from './ui/icons'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { Comment, Like, Post, Retweet } from '@prisma/client'
import { useUser } from '@clerk/nextjs'
import PostActions from './post-actions'

interface PostProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
}

const Post: React.FC<PostProps> = ({ post }) => {
	const [mounted, setMounted] = useState(false)
	const { user } = useUser()
	const tags = post.tags.split(',')

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<div className="flex flex-col gap-2 text-muted-foreground text-sm">
					<div className="flex items-center h-10">
						<Avatar className="mr-2 h-6 w-6">
							<AvatarImage src={post.avatar} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span>{post.username}</span>
						<Icons.dot className="h-4 w-4" />
						<span>{format(post.createdAt, 'MMM dd').toUpperCase()}</span>

						{post.userId != user?.id && (
							<>
								<Icons.dot className="h-4  w-4 hidden md:block" />
								<Button className="text-blue-500 hidden md:block p-0 bg-transparent hover:bg-transparent">
									Follow
								</Button>
							</>
						)}
					</div>
					<div className="flex items-center gap-2">
						{tags &&
							tags.map((tag) => (
								<Badge
									key={tag}
									variant="outline"
									className="text-muted-foreground"
								>
									#{tag}
								</Badge>
							))}
					</div>
				</div>
			</CardHeader>
			<Link href="/">
				<CardContent>
					<p className="line-clamp-5">{post.message}</p>
				</CardContent>
			</Link>

			<CardFooter>
				<PostActions post={post} />
			</CardFooter>
		</Card>
	)
}

export default Post
