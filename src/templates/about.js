import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'
import { Grid, Cell } from '../components'
import { FacebookIcon, GILogo } from '../assets/svg'
import Draggable from 'react-draggable'
import uilogo from '../assets/images/urban-incubator-logo-l.png'

const AboutPage = ({ data }) => {
  const { details, timeline, documents } = {
    ...data.markdownRemark.frontmatter,
  }
  const projects = data.projects.edges.map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug,
  }))

  return (
    <Grid>
      <Cell width={4} height={3}>
        <HelloText>hello we are city guerillas</HelloText>
      </Cell>

      <Cell width={2} height={4} top={2}>
        <WeText>we do what we like</WeText>
      </Cell>

      <Cell width={1} height={1} left={1} top={2}>
        <FacebookIcon />
      </Cell>

      <Cell width={1} height={1} left={10}>
        <Insta />
      </Cell>

      <Cell width={10} height={16} left={2} clear>
        <div
          className="scroll"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            padding: '30px 35px 0px 45px',
          }}
        >
          <p>{details}</p>
        </div>
      </Cell>

      {timeline &&
        timeline.map((event, i) => (
          <Cell
            key={i}
            width={3}
            height={1}
            top={i > 0 && 1}
            left={(i % 2) + 1}
            index={Math.floor(10000 / (i + 1))}
          >
            <TimelineEvent>
              <TimelineDetails>
                <h3>{moment(event.year).format('YYYY')}</h3>
                <p>{event.description}</p>
              </TimelineDetails>
            </TimelineEvent>
          </Cell>
        ))}

      <Cell width={4} height={1} top={2} left={2} clear background={false}>
        <CellTitle>Projects</CellTitle>
      </Cell>

      {projects &&
        projects.map((project, i) => (
          <Cell key={i} width={8} height={1} left={2} clear>
            <Link style={{ display: 'block' }} to={project.url}>
              <ProjectName>{project.name}</ProjectName>
            </Link>
          </Cell>
        ))}

      <Cell width={3} height={3} top={-2} left={4}>
        <GILogo />
      </Cell>

      <Cell width={2} height={2} top={-1}>
        <UILogo />
      </Cell>

      <Cell
        width={2}
        height={2}
        top={1}
        left={4}
        background={false}
        index={9000}
      >
        <Folder>
          {documents && documents.map((doc, i) => <p key={i}>{doc.name}</p>)}
        </Folder>
      </Cell>

      <Cell width={2} height={2} top={1} left={4} background={false}>
        <Document />
      </Cell>
    </Grid>
  )
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        details
        documents {
          name
          url
        }
        timeline {
          title
          description
          year
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/project/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
          }
        }
      }
    }
  }
`

const TimelineEvent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const TimelineDetails = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 50%;
  background: black;
  padding: 10px 0;
  cursor: pointer;

  transform: translate(-50%, 0);
  transition: all 0.3s ease-in-out;

  > p {
    visibility: hidden;
    width: 0%;
    opacity: 0;
    font-size: 0.707em;
    color: white;
    padding: 10px;
    transition: opacity 1s ease-in-out;
  }

  &:hover {
    width: 225px;
    height: 180px;
    > p {
      width: 100%;
      opacity: 1;
      visibility: visible;
    }
  }

  > h3 {
    color: white;
  }
`

const UILogo = () => (
  <a
    style={{ width: '100%', height: '100%', display: 'block' }}
    target="_tab"
    href="http://urbanincubator.rs/"
  >
    <Image src={uilogo} alt="urban-incubator" />
  </a>
)

const ProjectName = styled.p`
  padding: 12px 15px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const HelloText = styled.h2`
  font-size: 27px;
  padding: 8px 30px 21px 21px;
`
const WeText = styled.h2`
  width: 142px;
  height: 70px;
  font-size: 25px;
  transform: translateX(-20%) translateY(75%) rotate(-90deg);
`
const IconWrap = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const Insta = () => (
  <IconWrap>
    <a
      style={{ width: '100%', height: '100%', display: 'block' }}
      target="_tab"
      href="https://www.instagram.com/city.guerilla/"
    >
      <svg viewBox="0 0 169.063 169.063">
        <g fill="white">
          <path
            d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
c17.455,0,31.656,14.201,31.656,31.655V122.407z"
          />
          <path
            d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
          />
          <path
            d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
C135.661,29.421,132.821,28.251,129.921,28.251z"
          />
        </g>
      </svg>
    </a>
  </IconWrap>
)

const FolderWrap = styled.div`
  padding: 10px;
  position: relative;
`

const FolderWindow = styled.div`
  transition: width height 0.3 ease-in;
  position: absolute;
  z-index: 9999;
  width: ${props => (props.isActive ? '500px' : '0')};
  height: ${props => (props.isActive ? '300px' : '0')};

  border: 1px solid black;
  top: -130px;
  left: -170px;
  background: white;
`

const FolderWindowHandle = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid black
  position: relative;
  cursor: move;
  > span {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`

const FolderWindowInner = styled.div``

class Folder extends React.Component {
  state = {
    isClicked: false,
  }
  render() {
    const { children } = this.props
    const { isClicked } = this.state

    return (
      <FolderWrap
        onClick={() => !isClicked && this.setState({ isClicked: true })}
      >
        <svg viewBox="0 0 220.37 206.37">
          <path
            d="M258.1,56.11V232.82H37.73V56.11Z"
            transform="translate(-37.73 -26.46)"
          />
          <polygon points="0.67 24.54 7.45 0 94.9 0 102.77 24.54 0.67 24.54" />
        </svg>
        <Draggable handle="strong" onStart={() => true} onStop={() => true}>
          <FolderWindow isActive={isClicked}>
            {isClicked && (
              <strong className="cursor">
                <FolderWindowHandle>
                  <span onClick={() => this.setState({ isClicked: false })}>
                    X
                  </span>
                </FolderWindowHandle>
              </strong>
            )}

            {isClicked && <FolderWindowInner>{children}</FolderWindowInner>}
          </FolderWindow>
        </Draggable>
      </FolderWrap>
    )
  }
}

const Document = () => (
  <div style={{ padding: '10px' }}>
    <svg viewBox="0 0 191.21 241.62">
      <polygon points="191.21 241.62 0 241.62 0 0 138.58 0 139.78 56.76 190.22 57.24 191.21 241.62" />
      <rect fill="#fff" x="36.62" y="80.39" width="115.29" height="3.15" />
      <rect fill="#fff" x="37.53" y="108.71" width="115.29" height="3.15" />
      <rect
        fill="none"
        stroke="white"
        strokeWidth="2.82px"
        strokeMiterlimit="10"
        x="39.28"
        y="140.6"
        width="112.63"
        height="66"
      />
      <line
        fill="none"
        stroke="white"
        strokeWidth="3.12px"
        strokeMiterlimit="10"
        x1="39.44"
        y1="140.6"
        x2="151.91"
        y2="206.59"
      />
      <line
        fill="none"
        stroke="white"
        strokeWidth="3.12px"
        strokeMiterlimit="10"
        x1="151.91"
        y1="140.6"
        x2="39.28"
        y2="206.59"
      />
      <line
        fill="#fff"
        stroke="#000"
        strokeWidth="3.16px"
        strokeMiterlimit="10"
        x1="137.6"
        y1="1.44"
        x2="189.22"
        y2="58.78"
      />
    </svg>
  </div>
)

// <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.74 604.67">
//                                         <title>pdf-icon</title><path d="M7.49,58.55c2-.41,17.22.08,26.63-.2.29-3.78.13-23.89.13-23.89s22.85.12,28.53-.37c.29-5.27-.21-27.24-.21-27.24s221-1.24,289.77-1.24c20.08,22.17,40.22,44.28,60.21,66.53q35.61,39.65,71,79.5V443.7c-.2,3.15-1.37,113.16-1.37,113.16s-22.56.18-27.77.57c-.45,5.59-.05,28.47-.05,28.47s-22.49,0-26.92.34c0,4.12-.14,24-.14,24L8.94,609.92S5.35,59,7.49,58.55Zm332.21-40H76.25V544H470.3V164.33h-6.23c-37-.14-124-1.62-124-1.62s.21-3.72.18-11.43q-.28-62.95-.53-125.89C339.69,23.28,339.69,21.18,339.69,18.59ZM441,557H434.3q-166.12-.4-332.25-.82c-8.82,0-37.35,0-37.35,0s0-3.63-.25-11.42c-.4-12.51-.72-25-.74-37.55q-.33-226.44-.56-452.88c0-2.21,0-4.41,0-6.7H46.71V573H441ZM414.43,586h-6q-62.69-.14-125.39-.29c-78.3-.29-248.19-1-248.19-1s.13-2.59-.07-13.09c-.31-15.87-.61-31.74-.63-47.61q-.33-222.74-.56-445.47c0-2.23,0-4.46,0-6.92H20.28v525.6H414.43ZM353.11,24.42V151.19c13,.83,109.25.26,114.5-.13C430.07,109.59,391.52,66.86,353.11,24.42Z" transform="translate(-6.81 -5.61)"></path><path d="M228.81,338.28V231.18c.31-.23.59-.62.87-.62,18,.19,36-.34,53.84.88,14.31,1,24.52,9.76,30.16,22.71,8.45,19.4,8.68,39.38,1.11,59.13-5.39,14.08-15.9,23.6-30.94,24.69C265.69,339.29,247.37,338.28,228.81,338.28Zm22-17.71c9.06,0,17.68.48,26.22-.13,9.17-.66,15.26-5.95,17.63-15a77.77,77.77,0,0,0,.35-39.19c-2.07-8.21-7.05-14.71-15.75-16-9.27-1.38-18.77-1.3-28.45-1.88Z" transform="translate(-6.81 -5.61)"></path><path d="M127.2,231.39c19.69,0,39-1.21,58,.36,17.32,1.42,27.52,18.38,24.91,37.36-2.34,17-13.71,27.56-31.43,28.47-9.64.5-19.33.09-29.67.09V339H127.2Zm22,48.73c8.9-.47,17.34-.51,25.68-1.46,7.87-.9,12.45-6.39,12.71-13.81.27-7.74-4-14.11-11.94-15-8.63-.94-17.44-.21-26.45-.21Z" transform="translate(-6.81 -5.61)"></path><path d="M339.07,230.61h74.1v18h-52v25.82H406v18.43H360.92v46H339.07Z" transform="translate(-6.81 -5.61)"></path><rect x="65.36" y="403.45" width="399.87" height="137.05"></rect></svg>
