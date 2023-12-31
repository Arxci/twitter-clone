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

		const {
			title,
			message,
			tags,
			retweets,
			comments,
			likes,
			userId,
			username,
			avatar,
		} = body

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
				userId: userId,
				username: username,
				avatar: avatar,
				title: title || '',
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

		const formattedComments =
			comments.length > 0
				? [
						...comments.map(
							(comment: {
								userId: string
								username: string
								avatar: string
								message: string
							}) => comment
						),
				  ]
				: []

		const posts = await prismaDB.post.update({
			where: {
				id: postId,
			},
			data: {
				userId: userId,
				username: username,
				avatar: avatar,
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
						data: formattedComments,
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

export const DELETE = async (
	req: Request,
	{ params }: { params: { postId: string } }
) => {
	try {
		const user = await currentUser()

		if (!user) {
			return new NextResponse('User not signed in', { status: 401 })
		}

		const { postId } = params

		const post = await prismaDB.post.delete({
			where: {
				id: postId,
			},
		})

		return NextResponse.json(post)
	} catch (error) {
		console.log('[POST_DELETE]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
