import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from '../components'
import Link from 'gatsby-link'



const CreativeBoardPage = ({ data }) => {
  // const projects = data.allMarkdownRemark.edges.map(v => ({
  //   ...v.node.frontmatter,
  //   url: v.node.fields.slug,
  // }))

  return (
    <Grid>

    </Grid>
  )
}

export default CreativeBoardPage



// export const query = graphql`
//   query ActionsQuery {
//     allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/board/" } }) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             name
//             tags
//             images {
//               image
//             }
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `
