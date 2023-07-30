'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Post, Comment, Retweet, Like } from '@prisma/client'
import { cn } from '@/lib/utils'

interface PostActionsProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
	const { user } = useUser()
	const router = useRouter()

	const formattedRetweets = post.retweets?.map((retweet) => {
		return {
			userId: retweet.userId,
			username: retweet.username,
			avatar: retweet.avatar,
		}
	})
	const formattedLikes = post.likes?.map((like) => {
		return { userId: like.userId, username: like.username, avatar: like.avatar }
	})

	const didLike = formattedLikes.some((el) => el.userId === user?.id)
	const didRetweet = formattedRetweets.some((el) => el.userId === user?.id)

	const openCommentsHandler = () => {}

	const updateRetweetsHandler = async () => {
		if (!user) {
			router.push('sign-in')
			return
		}

		let updatedRetweets = []

		if (formattedRetweets.some((el) => el.userId === user?.id)) {
			updatedRetweets = [
				...formattedRetweets.filter((retweet) => retweet.userId !== user?.id),
			]
		} else {
			updatedRetweets = [
				...formattedRetweets,
				{ userId: user?.id, username: user?.username, avatar: user?.imageUrl },
			]
		}

		const data = {
			...post,
			likes: formattedLikes,
			retweets: updatedRetweets,
			comments: post.comments,
		}

		try {
			await axios.patch(`/api/posts/${post.id}`, data)

			router.refresh()
		} catch (err) {}
	}

	const updateLikesHandler = async () => {
		if (!user) {
			router.push('sign-in')
		}

		let updatedLikes = []

		if (formattedLikes.some((el) => el.userId === user?.id)) {
			updatedLikes = [
				...formattedLikes.filter((like) => like.userId !== user?.id),
			]
		} else {
			updatedLikes = [
				...formattedLikes,
				{ userId: user?.id, username: user?.username, avatar: user?.imageUrl },
			]
		}

		const data = {
			...post,
			likes: updatedLikes,
			retweets: formattedRetweets,
			comments: post.comments,
		}

		try {
			await axios.patch(`/api/posts/${post.id}`, data)

			router.refresh()
		} catch (err) {}
	}

	return (
		<ul className="grid grid-cols-3 gap-4 w-full ">
			<li className="flex justify-center text-muted-foreground">
				<Button
					variant="ghost"
					size="sm"
					className="flex gap-2"
					onClick={openCommentsHandler}
				>
					<Icons.message className="h-4 w-4" />
					<span>{post.comments.length}</span>
					<span className="sr-only">Comments</span>
				</Button>
			</li>
			<li className="flex justify-center text-muted-foreground">
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						'flex gap-2',
						`${
							didRetweet
								? 'bg-blue-500 text-white hover:bg-blue-500/60'
								: undefined
						}`
					)}
					onClick={updateRetweetsHandler}
				>
					<Icons.repeat className="h-4 w-4" />
					<span>{post.retweets.length}</span>
					<span className="sr-only">Retweets</span>
				</Button>
			</li>
			<li className="flex justify-center text-muted-foreground">
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						'flex gap-2',
						`${
							didLike ? 'bg-red-500 text-white hover:bg-red-500/60' : undefined
						}`
					)}
					onClick={updateLikesHandler}
				>
					<Icons.heart className="h-4 w-4" />
					<span>{post.likes.length}</span>
					<span className="sr-only">Likes</span>
				</Button>
			</li>
		</ul>
	)
}

export default PostActions
