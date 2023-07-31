'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import PostForm from './forms/post-form'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

const CreatePost = () => {
	const [open, setOpen] = useState(false)
	const { user } = useUser()

	const cancelPostHandler = () => {
		setOpen(false)
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
