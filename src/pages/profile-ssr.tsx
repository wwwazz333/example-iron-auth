import React from 'react'
import Layout from 'src/components/Layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'src/lib/session'

import { InferGetServerSidePropsType } from 'next'
import { User } from 'src/lib/user'

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
  console.log('Rendering the Profile page');
  
  const user = req.session.user

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()

    const notLogedUser : User = {
      isLoggedIn: false,
      login: '',
      isAdmin: false,
    };
    return {
      props: {
        user: notLogedUser,
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
},
  sessionOptions)
