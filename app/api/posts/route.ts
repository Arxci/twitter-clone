import prismaDB from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const user = await currentUser()

		if (!user) {
			return new NextResponse('User not signed in', { status: 401 })
		}

		const body = await req.json()

		const { title, message, tags } = body

		if (!title && title?.length < 1) {
			return new NextResponse('Please enter a valid title', { status: 401 })
		}

		if (!message && message?.length < 10) {
			return new NextResponse('Please enter a valid message', { status: 401 })
		}

		const posts = await prismaDB.post.create({
			data: {
				userId: user.id,
				username: user.username || '',
				avatar: user.imageUrl || '',
				title,
				tags,
				message,
			},
		})

		return NextResponse.json(posts)
	} catch (error) {
		console.log('[POSTS_POST]', error)
		return new NextResponse('Failed to create post', { status: 500 })
	}
}
