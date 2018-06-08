import React from 'react'
import { Grid, Cell } from '../components'

const ActionPage = ({ data }) => {
  const action = { ...data.markdownRemark.frontmatter }
  console.log(action)
  return <Grid />
}

export default ActionPage

export const ActionQuery = graphql`
  query ActionBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        dateFrom
        dateTo
        type
        images {
          url
        }
      }
    }
  }
`