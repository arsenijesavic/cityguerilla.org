import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from '../components'
import Link from 'gatsby-link'

const getRandomCell = () => {
  const options = {
    0: { width: 7, height: 8, top: 1 },
    1: { width: 8, height: 6, top: 2, left: 2 },
    2: { width: 11, height: 4, top: 3, left: 4, right: 1 }
  }
  const option = Math.floor(Math.random() * 3)

  return options[option]
}

const ActionsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges.map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug
  }))

  return (
    <Grid>
      {projects &&
        projects.map((project, i) => (
          <Cell key={i} {...getRandomCell()}>
            <Link style={{ display: 'block', width: '100%', height: '100%' }} to={project.url}>
              <Project {...project} />
            </Link>
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

  > div {
    &:hover {
      left: -200%;
      opacity: 0;
    }
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;


  }
`

const Overflow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  > h1 {
    font-size: 24px;
  }

  > p {
    margin: 5px 0;
    > span {
      background: black;
      color: white;
      padding: 5px;
      font-size: 0.707em;
      text-transform: uppercase;
    }
  }



`
const Project = ({ title, tags, images }) => (
  <Wrap>
    <Overflow>
      <h1>{title}</h1>
      <p>
        {tags && tags.slice(0, 8).map(tag => <span>{tag}</span>)}
      </p>
    </Overflow>
    <img
      src={images && images[0].image}
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
            tags
            images {
              image
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
