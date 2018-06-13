import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'
import { Grid, Cell } from '../components'

const ProjectPage = ({ data }) => {
  const {
    name,
    category,
    from,
    to,
    location,
    description,
    images,
    video,
    tags,
    members,
    mentors,
    actions
  } = {
    ...data.markdownRemark.frontmatter,
  }
  console.log(actions)
  return (
    <Grid>
      <Cell width={6} height={6} top={1} left={1}>
        <div style={{ padding: '15px' }}>
          <h1 style={{ fontSize: '24px', minHeight: `${4 * 45}px` }}>{name}</h1>
          <h3 style={{ fontWeight: '300', paddingBottom: '5px' }}>
            {category}
          </h3>
          <h5 style={{ fontWeight: '300' }}>{moment(from).year()}</h5>
          <h5 style={{ fontWeight: '300' }}>{location}</h5>
        </div>
      </Cell>

      <Cell width={12} height={6} top={1}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={images && images[0].image}
          alt=""
        />
      </Cell>

      <Cell width={5} height={1} left={1}>
        <div
          style={{ padding: '15px', background: 'black', textAlign: 'center' }}
        >
          <p
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: '0.707em',
              fontWeight: 'bold',
            }}
          >
            The Symphony of Savamala
          </p>
        </div>
      </Cell>

      <Cell width={1} height={1} left={11}>
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          F
        </div>
      </Cell>

      <Cell width={1} height={1}>
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          Fff
        </div>
      </Cell>

      <Cell width={10} height={15} top={2} left={1}>
        <div
          className="scroll"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            //padding: '30px 35px 0px 45px',
            padding: '30px',
          }}
        >
          <p>{description}</p>
        </div>
      </Cell>

      <Cell width={7} top={2} left={1}>
        <div style={{ width: '45px', height: '45px', background: 'black' }}>
          <h1
            style={{
              fontSize: '27px',
              padding: '2.5px 15px',
              color: 'white',
              fontWeight: '100',
            }}
          >
            #
          </h1>
        </div>
        <div style={{ padding: '2.5px 30px' }}>
          {tags &&
            tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  marginRight: '5px',
                  display: 'inline-block',
                  fontSize: '0.707em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
        </div>
      </Cell>

      <Cell width={7} top={2} right={1} align='right'>
        <div style={{ width: '135px', height: '45px', background: 'black' }}>
          <h1
            style={{
              fontSize: '20px',
              padding: '8px 15px',
              color: 'white',
              fontWeight: '100',
              textTransform: 'lowercase',
              textAlign: 'center',
            }}
          >
            Members
          </h1>
        </div>
        <ul style={{ padding: '5px 10px' }}>
          {members &&
            members.map((member, i) => (
              <li key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <Link
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  to={member.url}
                >
                  <img
                    style={{
                      width: '35px',
                      height: '35px',
                      objectFit: 'cover',
                      float: 'left',
                    }}
                    src={member.image}
                    alt=""
                  />
                  <h5
                    style={{
                      float: 'left',
                      padding: '10px',
                      fontWeight: '700',
                    }}
                  >
                    {member.name}
                  </h5>
                  <br style={{ clear: 'both' }} />
                </Link>
              </li>
            ))}
        </ul>
      </Cell>

      <Cell width={7} top={2} left={1}>
        <div style={{ width: '135px', height: '45px', background: 'black' }}>
          <h1
            style={{
              fontSize: '20px',
              padding: '8px 15px',
              color: 'white',
              fontWeight: '100',
              textTransform: 'lowercase',
              textAlign: 'center',
            }}
          >
            Mentors
          </h1>
        </div>
        <ul style={{ padding: '5px 10px' }}>
          {mentors &&
            mentors.map((mentor, i) => (
              <li key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <Link
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  to={mentor.url}
                >
                  <img
                    style={{
                      width: '35px',
                      height: '35px',
                      objectFit: 'cover',
                      float: 'left',
                    }}
                    src={mentor.image}
                    alt=""
                  />
                  <h5
                    style={{
                      float: 'left',
                      padding: '10px',
                      fontWeight: '700',
                    }}
                  >
                    {mentor.name}
                  </h5>
                  <br style={{ clear: 'both' }} />
                </Link>
              </li>
            ))}
        </ul>
      </Cell>

      {actions &&
        <Cell width={18} height={1} top={1} left={1} clear background={false}>
          <CellTitle>
            Actions
        </CellTitle>
        </Cell>
      }
      {actions && actions.map((action, i) =>
        <Cell key={i} width={4} height={4} top={1} left={2}>
          <Link
            style={{ display: 'block', width: '100%', height: '100%' }}
            to={action.url}
          >
            <Project {...action} />
          </Link>
        </Cell>
      )}
    </Grid>
  )
}

export default ProjectPage

export const ProjectQuery = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        category
        description
        from
        to
        tags
        members {
          name
          image
          url
        }
        mentors {
          name
          image
          url
        }
        actions {
          name
          url
          images {
            image
          }
        }
        images {
          image
        }
        video
      }
    }
  }
`

const CellTitle = styled.p`
  width: 180px;
  height: 45px;
  background: black;
  color: white;
  font-size: 20px;
  font-weight: 100;
  text-transform: lowercase;
  padding: 8px 15px;
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
    object-position: 0 0;
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
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  > h1 {
    font-size: 14px;
  }
`

const Project = ({ name, tags, images }) => (
  <Wrap>
    <Overflow>
      <h1>{name}</h1>
    </Overflow>
    <img src={images && images[0].image} alt="" />
  </Wrap>
)