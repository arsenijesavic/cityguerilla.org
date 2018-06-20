import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const FacebookIcon = () => (
  <Wrap>
    <a
      style={{ width: '100%', height: '100%', display: 'block' }}
      target="_tab"
      href="https://www.facebook.com/gradskagerila/"
    >
      <svg width="100%" height="100%" viewBox="0 0 430.113 430.114">
        <path
          fill="white"
          d="M158.081,83.3c0,10.839,0,59.218,0,59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805
c0,0,5.601-34.721,8.316-72.685c-7.784,0-67.784,0-67.784,0s0-42.127,0-49.511c0-7.4,9.717-17.354,19.321-17.354
c9.586,0,29.818,0,48.557,0c0-9.859,0-43.924,0-75.385c-25.016,0-53.476,0-66.021,0C155.878-0.004,158.081,72.48,158.081,83.3z"
        />
      </svg>
    </a>
  </Wrap>
)

export default FacebookIcon