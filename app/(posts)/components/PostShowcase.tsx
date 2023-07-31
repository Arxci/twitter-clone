import Post from '@/components/post'
import prismaDB from '@/lib/prisma'

const PostShowcase = async () => {
	const posts = await prismaDB.post.findMany({
		include: {
			retweets: true,
			likes: true,
			comments: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<div className=" flex flex-col gap-6">
			{posts && posts.map((post) => <Post post={post} />)}
		</div>
	)
}

export default PostShowcase
