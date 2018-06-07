import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from '../components'

const ActionsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges.map(v => ({ ...v.node.frontmatter }))

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
const Project = ({ title, description, images }) => (
  <Wrap>
    <Overflow>
      <h1>{title}</h1>
      <p>{description && description.split('.')[0]}.</p>
    </Overflow>
    <img
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      src={images[0].url}
      alt=""
    />
  </Wrap>
)


export const query = graphql`
  query ActionsQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/action/" } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            images {
              url
            }
          }
          excerpt
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query ActionsQuery {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] },
//       filter: { frontmatter: { templateKey: { eq: "action" } }}
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 400)
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//           }
//         }
//       }
//     }
//   }
// `