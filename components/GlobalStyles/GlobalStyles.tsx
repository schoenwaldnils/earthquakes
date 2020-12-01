import { css, Global } from '@emotion/react'
import React, { FC } from 'react'

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    font-size: 16px;
    -webkt-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

/* stylelint-disable */
export const GlobalStyles: FC = () => <Global styles={globalStyles} />
