import Head from 'next/head'
import Header from 'src/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>My app with iron</title>
      </Head>
      
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  )
}
