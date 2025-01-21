'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const onSignOutAction = async () => {
	;(await cookies()).delete('accessToken')

	redirect('/login')
}
