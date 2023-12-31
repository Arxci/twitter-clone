'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import PostForm from './forms/post-form'

import { useUser } from '@clerk/nextjs'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CreatePost = () => {
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
			<CardHeader className="flex flex-row items-center gap-2">
				<Avatar className=" h-10 w-10">
					<AvatarImage src={user?.imageUrl} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<p className="text-blue-500">@{user?.username}</p>
			</CardHeader>
			<CardContent>
				<PostForm onCancel={() => {}} />
			</CardContent>
		</Card>
	)
}

export default CreatePost
