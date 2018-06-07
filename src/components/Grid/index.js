import styled from 'styled-components'

const Grid = styled.div`

  &::after {
    content: '';
    clear: both;
    display: table;
  }
`

export default Grid
