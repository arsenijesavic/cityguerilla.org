import React from 'react'
import styled from 'styled-components'

const AboutPage = ({ data }) => {

  return (
    <Grid>
    </Grid>
  )
}

export default AboutPage

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//         details
//       }
//     }
//   }
// `

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
