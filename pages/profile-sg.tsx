import React from 'react'
import Layout from 'components/Layout'
import useUser from 'lib/useUser'


export default function SgProfile() {
  console.log('Rendering the Profile page');
  
  const { user } = useUser({
    redirectTo: '/login',
  })

  return (
    <Layout>
      <h1>Profile Static Generation (SG)</h1>
      {user && (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </Layout>
  )
}
