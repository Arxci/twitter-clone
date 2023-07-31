'use client'

import { useRef, useState } from 'react'
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

const formSchema = z.object({
	message: z.string().min(10).max(400),
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
	const ref = useRef<HTMLDivElement>()

	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
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

			if (ref.current) {
				ref.current.innerText = ''
			}

			form.setValue('message', '')
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
				className="flex  w-full flex-col gap-4"
			>
				<div className="w-full">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div
										role="textbox"
										// @ts-ignore
										ref={ref}
										content={field.value}
										contentEditable
										className="block w-full resize-none min-h-8 border-b max-h-[100px] outline-none overflow-hidden empty:before:content-['Whats_happening!?']"
										onInput={(e: any) => {
											field.onChange(e.target.innerText)
										}}
									></div>
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
						'Tweet'
					)}
				</Button>
			</form>
		</Form>
	)
}

export default PostForm

/**<textarea
										placeholder="Whats Happening!?"
										className="resize-none text-lg w-full placeholder:text-lg placeholder:text-black p-0  h-8 rounded-none border-b outline-none"
									/> */
