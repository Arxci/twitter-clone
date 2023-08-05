'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import CommentForm from './forms/comment-form'
import { Post, Retweet, Like, Comment } from '@prisma/client'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

interface CreateCommentProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
}

const CreateComment: React.FC<CreateCommentProps> = ({ post }) => {
	const { user } = useUser()

	if (!user) {
		return (
			<Card className="">
				<CardHeader className="flex flex-row items-center gap-2 justify-between">
					<CardTitle>Welcome to Tweeter</CardTitle>
					<Link
						href="/sign-up"
						className={cn(buttonVariants({ variant: 'blue' }), 'rounded-full')}
					>
						Sign Up
					</Link>
				</CardHeader>
			</Card>
		)
	}

	return (
		<Card className="">
			<CardContent className=" pt-6">
				<CommentForm post={post} />
			</CardContent>
		</Card>
	)
}

export default CreateComment
