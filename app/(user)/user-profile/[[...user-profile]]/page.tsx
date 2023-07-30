'use client'

import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { type Theme } from '@clerk/types'

const appearance: Theme = {
	baseTheme: undefined,

	variables: {
		borderRadius: undefined,
	},
	elements: {
		card: {
			boxShadow: 'none',
		},
		pageScrollBox: {
			padding: '1rem',
		},
	},
}

const Profile = () => {
	const { theme } = useTheme()

	const darkTheme = theme === 'dark' ? true : false

	return (
		<UserProfile
			path="/user-profile"
			routing="path"
			appearance={{
				...appearance,
				baseTheme: darkTheme ? dark : appearance.baseTheme,
				variables: {
					...appearance.variables,
					colorBackground: darkTheme
						? 'hsl(0 0% 3.9%)'
						: appearance.variables?.colorBackground,
				},
			}}
		/>
	)
}

export default Profile
