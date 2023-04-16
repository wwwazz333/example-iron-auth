import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { User } from 'lib/user'
import { NextApiRequest, NextApiResponse } from 'next'



async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      isAdmin: false,
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
