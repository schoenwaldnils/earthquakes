import React from 'react'
import { GlobalStyles } from '../components/GlobalStyles'

const EarthquakeApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default EarthquakeApp
