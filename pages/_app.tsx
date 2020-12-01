import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { FC } from 'react'

import { GlobalStyles } from '../components/GlobalStyles'

const EarthquakeApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default EarthquakeApp
