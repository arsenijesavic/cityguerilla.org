const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              tags
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const data = result.data.allMarkdownRemark.edges

      data.map(({ node }) => {
        const {
          id,
          fields: { slug },
          frontmatter: { templateKey },
        } = node

        createPage({
          path: slug,
          component: path.resolve(`./src/templates/${templateKey}.js`),
          context: { slug, id },
        })
      })

      let tags = []

      _.each(data, edge => {
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })

      tags = _.uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: path.resolve('src/templates/tag.js'),
          context: {
            tag,
          },
        })
      })
    })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
  const { createNodeField } = boundActionCreators

  getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node) {
        // featuredProject
        if (node.frontmatter.featuredProject) {
          const authorNode = getNodes().find(
            node2 =>
              node2.internal.type === 'MarkdownRemark' &&
              node2.frontmatter.name === node.frontmatter.featuredProject
          )

          node.frontmatter = {
            ...node.frontmatter,
            featuredProject: authorNode.frontmatter,
          }
        }
        // members
        if (node.frontmatter.members) {
          let members = []
          const membersNode = getNodes().find(node2 => {
            if (node2.frontmatter) {
              if (
                node2.internal.type === 'MarkdownRemark' &&
                node.frontmatter.members.includes(node2.frontmatter.name)
              )
                members.push({
                  ...node2.frontmatter,
                  url: node2.fields.slug,
                })
            }
          })

          node.frontmatter = {
            ...node.frontmatter,
            members,
          }
        }
        // mentors
        if (node.frontmatter.mentors) {
          let mentors = []
          const membersNode = getNodes().find(node2 => {
            if (node2.frontmatter) {
              if (
                node2.internal.type === 'MarkdownRemark' &&
                node.frontmatter.mentors.includes(node2.frontmatter.name)
              )
                mentors.push({
                  ...node2.frontmatter,
                  url: node2.fields.slug,
                })
            }
          })

          node.frontmatter = {
            ...node.frontmatter,
            mentors,
          }
        }
        // involved
        if (node.frontmatter.involved) {
          //
          node.frontmatter.involved = node.frontmatter.involved.map(v =>
            v.replace(/[0-9]{4}: /gim, '')
          )
          let involved = []
          const membersNode = getNodes().find(node2 => {
            if (node2.frontmatter) {
              if (
                node2.internal.type === 'MarkdownRemark' &&
                node2.frontmatter.name &&
                node.frontmatter.involved.includes(node2.frontmatter.name)
              )
                involved.push({
                  ...node2.frontmatter,
                  url: node2.fields.slug,
                })
            }
          })

          node.frontmatter = {
            ...node.frontmatter,
            involved,
          }
        }
        // actions for project page
        if (node.frontmatter.actions) {
          let actions = []

          getNodes().find(node2 => {
            if (node2.frontmatter) {
              if (
                node2.internal.type === 'MarkdownRemark' &&
                node.frontmatter.name &&
                node2.frontmatter.projects &&
                node2.frontmatter.projects.includes(node.frontmatter.name)
              )
                actions.push({
                  ...node2.frontmatter,
                  url: node2.fields.slug,
                })
            }
          })

          node.frontmatter = {
            ...node.frontmatter,
            actions,
          }


        }
        //projects
      }
    })
}
