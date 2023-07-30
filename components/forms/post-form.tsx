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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import { ScrollArea } from '../ui/scroll-area'
import { useToast } from '../ui/use-toast'
import LoadingSpinner from '../ui/loading-spinner'

const formSchema = z.object({
	title: z.string().min(1).max(20),
	message: z.string().min(10).max(100),
	tags: z.string().optional(),
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

interface PostFormProps {
	onCancel: () => void
}

const PostForm: React.FC<PostFormProps> = ({ onCancel }) => {
	const [loading, setLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			message: '',
			tags: '',
		},
	})

	async function formSubmitHandler(data: z.infer<typeof formSchema>) {
		try {
			setLoading(true)

			await axios.post(`/api/posts`, data)

			toast({
				description: 'Your tweet has been posted',
			})
			router.refresh()
			onCancel()
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
				className="space-y-8  "
			>
				<ScrollArea className="h-[250px] md:h-auto flex flex-col">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										type="text"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="tags"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tags</FormLabel>
								<FormControl>
									<Input
										placeholder="Tags"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter your tags separated by a comma ex:
									(politics,entertainment)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Message"
										className="resize-none h-[100px]"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</ScrollArea>
				<div className="flex gap-6">
					<Button
						type="button"
						onClick={onCancel}
						variant="outline"
						className="w-full"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="blue"
						className="w-full"
						disabled={loading}
					>
						{loading ? (
							<div>
								<LoadingSpinner /> Loading...
							</div>
						) : (
							'Post'
						)}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default PostForm
