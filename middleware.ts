import { authMiddleware, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismaDB from './lib/prisma'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
	publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)', '/(.*)'],
	async afterAuth(auth, req) {
		if (auth.isPublicRoute) {
			//  For public routes, we don't need to do anything
			return NextResponse.next()
		}

		const url = new URL(req.nextUrl.origin)

		if (!auth.userId) {
			//  If user tries to access a private route without being authenticated,
			//  redirect them to the sign in page
			url.pathname = '/sign-in'
			return NextResponse.redirect(url)
		}
	},
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
}
