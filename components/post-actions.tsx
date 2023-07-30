'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Post, Comment, Retweet, Like } from '@prisma/client'

interface PostActionsProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
	const { user } = useUser()
	const router = useRouter()

	const formattedRetweets = post.retweets?.map((_) => {
		return { userId: post.userId, username: post.username, avatar: post.avatar }
	})
	const formattedLikes = post.likes?.map((_) => {
		return { userId: post.userId, username: post.username, avatar: post.avatar }
	})

	const openCommentsHandler = () => {}

	const updateRetweetsHandler = async () => {
		if (!user) {
			router.push('sign-in')
		}

		let updatedRetweets = []
		const newRetweets: { userId: string; username: string; avatar: string }[] =
			[...formattedRetweets]

		if (newRetweets.some((el) => el.userId === user?.id)) {
			updatedRetweets = [
				...newRetweets.filter((retweet) => retweet.userId !== user?.id),
			]
		} else {
			updatedRetweets = [
				...newRetweets,
				{ userId: post.userId, username: post.username, avatar: post.avatar },
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
		const newLikes: { userId: string; username: string; avatar: string }[] = [
			...formattedLikes,
		]

		if (newLikes.some((el) => el.userId === user?.id)) {
			updatedLikes = [...newLikes.filter((like) => like.userId !== user?.id)]
		} else {
			updatedLikes = [
				...newLikes,
				{ userId: post.userId, username: post.username, avatar: post.avatar },
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
					className="flex gap-2"
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
					className="flex gap-2"
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
