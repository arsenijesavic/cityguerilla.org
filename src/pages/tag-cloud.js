import React from 'react'
import Link from 'gatsby-link'
import { Grid, Cell } from '../components'
import kebabCase from 'lodash/kebabCase'

const TagCloudPage = ({ data }) => {
  const tags = data.allMarkdownRemark.group
    .map(v => ({ ...v }))
    .filter(v => v.fieldValue !== '')

  return (
    <Grid>
      <Cell width={18} top={1} left={1}>
        <div style={{ padding: '15px 30px', width: '100%' }}>
          {tags &&
            tags.map((tag, i) => (
              <Link
                key={i}
                style={{ marginRight: '5px', display: 'inline-block' }}
                to={`tags/${kebabCase(tag.fieldValue)}`}
              >
                <p style={{ fontSize: '0.707em', textTransform: 'uppercase' }}>
                  {tag.fieldValue.trim()}
                </p>
              </Link>
            ))}
        </div>
      </Cell>
    </Grid>
  )
}

export default TagCloudPage

export const query = graphql`
  query TagsQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { tags: { ne: "" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
