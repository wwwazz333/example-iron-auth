import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'src/lib/session'
import { User } from 'src/lib/user'
import { NextApiRequest, NextApiResponse } from 'next'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json({ isLoggedIn: false, login: '', isAdmin: false })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
