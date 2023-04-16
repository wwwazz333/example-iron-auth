import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'src/lib/session'
import { User } from 'src/lib/user'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { login, password } = await req.body

	//TODO : check if user is allowed to login

	try {
		const user: User = {
			isLoggedIn: true,
			login: login,
			isAdmin: true
		}

		req.session.user = user
		await req.session.save()
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: (error as Error).message })
	}
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
