import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dashoffset: var(--LoadingSpinner-offset);
  }

  50% {
    stroke-dashoffset: calc(var(--LoadingSpinner-offset) / 4);
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: var(--LoadingSpinner-offset);
    transform: rotate(450deg);
  }
`

const LoadingSpinnerSvg = styled.svg`
  --LoadingSpinner-animationDuration: 1.4s;
  --LoadingSpinner-offset: 187;

  position: relative;
  width: 1em;
  height: 1em;
  color: var(--color-primary);
  animation: ${rotator} var(--LoadingSpinner-animationDuration) linear infinite;
`

const LoadingSpinnerCircle = styled.circle`
  stroke-dasharray: var(--LoadingSpinner-offset);
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: currentcolor;
  animation: ${dash} var(--LoadingSpinner-animationDuration) ease-in-out
    infinite;
`

const LoadingSpinner = () => (
  <LoadingSpinnerSvg
    width="65px"
    height="65px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMid meet"
  >
    <LoadingSpinnerCircle
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </LoadingSpinnerSvg>
)

export default LoadingSpinner
