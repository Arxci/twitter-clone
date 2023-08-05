'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from './ui/icons'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import Link from 'next/link'
import { Comment } from '@prisma/client'
import { useUser } from '@clerk/nextjs'

interface CommentProps {
	comment: Comment
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	const [mounted, setMounted] = useState(false)
	const { user } = useUser()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col gap-2 text-muted-foreground text-sm">
					<div className="flex items-center h-10">
						<Avatar className="mr-2 h-6 w-6">
							<AvatarImage src={comment.avatar} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Link
							href="/"
							className="text-blue-500 hover:text-foreground"
						>
							@{comment.username}
						</Link>
						<Icons.dot className="h-4 w-4" />
						<span>{format(comment.createdAt, 'MMM dd')}</span>

						{comment.userId != user?.id && (
							<>
								<Icons.dot className="h-4  w-4 hidden md:block" />
								<Button className="text-blue-500 hidden md:block p-0 bg-transparent hover:bg-transparent">
									Follow
								</Button>
							</>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<p className="line-clamp-5">{comment.message}</p>
			</CardContent>

			<CardFooter></CardFooter>
		</Card>
	)
}

export default Comment
