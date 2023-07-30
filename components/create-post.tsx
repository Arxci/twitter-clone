'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import PostForm from './forms/post-form'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CreatePost = () => {
	const [open, setOpen] = useState(false)
	const { user } = useUser()

	const cancelPostHandler = () => {
		setOpen(false)
	}

	return (
		<Card>
			<CardContent className="text-center flex-row pt-6 w-full items-center flex gap-2 justify-between">
				<CardTitle className="text-sm sm:text-xl md:text-2xl">
					{' '}
					Share your thoughts?
				</CardTitle>
				{user && (
					<Dialog
						open={open}
						onOpenChange={setOpen}
					>
						<DialogTrigger asChild>
							<Button variant="blue">Tweet</Button>
						</DialogTrigger>
						<DialogContent className="sm:min-w-[600px] ">
							<DialogHeader>
								<DialogTitle>Post a Tweet</DialogTitle>
								<DialogDescription>
									Let everyone know what you're thinking
								</DialogDescription>
							</DialogHeader>

							<PostForm onCancel={cancelPostHandler} />
						</DialogContent>
					</Dialog>
				)}
				{!user && (
					<Link
						href="sign-in"
						className={cn(buttonVariants({ variant: 'blue' }))}
					>
						Sign In
					</Link>
				)}
			</CardContent>
		</Card>
	)
}

export default CreatePost
