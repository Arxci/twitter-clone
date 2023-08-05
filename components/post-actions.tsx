'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Post, Comment, Retweet, Like } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import LoadingSpinner from './ui/loading-spinner'
import { useToast } from './ui/use-toast'

interface PostActionsProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
	disableNavigate?: boolean
}

const PostActions: React.FC<PostActionsProps> = ({
	post,
	disableNavigate = false,
}) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user } = useUser()
	const { toast } = useToast()
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
	const formattedComments = post.comments?.map((comment) => {
		return {
			userId: comment.userId,
			username: comment.username,
			avatar: comment.avatar,
			message: comment.message,
		}
	})

	const didLike = formattedLikes.some((el) => el.userId === user?.id)
	const didRetweet = formattedRetweets.some((el) => el.userId === user?.id)

	const openCommentsHandler = (e: any) => {
		e.stopPropagation()
		e.preventDefault()

		if (!user) {
			router.push('sign-in')
			return
		}

		router.push(`/${post.id}`)
	}

	const updateRetweetsHandler = async (e: any) => {
		e.stopPropagation()
		e.preventDefault()

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
			comments: formattedComments,
		}

		try {
			setLoading(true)

			await axios.patch(`/api/posts/${post.id}`, data)

			if (didRetweet) {
				toast({
					description: 'Retweet removed!',
				})
			} else {
				toast({
					description: 'Post retweeted!',
				})
			}

			router.refresh()
		} catch (err) {
			toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		} finally {
			setLoading(false)
		}
	}

	const deletePostHandler = async (e: any) => {
		e.stopPropagation()
		e.preventDefault()

		try {
			setIsDeleting(true)
			setLoading(true)

			await axios.delete(`/api/posts/${post.id}`)

			toast({
				description: 'Post deleted!',
			})
			router.refresh()
			router.push('/')
		} catch (err) {
			toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		} finally {
			setIsDeleting(false)
			setLoading(false)
		}
	}

	const updateLikesHandler = async (e: any) => {
		e.stopPropagation()
		e.preventDefault()

		if (!user) {
			router.push('sign-in')
			return
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
			comments: formattedComments,
		}

		try {
			setLoading(true)

			await axios.patch(`/api/posts/${post.id}`, data)

			if (didLike) {
				toast({
					description: 'Like removed!',
				})
			} else {
				toast({
					description: 'Post liked!',
				})
			}

			router.refresh()
		} catch (err) {
			toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex gap-2 w-full">
			<div>
				{user?.id === post.userId && (
					<>
						<Button
							variant="destructive"
							onClick={deletePostHandler}
							disabled={loading}
							className="hidden sm:flex gap-2"
						>
							{isDeleting ? (
								<>
									<LoadingSpinner />
									Loading...
								</>
							) : (
								<>
									Delete
									<Icons.trash className="h-4 w-4" />
								</>
							)}
						</Button>
						<Button
							size="icon"
							variant="destructive"
							onClick={deletePostHandler}
							disabled={loading}
							className="sm:hidden"
						>
							<Icons.trash className="h-4 w-4" />
						</Button>
					</>
				)}
			</div>
			<ul className="grid grid-cols-3 gap-4 ml-auto ">
				<li className="flex justify-center text-muted-foreground">
					{!disableNavigate && (
						<Button
							variant="ghost"
							size="sm"
							className="flex gap-2 hover:bg-background/80"
							disabled={loading}
							onClick={openCommentsHandler}
						>
							<Icons.message className="h-4 w-4" />
							<span>{post.comments.length}</span>
							<span className="sr-only">Comments</span>
						</Button>
					)}
				</li>

				<li className="flex justify-center text-muted-foreground">
					<Button
						variant="ghost"
						disabled={loading}
						size="sm"
						className={cn(
							'flex gap-2  hover:bg-background/80',
							`${
								didRetweet
									? 'bg-blue-500  text-white hover:bg-blue-500/60'
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
						disabled={loading}
						size="sm"
						className={cn(
							'flex gap-2  hover:bg-background/80',
							`${
								didLike
									? 'bg-red-500 text-white hover:bg-red-500/60'
									: undefined
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
		</div>
	)
}

export default PostActions
