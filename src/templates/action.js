import React from 'react'
import { Grid, Cell, Carousel } from '../components'
import Link from 'gatsby-link'
import moment from 'moment'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Modal from 'react-modal'

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
    projects,
    partners,
    collaborators,
    links,
  } = {
    ...data.markdownRemark.frontmatter,
  }

  return (
    <Grid>
      <Cell width={6} height={6} top={1} left={1}>
        <div style={{ padding: '15px' }}>
          <h1 style={{ fontSize: '24px', minHeight: `${4 * 45}px` }}>{name}</h1>
          <h4 style={{ fontWeight: '300' }}>{category}</h4>
          {/* <h5 style={{ fontWeight: '800' }}>{moment(from).year()}</h5> */}
          <h5 style={{ fontWeight: '300' }}>{location}</h5>
        </div>
      </Cell>

      <Cell width={12} height={6} top={1}>
        <CarouselWithGallery data={images} />
      </Cell>

      <Cell width={5} height={1} left={1} background={false}>
        {modules && (
          <div
            style={{
              padding: '15px',
              background: 'black',
              textAlign: 'center',
            }}
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
        )}
      </Cell>

      <Cell width={2} height={1} left={11}>
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '15px',
            background: 'black',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontSize: '0.707em',
              fontWeight: 'bold',
            }}
          >
            {moment(from).year()}
          </p>
        </div>
      </Cell>

      {/* <Cell width={1} height={1}>
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          l
        </div>
      </Cell> */}

      <Cell width={10} height={15} top={2} left={1}>
        <div
          className="scroll"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            padding: '15px 30px 0px 30px',
          }}
        >
          <p>{description}</p>
        </div>
      </Cell>

      <Cell width={7} top={2} left={1}>
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

      {links &&
        links.length > 1 && (
          <Cell width={5} left={1} top={1} clear>
            <CellTitle width={1}>
              <svg width="100%" height="100%" viewBox="0 0 512.092 512.092">
                <g fill="white">
                  <path
                    d="M312.453,199.601c-6.066-6.102-12.792-11.511-20.053-16.128c-19.232-12.315-41.59-18.859-64.427-18.859
			c-31.697-0.059-62.106,12.535-84.48,34.987L34.949,308.23c-22.336,22.379-34.89,52.7-34.91,84.318
			c-0.042,65.98,53.41,119.501,119.39,119.543c31.648,0.11,62.029-12.424,84.395-34.816l89.6-89.6
			c1.628-1.614,2.537-3.816,2.524-6.108c-0.027-4.713-3.87-8.511-8.583-8.484h-3.413c-18.72,0.066-37.273-3.529-54.613-10.581
			c-3.195-1.315-6.867-0.573-9.301,1.877l-64.427,64.512c-20.006,20.006-52.442,20.006-72.448,0
			c-20.006-20.006-20.006-52.442,0-72.448l108.971-108.885c19.99-19.965,52.373-19.965,72.363,0
			c13.472,12.679,34.486,12.679,47.957,0c5.796-5.801,9.31-13.495,9.899-21.675C322.976,216.108,319.371,206.535,312.453,199.601z"
                  />
                  <path
                    d="M477.061,34.993c-46.657-46.657-122.303-46.657-168.96,0l-89.515,89.429c-2.458,2.47-3.167,6.185-1.792,9.387
			c1.359,3.211,4.535,5.272,8.021,5.205h3.157c18.698-0.034,37.221,3.589,54.528,10.667c3.195,1.315,6.867,0.573,9.301-1.877
			l64.256-64.171c20.006-20.006,52.442-20.006,72.448,0c20.006,20.006,20.006,52.442,0,72.448l-80.043,79.957l-0.683,0.768
			l-27.989,27.819c-19.99,19.965-52.373,19.965-72.363,0c-13.472-12.679-34.486-12.679-47.957,0
			c-5.833,5.845-9.35,13.606-9.899,21.845c-0.624,9.775,2.981,19.348,9.899,26.283c9.877,9.919,21.433,18.008,34.133,23.893
			c1.792,0.853,3.584,1.536,5.376,2.304c1.792,0.768,3.669,1.365,5.461,2.048c1.792,0.683,3.669,1.28,5.461,1.792l5.035,1.365
			c3.413,0.853,6.827,1.536,10.325,2.133c4.214,0.626,8.458,1.025,12.715,1.195h5.973h0.512l5.12-0.597
			c1.877-0.085,3.84-0.512,6.059-0.512h2.901l5.888-0.853l2.731-0.512l4.949-1.024h0.939c20.961-5.265,40.101-16.118,55.381-31.403
			l108.629-108.629C523.718,157.296,523.718,81.65,477.061,34.993z"
                  />
                </g>
              </svg>
            </CellTitle>
            <ul
              style={{
                padding: '10px',
                fontSize: '1em',
                width: '100%',
                height: '100%',
              }}
            >
              {links &&
                links.map((link, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'block',
                      width: '100%',
                      wordBreak: 'break-all',
                    }}
                  >
                    <a target="_tab" href={link.url}>
                      {link.name}
                    </a>
                  </li>
                ))}
            </ul>
          </Cell>
        )}
      {mentors &&
        mentors.length > 1 && (
          <Cell width={7} top={2} right={1} align="right">
            <div
              style={{ width: '135px', height: '45px', background: 'black' }}
            >
              <CellTitle>Mentors</CellTitle>
            </div>
            <ul style={{ padding: '5px 10px' }}>
              {mentors &&
                mentors.map((mentor, i) => (
                  <li key={i} style={{ display: 'block', marginBottom: '5px' }}>
                    <Link
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
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
        )}

      {collaborators &&
        collaborators.length > 0 && (
          <Cell width={7} top={2} right={1} align="right" clear>
            <div
              style={{ width: '135px', height: '45px', background: 'black' }}
            >
              <CellTitle>Collaborators</CellTitle>
            </div>
            <ul style={{ padding: '5px 10px' }}>
              {collaborators &&
                collaborators.map((collaborator, i) => (
                  <li
                    key={i}
                    style={{ display: 'block', marginBottom: '2.5px' }}
                  >
                    <Link
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                      to={collaborator.url}
                    >
                      <h5
                        style={{
                          float: 'left',
                          padding: '5px 10px',
                          fontWeight: '700',
                        }}
                      >
                        {collaborator.name}
                      </h5>
                      <br style={{ clear: 'both' }} />
                    </Link>
                  </li>
                ))}
            </ul>
          </Cell>
        )}

      {projects &&
        projects.length > 0 && (
          <Cell width={4} height={1} top={2} left={2} clear background={false}>
            <CellTitle>Projects</CellTitle>
          </Cell>
        )}
      {projects &&
        projects.map((project, i) => (
          <Cell key={i} width={8} height={1} left={2} clear>
            <Link style={{ display: 'block' }} to={project.url || '/'}>
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
      {partners &&
        partners.length > 0 && (
          <Cell width={9} top={2} left={1}>
            <CellTitle>Partners</CellTitle>
            <div style={{ padding: '2.5px 15px' }}>
              {partners.map((partner, i) => (
                <div
                  key={i}
                  style={{
                    width: '135px',
                    height: '135px',
                    display: 'block',
                    float: 'left',
                    marginRight: '45px',
                  }}
                >
                  <img
                    key={i}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    src={partner.image}
                    alt=""
                  />
                </div>
              ))}
              <br style={{ clear: 'both' }} />
            </div>
          </Cell>
        )}
    </Grid>
  )
}

export default ActionPage

// [ 'Goethe-Institut',
//   '​Urban Incubator',
//   'Kafe/knjižara Magistrala',
//   'Gallery Kolektiv',
//   'Museum Night',
//   'Magacin',

//   'La casa amarilla',

//   'Galerija Močvara',
//   'Muzej grada Beograda',
//   'Kafe-knjizara Meduza',
//   'KC GRAD',
//   'dis-patch',
//   '​Mikser festival',
//   'Rimini Protokoll Berlin',
//   'Band Bicikl (Free Music Archive)',
//   'Museum of Yugoslav History',
//   'G12 HUB' ]

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
        partners {
          name
          url
          image
        }
        links {
          name
          url
        }
        collaborators {
          name
          url
        }
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
  width: ${props => (props.width ? `${props.width * 45}px` : '180px')};
  height: 45px;
  background: black;
  color: white;
  font-size: 20px;
  font-weight: 100;
  text-transform: lowercase;
  padding: 8px 15px;
`

const Links = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: white;
  transition: all 0.3s ease-in-out;

  > svg {
    width: 30px;
    height: 30px;
    padding: 7px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  > div {
    position: absolute;
    left: -100%;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &:hover {
    height: 180px;
    width: 100%;
    > div {
      left: 0;
    }
  }
`

class CarouselWithGallery extends React.Component {
  state = {}
  render() {
    const { data } = this.props
    const { isGalleryOpen } = this.state
    console.log(isGalleryOpen)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Carousel
          renderBottomLeftControls={({ previousSlide }) => (
            <button
              style={{
                width: '100%',
                height: '100%',
                padding: '0',
                margin: '0',
                background: 'none',
                cursor: `url('/assets/back.png'), auto`,
              }}
              onClick={previousSlide}
            />
          )}
          renderBottomRightControls={({ nextSlide }) => (
            <button
              style={{
                width: '100%',
                height: '100%',
                padding: '0',
                margin: '0',
                cursor: `url('/assets/next.png'), auto`,
                background: 'none',
              }}
              onClick={nextSlide}
            />
          )}
          autoplay
        >
          {data &&
            data.map((image, i) => (
              <img
                key={i}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={image.image}
                onClick={() => this.setState({ isGalleryOpen: true })}
                alt=""
              />
            ))}
        </Carousel>
        <Gallery
          data={data}
          isOpen={isGalleryOpen}
          onClose={() => this.setState({ isGalleryOpen: false })}
        />
      </div>
    )
  }
}

class Gallery extends React.Component {
  state = {
    selectedImage: 0,
  }

  render() {
    const { data, isOpen, onClose } = this.props
    const { selectedImage } = this.state

    return (
      <Modal className="modal" isOpen={isOpen} ariaHideApp={false}>
        <div style={{ padding: '15px' }}>
          <div style={{ height: '10vh' }}>
            {/* <div onClick={onClose}>X</div> */}
            {data &&
              data.map((image, i) => (
                <div
                  onClick={() => this.setState({ selectedImage: i })}
                  key={i}
                  style={{
                    width: '135px',
                    height: '135px',
                    display: 'inline-block',
                    ...(selectedImage === i ? { border: '5px solid red' } : {}),
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={image.image}
                    alt=""
                  />
                </div>
              ))}
          </div>
          <div style={{ height: '85vh' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={data[selectedImage].image}
              alt=""
            />
          </div>
        </div>
      </Modal>
    )
  }
}
