import React from 'react'
import styled from 'styled-components'

const IndexPage = () => (
  <Grid>
    <Cell width={4} height={3}>
      <h2 style={{ fontSize: '27px', padding: '8px 30px 21px 21px' }}>
        hello we are city guerillas
      </h2>
    </Cell>
    <Cell width={13} height={6} top={1} left={1}>
      hoo
    </Cell>

    <Cell width={12} height={2} top={1} left={1}>
      hoo
    </Cell>

    <Cell width={5} height={10} top={1} right={1} align="right">
      hoo
    </Cell>

    <Cell width={7} height={5} top={1}>
      hss
    </Cell>

    <Cell width={2} height={4} top={1} left={4}>
      hss
    </Cell>

    <Cell width={6} height={9} top={0} left={5}>
      detal
    </Cell>

    <Cell width={5} height={4} top={1} left={2} clear>
      slika
    </Cell>

    <Cell width={5} height={3} top={2} left={2}>
      slika
    </Cell>

    <Cell width={5} height={8} right={1} top={-3} align="right">
      slika
    </Cell>
  </Grid>
)

export default IndexPage

const Grid = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`

const Cell = ({
  width,
  height,
  top,
  right,
  left,
  align = 'left',
  clear,
  children,
}) => (
  <div
    style={{
      width: `${45 * width}px`,
      height: `${45 * height}px`,
      marginTop: top && `${45 * top}px`,
      marginRight: right && `${45 * right}px`,
      marginLeft: left && `${45 * left}px`,
      float: align,
      clear: clear && 'both',
      padding: '1px',
    }}
  >
    <div style={{ width: '100%', height: '100%', background: 'white' }}>
      {children}
    </div>
  </div>
)
