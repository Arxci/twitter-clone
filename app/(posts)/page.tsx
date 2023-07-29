import PostShowcase from './components/PostShowcase'

import CreatePost from '@/components/create-post'

export default function Home() {
	return (
		<div className="flex flex-col gap-6">
			<CreatePost />
			<PostShowcase />
		</div>
	)
}
