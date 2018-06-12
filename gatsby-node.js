const fs = require('fs')
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

      result.data.allMarkdownRemark.edges.map(({ node }) => {
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

      // const posts = result.data.allMarkdownRemark.edges

      // posts.forEach(edge => {
      //   const id = edge.node.id

      //   createPage({
      //     path: edge.node.fields.slug,
      //     slug: edge.node.fields.slug
      //     //tags: edge.node.frontmatter.tags,
      //     component: path.resolve(
      //       `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      //     ),
      //     // additional data can be passed via context
      //     context: {
      //       id,
      //     },
      //   })
      // })

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      // posts.forEach(edge => {
      // if (_.get(edge, `node.frontmatter.tags`)) {
      //   tags = tags.concat(edge.node.frontmatter.tags)
      // }
      // })
      // Eliminate duplicate tags
      // tags = _.uniq(tags)

      // // Make tag pages
      // tags.forEach(tag => {
      //   const tagPath = `/tags/${_.kebabCase(tag)}/`

      //   createPage({
      //     path: tagPath,
      //     component: path.resolve(`src/templates/tags.js`),
      //     context: {
      //       tag,
      //     },
      //   })
      // })
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

  // const { frontmatter } = node
  // if (frontmatter) {
  //     const { images } = frontmatter
  //     if (images) {
  //         images.forEach((image, i) => {
  //             if (image.image) {
  //                 console.log(images[i])
  //                 //if (image.image.indexOf('/img') === 0)
  //                 images[i].image = path.relative(
  //                     path.dirname(node.fileAbsolutePath),
  //                     path.join(__dirname, '/static/', image.image)
  //                 )

  //             }

  //         })

  //     }
  // }
}

exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
  const { createNodeField } = boundActionCreators


  getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node) {



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
      }
    })
}
