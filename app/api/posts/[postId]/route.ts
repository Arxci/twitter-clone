import prismaDB from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const PATCH = async (
	req: Request,
	{ params }: { params: { postId: string } }
) => {
	try {
		const user = await currentUser()

		if (!user) {
			return new NextResponse('User not signed in', { status: 401 })
		}

		const body = await req.json()

		const { postId } = params

		const { title, message, tags, retweets, comments, likes } = body

		if (!title && title?.length < 1) {
			return new NextResponse('Please enter a valid title', { status: 401 })
		}

		if (!message && message?.length < 10) {
			return new NextResponse('Please enter a valid message', { status: 401 })
		}

		if (!retweets && retweets.length > 0) {
			return new NextResponse('Please enter valid retweet data', {
				status: 401,
			})
		}

		if (!comments && comments.length > 0) {
			return new NextResponse('Please enter valid comment data', {
				status: 401,
			})
		}

		if (!likes && likes.length > 0) {
			return new NextResponse('Please enter valid like data', { status: 401 })
		}

		await prismaDB.post.update({
			where: {
				id: postId,
			},
			data: {
				userId: user.id,
				username: user.username || '',
				avatar: user.imageUrl || '',
				title,
				tags,
				message,
				retweets: {
					deleteMany: {},
				},
				likes: {
					deleteMany: {},
				},
				comments: {
					deleteMany: {},
				},
			},
		})

		const formattedRetweets =
			retweets.length > 0
				? [
						...retweets.map(
							(retweet: { userId: string; username: string; avatar: string }) =>
								retweet
						),
				  ]
				: []
		const formattedLikes =
			likes.length > 0
				? [
						...likes.map(
							(like: { userId: string; username: string; avatar: string }) =>
								like
						),
				  ]
				: []

		const posts = await prismaDB.post.update({
			where: {
				id: postId,
			},
			data: {
				userId: user.id,
				username: user.username || '',
				avatar: user.imageUrl || '',
				title,
				tags,
				message,
				retweets: {
					createMany: {
						data: formattedRetweets,
					},
				},
				likes: {
					createMany: {
						data: formattedLikes,
					},
				},
				comments: {
					createMany: {
						data: [
							...comments.map(
								(comment: {
									userId: string
									username: string
									avatar: string
									message: string
								}) => comment
							),
						],
					},
				},
			},
		})

		return NextResponse.json(posts)
	} catch (error) {
		console.log('[POST_PATCH]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
