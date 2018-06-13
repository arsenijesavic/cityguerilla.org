import React from 'react'
import { Grid, Cell } from '../components'
import Draggable from 'react-draggable'
import Link from 'gatsby-link'
import moment from 'moment'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

const MemberPage = ({ data }) => {
  const { name, location, from, to, image, website, involved, bio, tags } = {
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
          <MemberLinks>
            <span>links:</span>
            <a href={website}>web</a>
            <a href="">mail</a>
          </MemberLinks>
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
            background: 'red',
            width: '314px',
            height: '269px',
            background: `url(${image})`,
            backgroundSize: 'cover'

            // objectFit: 'cover',
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

      <Cell width={18} height={10} top={2} left={1}>
        <CellTitle>Creative Board</CellTitle>
      </Cell>
    </Grid >
  )
}

export default MemberPage

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

export const aboutPageQuery = graphql`
  query MemberPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        name
        location
        from
        to
        image
        website
        involved {
          name
          from
          url
        }
        bio
        tags
      }
    }
  }
`
