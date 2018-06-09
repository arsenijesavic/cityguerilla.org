import React from 'react'
import { Grid, Cell } from '../components'

const AboutPage = ({ data }) => {
  return <Grid />
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
