import Container from '@/components/ui/container'

import PostShowcase from './components/PostShowcase'
import FriendsShowcase from './components/FriendsShowcase'

export default function Home() {
	return (
		<div className="py-6">
			<Container>
				<div className="grid grid-cols-7 gap-6">
					<FriendsShowcase />
					<div className="col-span-3">
						<PostShowcase />
					</div>
					<div className="col-span-2 ">Right</div>
				</div>
			</Container>
		</div>
	)
}
