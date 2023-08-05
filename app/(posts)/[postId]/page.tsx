import prismaDB from '@/lib/prisma'

import Post from '@/components/post'

import CreateComment from '@/components/create-comment'
import CommentsShowcase from './components/comments-showcase'

const PostPage = async ({ params }: { params: { postId: string } }) => {
	const { postId } = params

	const fetchedPost = await prismaDB.post.findFirst({
		include: {
			retweets: true,
			likes: true,
			comments: true,
		},
		where: {
			id: postId,
		},
	})

	if (!fetchedPost) {
		return null
	}

	return (
		<div className="flex flex-col gap-6">
			<Post
				key={fetchedPost.id}
				post={fetchedPost}
				disableNavigate={true}
			/>
			<CreateComment post={fetchedPost} />
			<CommentsShowcase comments={fetchedPost.comments} />
		</div>
	)
}

export default PostPage
