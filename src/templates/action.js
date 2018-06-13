import React from 'react'
import { Grid, Cell } from '../components'
import Link from 'gatsby-link'
import moment from 'moment'
import styled from 'styled-components'

const ActionPage = ({ data }) => {
  const {
    name,
    category,
    from,
    to,
    location,
    modules,
    description,
    images,
    video,
    tags,
    members,
    mentors,
    projects
  } = {
    ...data.markdownRemark.frontmatter
  }

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

      <Cell width={5} height={1} left={1} background={false}>
        {modules &&

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
              {modules}
            </p>
          </div>
        }
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

      {projects && projects.length > 0 &&
        <Cell width={4} height={1} top={2} left={2} clear background={false}>
          <CellTitle>Projects</CellTitle>
        </Cell>
      }
      {projects &&
        projects.map((project, i) => (
          <Cell key={i} width={8} height={1} left={2} clear>
            <Link style={{ display: 'block' }} to={project.url}>
              <ProjectName>{project}</ProjectName>
            </Link>
          </Cell>
        ))}

      {video && (
        <Cell width={14} height={7} top={2} left={3}>
          <iframe
            width="630"
            height="315"
            src={video}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Cell>
      )}
    </Grid>
  )
}

export default ActionPage

export const ActionQuery = graphql`
  query ActionBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        category
        from
        to
        modules
        description
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
        images {
          image
        }
        projects


        video
      }
    }
  }
`


const ProjectName = styled.p`
  padding: 12px 15px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
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