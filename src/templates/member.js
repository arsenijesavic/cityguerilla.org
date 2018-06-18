import React from 'react'
import Link from 'gatsby-link'
import moment from 'moment'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { Grid, Cell } from '../components'
import Draggable from 'react-draggable'

const MemberPage = ({ data }) => {
  const {
    name,
    location,
    from,
    to,
    image,
    website,
    involved,
    bio,
    tags,
    board,
  } = {
    ...data.markdownRemark.frontmatter,
  }

  return (
    <Grid>
      <Cell width={7} height={8} top={2} left={2}>
        <MemberInfo>
          <MemberName>{name}</MemberName>
          <h3 style={{ fontWeight: '300' }}>{location}</h3>
          <h3 style={{ fontWeight: '300' }}>
            {from} - {to}
          </h3>
          {website && (
            <MemberLinks>
              <a href={website}>web</a>
            </MemberLinks>
          )}
        </MemberInfo>
      </Cell>

      <Draggable
        onStart={() => console.log('start')}
        onStop={() => console.log('stop')}
        defaultPosition={{ x: 496, y: 46 }}
      >
        <div
          style={{
            display: 'block',
            cursor: 'move',
            width: '314px',
            height: '269px',
            background: `url(${image})`,
            backgroundSize: 'cover',
            position: 'relative',
            zIndex: '10000',
          }}
        />
      </Draggable>

      <Cell width={8} top={2} left={1} clear>
        <CellTitle>Involved in:</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          {involved &&
            involved
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

      <Cell width={8} top={-2} left={2}>
        <CellTitle width={2}>Bio</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          <p>{bio}</p>
        </div>
      </Cell>

      <Cell width={6} top={1} left={2}>
        <CellTitle width={1}>#</CellTitle>
        <div style={{ padding: '15px 30px' }}>
          {tags &&
            tags.map((tag, i) => (
              <Link
                key={i}
                style={{
                  marginRight: '5px',
                  display: 'inline-block',
                  fontSize: '0.707em',
                  textTransform: 'uppercase',
                }}
                to={`/tags/${kebabCase(tag)}`}
              >
                {tag}
              </Link>
            ))}
        </div>
      </Cell>

      {board &&
        board.length > 0 && (
          <Cell width={18} height={10} top={2} left={1}>
            <CellTitle>Creative Board</CellTitle>
            {board &&
              board.map((item, i) => (
                <Draggable
                  key={i}
                  onStart={() => console.log('start')}
                  onStop={() => console.log('stop')}
                  defaultPosition={{
                    x: Math.floor(Math.random() * (45 * 15)),
                    y: Math.floor(Math.random() * (45 * 7)),
                  }}
                >
                  <BoardItem>
                    {item.url ? (
                      <iframe src={item.url} frameborder="0" />
                    ) : (
                      <img src={item.image} alt="" />
                    )}
                  </BoardItem>
                </Draggable>
              ))}
          </Cell>
        )}
    </Grid>
  )
}

export default MemberPage

const BoardItem = styled.div`
  position: absolute;
  > iframe,
  img {
    width: 135px;
    height: 135px;
    object-fit: cover;
    overflow: hidden;
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

const MemberInfo = styled.div`
  padding: 30px;
`
const MemberName = styled.h1`
  height: 230px;
  font-size: 36px;
  padding: 0px;
  margin: 0;
`

const MemberLinks = styled.div`
  font-weight: 800;

  > span {
    display: inline-block;
    margin-right: 5px;
  }

  > a {
    display: inline-block;
    margin-right: 5px;
  }
`

export const MemberQuery = graphql`
  query MemberPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        name
        location
        from
        to
        image
        website
        bio
        tags
        involved {
          name
          from
          url
        }
        board {
          image
          url
        }
      }
    }
  }
`
