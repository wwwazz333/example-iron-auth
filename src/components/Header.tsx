import Link from 'next/link'
import useUser from 'src/lib/useUser'
import { useRouter } from 'next/router'
import Image from 'next/image'
import fetchJson from 'src/lib/fetchJson'

export function LoginButton(){
  
}



export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login" legacyBehavior>
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <>
              <li>
                <Link href="/profile-sg" legacyBehavior>
                  <a>
                    Profile (SG)
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-ssr" legacyBehavior>
                  <a>Profile (SSR)</a>
                </Link>
              </li>
              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(
                      await fetchJson('/api/logout', { method: 'POST' }),
                      false
                    )
                    router.push('/login')
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
