'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'
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

const CreatePost = () => {
	const [open, setOpen] = useState(false)

	const cancelPostHandler = () => {
		setOpen(false)
	}

	return (
		<Card>
			<CardContent className="flex-col text-center md:flex-row pt-6 w-full md:items-center flex gap-2 justify-between">
				<CardTitle> Share your thoughts?</CardTitle>
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
			</CardContent>
		</Card>
	)
}

export default CreatePost
