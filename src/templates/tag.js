import React from 'react'
import Link from 'gatsby-link'
import moment from 'moment'
import styled from 'styled-components'
import { Grid, Cell } from '../components'
import kebabCase from 'lodash/kebabCase'

const TagPage = ({ data }) => {
  const all = [...data.allMarkdownRemark.edges].map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug,
  }))

  const tags = data.tags.group
    .map(v => ({ ...v }))
    .filter(v => v.fieldValue !== '')
    .filter(v => v.totalCount > 10)

  const actions = all.filter(v => v.url.indexOf('action') > -1)
  const projects = all.filter(v => v.url.indexOf('project') > -1)
  const members = all.filter(v => v.url.indexOf('member') > -1)

  return (
    <Grid>
      <Cell width={18} top={1} left={1} animation={false}>
        <div style={{ padding: '15px 30px', width: '100%' }}>
          {tags &&
            tags.map((tag, i) => (
              <Link
                key={i}
                style={{ marginRight: '5px', display: 'inline-block' }}
                to={`/tags/${kebabCase(tag.fieldValue)}`}
              >
                <p style={{ fontSize: '0.707em', textTransform: 'uppercase' }}>
                  {tag.fieldValue.trim()}
                </p>
              </Link>
            ))}
        </div>
      </Cell>

      <Cell width={8} top={2} left={1}>
        <CellTitle>Actions</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          {actions &&
            actions
              .sort((a, b) => new Date(a.from) - new Date(b.from))
              .map((project, i) => (
                <Link
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  to={project.url}
                >
                  <p
                    style={{
                      margin: '7.5px 0',
                      whiteSpace: 'nowrap',
                      width: '19em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {moment(project.from, 'YYYY').year()}: {project.name}
                  </p>
                </Link>
              ))}
        </div>
      </Cell>

      <Cell width={8} top={2} left={1}>
        <CellTitle>Projects</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          {projects &&
            projects
              .sort((a, b) => new Date(a.from) - new Date(b.from))
              .map((project, i) => (
                <Link
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  to={project.url}
                >
                  <p
                    style={{
                      margin: '7.5px 0',
                      whiteSpace: 'nowrap',
                      width: '19em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {moment(project.from, 'YYYY').year()}: {project.name}
                  </p>
                </Link>
              ))}
        </div>
      </Cell>

      <Cell width={18} top={2} left={1}>
        <CellTitle>Members</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          {members &&
            members.map((member, i) => (
              <Link
                style={{ display: 'block', width: '100%', height: '100%' }}
                to={member.url}
              >
                <p
                  style={{
                    margin: '7.5px 0',
                    whiteSpace: 'nowrap',
                    width: '19em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {member.name}
                </p>
              </Link>
            ))}
        </div>
      </Cell>
    </Grid>
  )
}

export default TagPage

export const query = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            from
            images {
              image
            }
          }
        }
      }
    }

    tags: allMarkdownRemark(
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

const CellTitle = styled.p`
  width: ${props => (props.width ? `${props.width * 45}px` : '180px')};
  height: 45px;
  background: black;
  color: white;
  font-size: 20px;
  font-weight: 100;
  text-transform: lowercase;
  padding: 8px 15px;
`
