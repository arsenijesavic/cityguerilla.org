import React from 'react'
import Link from 'gatsby-link'
import { Grid, Cell, Carousel } from '../components'
import styled from 'styled-components'
import searchIcon from '../assets/svg/Search-icon.svg'
import kebabCase from 'lodash/kebabCase'
import { navigateTo } from 'gatsby-link'

const IndexPage = ({ data }) => {
  const {
    event,
    featuredProject,
  } = data.allMarkdownRemark.edges[0].node.frontmatter

  const actions = data.actions.edges.map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug,
  }))

  const tags = data.tags.edges
    .map(v => v.node.frontmatter.tags)
    .reduce((acc, val) => acc.concat(val))
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 26)

  return (
    <Grid>
      <Cell width={4} height={3}>
        <h2 style={{ fontSize: '27px', padding: '8px 30px 21px 21px' }}>
          hello we are city guerillas
        </h2>
      </Cell>

      <Cell width={13} height={6} top={1} left={1}>
        <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
          <Carousel autoplay>
            {actions &&
              actions.map((action, i) => <Action key={i} {...action} />)}
          </Carousel>
        </div>
      </Cell>

      <Cell width={12} height={2} top={1} left={1} background={false}>
        <InputBar />
      </Cell>

      <Cell width={5} height={1} top={1} right={1} align="right">
        <h1 style={{ fontSize: '27px', padding: '2.5px 15px' }}>#</h1>
      </Cell>

      <Cell width={5} height={9} right={1} align="right">
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            padding: '15px 15px',
            textTransform: 'lowercase',
          }}
        >
          {tags &&
            tags.map((tag, i) => (
              <Link
                key={i}
                to={`tags/${kebabCase(tag)}`}
                style={{ marginRight: '5px' }}
              >
                {tag}
              </Link>
            ))}
        </div>
      </Cell>

      <Cell width={7} height={5} top={1} index="999">
        <ImageWithZoom
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
        <FeaturedProject>
          <img
            style={{
              position: 'absolute',
              width: '235px',
              left: '33px',
              top: '-5px',
            }}
            src="img/detail-1.png"
            alt=""
          />
          <h2 style={{ textAlign: 'center' }}>-</h2>
          <Link
            to={`/projects/${kebabCase(featuredProject.name)}`}
            style={{ position: 'relative' }}
          >
            <h2 style={{ textAlign: 'center' }}>{featuredProject.name}</h2>
          </Link>
          <p style={{ marginTop: '30px', textAlign: 'justify' }}>
            {featuredProject.description.split('.')[0].trim()}
          </p>
        </FeaturedProject>
      </Cell>

      <Cell width={5} height={4} top={1} left={2} clear>
        <ImageWithZoom
          src="https://scontent.fbeg4-1.fna.fbcdn.net/v/t31.0-8/18320636_1835661863360998_8386183770255603416_o.jpg?_nc_cat=0&oh=4a1c508177845f86828b4834400e7b4d&oe=5B7F7748"
          alt=""
        />
      </Cell>

      <Cell width={5} height={3} top={2} left={2}>
        <div
          style={{
            textAlign: 'center',
            padding: '15px 15px',
            position: 'relative',
          }}
        >
          <img
            style={{
              position: 'absolute',
              zIndex: '900',
              width: '190px',
              left: '15px',
              top: '-20px',
              transform: 'rotate(10deg)',
            }}
            src="img/detail-3.png"
            alt=""
          />
          <h3 style={{ fontWeight: '900', margin: '15px 0' }}>DACIDA</h3>
          <h4 style={{ fontWeight: '100', margin: '15px 0' }}>27.10.2017</h4>
        </div>
      </Cell>

      <Cell width={5} height={8} right={1} top={-3} align="right">
        <ImageWithZoom src="img/01_City_Guerilla_Dacida_2017.jpg" alt="" />
      </Cell>
    </Grid>
  )
}
export default IndexPage

const ImageWithZoom = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  position: relative;
  z-index: 9000;

  &:hover {
    transform: scale(1.3);
  }
`

const FeaturedProject = styled.div`
  position: relative;
  padding: 30px;
  > a {
    &:hover {
      text-decoration: line-through;
    }
  }
`

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/home/" } }) {
      edges {
        node {
          frontmatter {
            event {
              name
              date
              image
            }
            featuredProject {
              name
              description
              images {
                image
              }
            }
          }
        }
      }
    }

    actions: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/action/" } }
      limit: 5
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            description
            tags
            images {
              image
            }
          }
        }
      }
    }

    tags: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/action/" } }
      limit: 10
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  > div {
    &:hover {
      opacity: 1;
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
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  > h1 {
    font-size: 24px;
  }

  > p {
    margin: 5px 0;
    font-size: 14px;
  }
`
const Action = ({ url, name, description, images }) => (
  <Link to={url} style={{ display: 'block', width: '100%', height: '100%' }}>
    <Wrap>
      <Overflow>
        <h1>{name}</h1>
        <p>
          {description &&
            description
              .split('.')
              .slice(0, 4)
              .join('.')}.
      </p>
      </Overflow>
      <img
        style={{ width: '100%', minHeight: '100%', objectFit: 'contain' }}
        src={images[0].image}
        alt=""
      />
    </Wrap>
  </Link>
)

class InputBar extends React.Component {
  render() {
    return (
      <input
        ref={node => (this.input = node)}
        style={{
          background: ` white url(${searchIcon}) no-repeat 9px center`,
          backgroundSize: '20px 20px',
        }}
        type="search"
        placeholder="search"
        onKeyPress={e =>
          e.key === 'Enter' && navigateTo(`/search?q=${this.input.value}`)
        }
      />
    )
  }
}
