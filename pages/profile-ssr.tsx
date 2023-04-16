import React from 'react'
import Layout from 'components/Layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

import { InferGetServerSidePropsType } from 'next'
import { User } from 'lib/user'

export default function SsrProfile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <h1>Profile Server-side Rendering (SSR)</h1>


      {user?.isLoggedIn && (

        <pre>{JSON.stringify(user, null, 2)}</pre>

      )}
    </Layout>
  )
}

///Récupération du user depuis le coté serveur
export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: {
          isLoggedIn: false,
          login: '',
          isAdmin: false,
        } as User,
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
},
  sessionOptions)
