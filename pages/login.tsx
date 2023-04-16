import React, { useState } from 'react'
import useUser from 'lib/useUser'
import Layout from 'components/Layout'
import LoginForm from 'components/LoginForm'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/profile-sg',
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Layout>
      <div className="login">
        <LoginForm
          errorMessage={errorMsg}
          onSubmit={async function (data) {
            const login = data.login;
            const password = data.password;
            try {
              mutateUser(
                await fetchJson('/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ login, password }),
                })
              )
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message)
              } else {
                console.error('An unexpected error happened:', error)
              }
            }
          }}
        />
      </div>
    </Layout>
  )
}
