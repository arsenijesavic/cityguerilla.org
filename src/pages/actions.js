import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Grid, Cell, Select } from '../components'
import moment from 'moment'
import uniqBy from 'lodash/uniqBy'



class ActionsPage extends Component {

  state = {
    filters: {
      from: '',
      category: '',
      tag: ''
    },
  }

  handleFilter = ({ id, value }) => {
    const { filters } = { ...this.state }
    filters[id] = value
    this.setState({ filters })
  }

  render() {
    const { data } = this.props

    const allData = data.allMarkdownRemark.edges.map(v => ({
      ...v.node.frontmatter,
      url: v.node.fields.slug,
    }))

    const projects = allData

    const years = allData
      .map(v => moment(v.from).format('YYYY'))
      .filter((elem, pos, arr) => arr.indexOf(elem) == pos)
      .filter(v => v !== 'Invalid date')
      .sort((a, b) => a - b)

    const categories = allData
      .map(v => v.category && v.category.toLowerCase().split(' '))
      .reduce((a, b) => a.concat(b), [])
      .filter(Boolean)
      .map(v => v.replace(',', ''))
      .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

    const tags = data.tags.group
      .map(v => v.fieldValue)
      .filter((elem, pos, arr) => arr.indexOf(elem) == pos)

    return (
      <Grid>

        <Cell width={4} height={1} left={4} bottom={1} >
          <Select id='from' placeholder='Year' options={years} onChange={this.handleFilter} />
        </Cell>
        <Cell width={4} height={1} bottom={1} >
          <Select id='category' placeholder='Category' options={categories} onChange={this.handleFilter} />
        </Cell>
        <Cell width={4} height={1} bottom={1} >
          <Select placeholder='Tag' options={tags} />
        </Cell>


        {projects &&
          projects.map((project, i) => (
            <Cell key={i} {...getRandomCell()}>
              <Link
                style={{ display: 'block', width: '100%', height: '100%' }}
                to={project.url}
              >
                <Project {...project} />
              </Link>
            </Cell>
          ))}
      </Grid>
    )
  }
}

export default ActionsPage



const getRandomCell = () => {
  const options = {
    0: { width: 7, height: 8, top: 1 },
    1: { width: 8, height: 6, top: 2, left: 2 },
    2: { width: 11, height: 4, top: 3, left: 4, right: 1 },
  }
  const option = Math.floor(Math.random() * 3)

  return options[option]
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  overflow: hidden;

  > div {
    &:hover {
      left: -200%;
      opacity: 0;
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
  z-index: 100;
  padding: 15px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  > h1 {
    font-size: 24px;
  }

  > p {
    margin: 5px 0;
    word-wrap: break-word;
    > span {
      background: black;
      color: white;
      padding: 5px;
      font-size: 0.707em;
      text-transform: uppercase;
      display: inline-block;
    }
  }
`
const Project = ({ name, tags, images }) => (
  <Wrap>
    <Overflow>
      <h1>{name}</h1>
      <p>{tags && tags.slice(0, 8).map((tag, i) => <span key={i}>{tag}</span>)}</p>
    </Overflow>
    <img src={images && images[0].image} alt="" />
  </Wrap>
)

export const query = graphql`
  query ActionsQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/action/" } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            tags
            category
            from
            images {
              image
            }
          }
        }
      }
    }

    tags: allMarkdownRemark(
      limit: 2000,
      filter: {
        fileAbsolutePath: {regex: "/action/"},
        frontmatter: {tags: {ne: ""}}
      }
      ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    years: allMarkdownRemark(
      limit: 2000,
      filter: {
        fileAbsolutePath: {regex: "/action/"},
        frontmatter: {from: {ne: "null"}}
      }
      ) {
      group(field: frontmatter___from) {
        fieldValue
        totalCount
      }
    }

    categories:allMarkdownRemark(
      limit: 2000
      filter: { fileAbsolutePath: { regex: "/action/" } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }

  }
`
