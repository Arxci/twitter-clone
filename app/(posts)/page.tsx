import Container from '@/components/ui/container'

import PostShowcase from './components/PostShowcase'
import FriendsShowcase from './components/FriendsShowcase'
import CreatePost from '@/components/create-post'

export default function Home() {
	return (
		<div className="py-6">
			<Container>
				<div className="grid gird-cols-1 lg:grid-cols-7 gap-6">
					<div className="col-span-2 hidden lg:block">
						<FriendsShowcase />
					</div>

					<div className="lg:col-span-3 flex flex-col gap-6">
						<CreatePost />
						<PostShowcase />
					</div>
					<div className="col-span-2 hidden lg:block">Right</div>
				</div>
			</Container>
		</div>
	)
}
