import React from 'react'
import styled from 'styled-components'

const ActionsPage = ({ data }) => {
  const projects = data.allStrapiProjects.edges.map(v => ({ ...v.node }))

  return (
    <Grid>
      {projects &&
        projects.map(project => (
          <Cell width={6} height={6} top={1} left={2}>
            <Project {...project} />
          </Cell>
        ))}
    </Grid>
  )
}

export default ActionsPage

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Overflow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 11.25px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0;
  }
`
const Project = ({ title, description, photos }) => (
  <Wrap>
    <Overflow>
      <h1>{title}</h1>
      <p>{description && description.split('.')[0]}.</p>
    </Overflow>
    <img
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      src={`http://localhost:1337/${photos[0].url}`}
      alt=""
    />
  </Wrap>
)

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
      // padding: '1px'
      padding: '1px 0 0 1px',
    }}
  >
    <div style={{ width: '100%', height: '100%', background: 'white' }}>
      {children}
    </div>
  </div>
)

// export const query = graphql`
//   query ActionsQuery {
//     allStrapiProjects {
//       edges {
//         node {
//           id
//           title
//           description
//           photos{
//             url
//           }
//         }
//       }
//     }
//   }
// `
