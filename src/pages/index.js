import React from 'react'
import { withPrefix } from 'gatsby-link'

import { Grid, Cell, Carousel } from '../components'
import styled from 'styled-components'

const IndexPage = ({ data }) => {
  const { event, featuredProject } = data.allMarkdownRemark.edges[0].node.frontmatter
  const actions = data.actions.edges.map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug
  }))
  console.log(event)
  console.log(featuredProject)
  console.log(actions)
  return (
    <Grid>
      <Cell width={4} height={3}>
        <h2 style={{ fontSize: '27px', padding: '8px 30px 21px 21px' }}>
          hello we are city guerillas
      </h2>
      </Cell>

      <Cell width={13} height={6} top={1} left={1}>
        <Carousel autoplay>
          {actions && actions.map((action, i) =>
            <Action key={i} {...action} />
          )}
        </Carousel>
      </Cell>

      <Cell width={12} height={2} top={1} left={1} background={false}>
        <input type="search" placeholder="search" />
      </Cell>

      <Cell width={5} height={1} top={1} right={1} align="right">
        <h1 style={{ fontSize: '27px', padding: '2.5px 15px' }}>#</h1>
      </Cell>

      <Cell width={5} height={9} right={1} align="right">
        <div
          style={{
            width: '100%',
            padding: '15px 15px',
            textTransform: 'lowercase',
          }}
        >
          <a href="" style={{ marginRight: '5px', textDecoration: 'none' }}>
            savamala
        </a>
          <a href="" style={{ marginRight: '5px', textDecoration: 'none' }}>
            art
        </a>
          <a href="" style={{ marginRight: '5px', textDecoration: 'none' }}>
            books
        </a>
          <a href="" style={{ marginRight: '5px', textDecoration: 'none' }}>
            tags
        </a>
          <a href="" style={{ marginRight: '5px', textDecoration: 'none' }}>
            tags
        </a>
        </div>
      </Cell>

      <Cell width={7} height={5} top={1}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={`${featuredProject.images[0].image.replace('/static', '')}`}
          alt=""
        />
      </Cell>

      <Cell width={2} height={4} top={1} left={4}>
        <h2
          style={{
            fontSize: '24px',
            transform: 'translateX(-20%) translateY(75%) rotate(-90deg)',
            width: '142px',
            height: '70px',
          }}
        >
          we do what we like
      </h2>
      </Cell>

      <Cell width={6} height={9} top={0} left={5}>
        <div style={{ padding: '30px' }}>
          <h2 style={{ textAlign: 'center' }}>-</h2>
          <h2 style={{ textAlign: 'center' }}>{featuredProject.title}</h2>
          <p style={{ marginTop: '30px', textAlign: 'justify' }}>
            {featuredProject.description.split('.')[0].trim()}
          </p>
        </div>
      </Cell>

      <Cell width={5} height={4} top={1} left={2} clear>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src="https://scontent.fbeg4-1.fna.fbcdn.net/v/t31.0-8/18320636_1835661863360998_8386183770255603416_o.jpg?_nc_cat=0&oh=4a1c508177845f86828b4834400e7b4d&oe=5B7F7748"
          alt=""
        />
      </Cell>

      <Cell width={5} height={3} top={2} left={2}>
        <div style={{ textAlign: 'center', padding: '15px 15px' }}>
          <h3 style={{ fontWeight: '900', margin: '15px 0' }}>DACIDA</h3>
          <h4 style={{ fontWeight: '100', margin: '15px 0' }}>27.10.2017</h4>
        </div>
      </Cell>

      <Cell width={5} height={8} right={1} top={-3} align="right">
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src="http://cityguerilla.org/images/actions/01_City_Guerilla_Dacida_2017.jpg"
          alt=""
        />
      </Cell>
    </Grid>
  )
}
export default IndexPage


export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/home/"}}) {
      edges {
        node {
          frontmatter {
            event {
              eventName
              eventImage
            }
            featuredProject {
              title
              description
              images {
                image
              }
            }
          }
        }
      }
    }

    actions: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/action/"}}) {
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

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Overflow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: -100%;
  padding: 22.5px;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    left: 0;
    opacity: 1;
  }

  }
`
const Action = ({ title, description, images }) => (
  <Wrap>
    <Overflow>
      <h1>{title}</h1>
      <p>{description}</p>
    </Overflow>
    {console.log(images)}
    <img
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      //src={images[0].image}
      alt=""
    />
  </Wrap>
)
