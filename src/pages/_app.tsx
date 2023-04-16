import { AppProps } from 'next/app'
import fetchJson from 'src/lib/fetchJson'
import { SWRConfig } from 'swr'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
