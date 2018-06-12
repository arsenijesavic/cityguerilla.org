import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from '../components'
import cn from 'classnames'

const CreativeBoardPage = ({ data }) => {
  const boards = data.allMarkdownRemark.edges.map(v => ({
    ...v.node.frontmatter,
  }))

  const cellSize = category => {
    if (category === 'gif / gif')
      return ({ "width": 6, "height": 5, "top": 1, "left": 1 })

    if (category === 'video / video')
      return { "width": 12, "height": 7, "top": 1, "left": 1 }

    if (category === 'audio / audio')
      return { "width": 8, "height": 4, "top": 1, "left": 1 }

    return { "width": 5, "height": 5, "top": 1, "left": 1 }
  }



  return (
    <Grid>
      {boards && boards.map((board, i) =>
        <Cell key={i} {...cellSize(board.category)}>
          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            {board.image
              ? <ImageWithZoom src={board.image} alt="" />
              : <iframe width="100%" height="315" src={board.url} frameBorder="0" />
            }
          </div>
        </Cell>
      )}
    </Grid>
  )
}

export default CreativeBoardPage

const ImageWithZoom = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`

export const query = graphql`
  query CreativeBoardQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/board/" } }) {
      edges {
        node {
          frontmatter {
            category
            image
            url
          }
        }
      }
    }
  }
`
