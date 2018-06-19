import React from 'react'
import { navigateTo } from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import { Grid, Cell } from '../components'
import { TagCloud } from "react-tagcloud"


const TagCloudPage = ({ data }) => {
  const tags = data.allMarkdownRemark.group
    .map(v => ({ ...v }))
    .filter(v => v.fieldValue !== '')

  return (
    <Grid>
      <Cell width={18} top={1} left={1}>
        <div style={{ padding: '15px 30px', width: '100%' }}>

          <TagCloud
            minSize={12}
            maxSize={35}
            disableRandomColor={true}
            tags={tags && tags.map(v => ({ value: v.fieldValue, count: v.totalCount }))}
            onClick={tag => navigateTo(`tags/${kebabCase(tag.value)}`)}
          />
          {/* {tags &&
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
            ))} */}

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
