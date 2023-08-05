import Comment from '@/components/comment'
import { Comment as CommentType } from '@prisma/client'

interface CommentsShowcaseProps {
	comments: CommentType[]
}

const CommentsShowcase: React.FC<CommentsShowcaseProps> = ({ comments }) => {
	return (
		<div className=" flex flex-col gap-6">
			{comments &&
				comments.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
					/>
				))}
		</div>
	)
}

export default CommentsShowcase
