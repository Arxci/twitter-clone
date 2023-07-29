import { cn } from '@/lib/utils'

interface ContainerProps {
	className?: string
	children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
	return (
		<div className={cn(className, 'px-4 lg:px-6 container')}>{children}</div>
	)
}

export default Container
