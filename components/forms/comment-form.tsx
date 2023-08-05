'use client'

import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'

import { useToast } from '../ui/use-toast'
import LoadingSpinner from '../ui/loading-spinner'
import { Input } from '../ui/input'
import { useUser } from '@clerk/nextjs'
import { Like, Post, Retweet, Comment } from '@prisma/client'

const formSchema = z.object({
	message: z.string().min(1).max(400),
})

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (issue.code === z.ZodIssueCode.too_small) {
		return {
			message: `Please enter at least ${issue.minimum} character${
				issue.minimum > 1 ? 's' : ''
			}`,
		}
	}
	return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

interface CommentFormProps {
	post: Post & { retweets: Retweet[]; likes: Like[]; comments: Comment[] }
}

const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
	const [loading, setLoading] = useState(false)
	const { toast } = useToast()
	const { user } = useUser()

	const formattedComments = post.comments?.map((comment) => {
		return {
			userId: comment.userId,
			username: comment.username,
			avatar: comment.avatar,
			message: comment.message,
		}
	})
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

	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: '',
		},
	})

	async function formSubmitHandler(data: z.infer<typeof formSchema>) {
		if (!user) {
			router.push('sign-in')
			return
		}

		const updatedComments = [
			...formattedComments,
			{
				userId: user.id,
				username: user.username,
				avatar: user.imageUrl,
				message: data.message,
			},
		]

		const formattedData = {
			...post,
			comments: updatedComments,
			retweets: formattedRetweets,
			likes: formattedLikes,
		}

		try {
			setLoading(true)

			await axios.patch(`/api/posts/${post.id}`, formattedData)

			toast({
				description: 'Comment posted!',
			})

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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(formSubmitHandler)}
				className="flex  w-full flex-col gap-4"
			>
				<div className="w-full">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Comment"
										className="w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					variant="blue"
					className="ml-auto rounded-full"
					disabled={loading}
				>
					{loading ? (
						<div>
							<LoadingSpinner /> Loading...
						</div>
					) : (
						'Comment'
					)}
				</Button>
			</form>
		</Form>
	)
}

export default CommentForm
