import React from 'react'
import NextApp from 'next/app'

import { GlobalStyles } from '../components/GlobalStyles'

class Earthq extends NextApp {
  static async getInitialProps({ ctx }) {
    return {
      props: {
        ...ctx.query,
      },
    }
  }

  componentDidCatch(error, info) {
    console.log(this, error, info)
  }

  render() {
    const { Component, props } = this.props

    return (
      <>
        <GlobalStyles />
        <Component {...props} />
      </>
    )
  }
}

export default Earthq
