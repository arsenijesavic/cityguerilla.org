import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'
import { Grid, Cell } from '../components'
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
        <FB />
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
          <Cell key={i} width={3} height={1} top={i > 0 && 1} left={(i % 2)+1}  index={Math.floor(10000/(i+1))} >
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

const GILogo = () => (
  <div style={{ width: '50%', margin: '0 auto', paddingTop: '10px' }}>
    <a
      style={{ width: '100%', height: '100%', display: 'block' }}
      target="_tab"
      href="https://www.goethe.de/ins/cs/sr/index.html"
    >
      <svg
        viewBox="0 0 283.466 456.378"
        enableBackground="new 0 0 283.466 456.378"
      >
        <g>
          <g>
            <path
              fill="##000"
              d="M231.779,103.744c28.545,0,51.687-23.14,51.687-51.692c0-28.546-23.142-51.688-51.687-51.688
			c-28.555,0-51.695,23.142-51.695,51.688C180.084,80.604,203.225,103.744,231.779,103.744z M231.779,11.881
			c22.176,0,40.165,17.986,40.165,40.175c0,22.185-17.989,40.171-40.165,40.171c-22.191,0-40.174-17.986-40.174-40.171
			C191.605,29.867,209.588,11.881,231.779,11.881z"
            />
            <path
              fill="##000"
              d="M102.172,142.103c0-21.845,17.704-39.551,39.553-39.551l0.008-11.295
			c-28.116,0-50.901,22.736-50.901,50.843c0,28.112,22.785,50.894,50.897,50.894c28.109,0,50.832-22.778,50.832-50.89l-11.21-0.001
			c0,21.85-17.78,39.556-39.625,39.556C119.876,181.659,102.172,163.953,102.172,142.103z"
            />
            <path
              fill="##000"
              d="M68.296,142.1c0,40.561,32.877,73.437,73.433,73.437c40.556,0,73.511-32.876,73.511-73.437l-11.25,0.004
			c0,34.331-27.936,62.152-62.261,62.152c-34.331,0-62.155-27.825-62.155-62.156c0-34.328,27.83-62.145,62.159-62.145l-0.004-11.288
			C101.174,68.667,68.296,101.544,68.296,142.1z"
            />
            <path
              fill="##000"
              d="M45.503,142.1c0,53.146,43.083,96.226,96.226,96.226c53.141,0,96.115-43.074,96.115-96.222l-11.33-0.001
			c0,46.792-38.006,84.713-84.785,84.713c-46.792,0-84.713-37.921-84.713-84.713c0-46.784,37.921-84.71,84.713-84.71l0.004-11.409
			C88.587,45.984,45.503,88.956,45.503,142.1z"
            />
            <path
              fill="##000"
              d="M141.733,23.051c-65.748,0-119.05,53.298-119.05,119.046c0,65.751,53.303,119.051,119.05,119.051
			c65.744,0,118.966-53.292,118.966-119.044l-11.318-0.004c0,59.412-48.239,107.574-107.648,107.574
			c-59.414,0-107.572-48.162-107.572-107.574c0-59.409,48.159-107.572,107.572-107.572V23.051z"
            />
            <path
              fill="##000"
              d="M141.738,272.537c-72.046,0-130.447-58.401-130.447-130.44c0-72.041,58.401-130.438,130.447-130.438
			l-0.005-11.295C63.452,0.364,0,63.821,0,142.097C0,220.378,63.458,283.83,141.738,283.83c78.273,0,141.728-63.444,141.728-141.726
			l-11.214-0.007C272.252,214.136,213.777,272.537,141.738,272.537z"
            />
          </g>
          <g>
            <path
              fill="##000"
              d="M27.745,383.228c5.654,0,12.622-1.264,16.411-3.045v-30.701H24.832v9.654h7.678v13.787
			c-1.347,0.236-3.384,0.334-5.063,0.334c-8.554,0-15.184-4.52-15.184-19.023c0-14.281,6.7-18.812,16.67-18.812
			c4.168,0,9.653,0.893,13.145,2.307l1.188-9.744c-3.864-1.562-10.165-2.525-15-2.525C11.083,325.458,0,334.448,0,354.382
			C0,373.87,10.266,383.228,27.745,383.228z"
            />
            <polygon
              fill="##000"
              points="222.518,382.118 234.486,382.118 234.486,326.351 222.518,326.351 222.518,348.37 204.588,348.37
			204.588,326.351 192.618,326.351 192.618,382.118 204.588,382.118 204.588,358.315 222.518,358.315 		"
            />
            <polygon
              fill="##000"
              points="173.766,382.118 173.766,336.39 185.88,336.39 185.88,326.351 149.535,326.351 149.535,336.39
			161.648,336.39 161.648,382.118 		"
            />
            <polygon
              fill="##000"
              points="121.358,358.38 141.044,358.38 141.044,348.54 121.358,348.54 121.358,336.302 144.543,336.302
			144.543,326.351 109.39,326.351 109.39,382.118 145.328,382.118 145.328,372.167 121.358,372.167 		"
            />
            <path
              fill="##000"
              d="M76.556,383.755c15.843,0,23.492-8.512,23.492-29.559c0-20.602-7.649-29.479-23.492-29.479
			c-15.837,0-23.489,8.877-23.489,29.479C53.067,374.796,61.015,383.755,76.556,383.755z M76.556,334.64
			c7.594,0,11.234,4.752,11.234,19.557c0,14.73-3.641,19.703-11.157,19.703c-7.59,0-11.307-4.898-11.307-19.703
			C65.326,339.468,69.042,334.64,76.556,334.64z"
            />
            <polygon
              fill="##000"
              points="282.28,372.167 258.311,372.167 258.311,358.38 277.993,358.38 277.993,348.54 258.311,348.54
			258.311,336.302 281.494,336.302 281.494,326.351 246.342,326.351 246.342,382.118 282.28,382.118 		"
            />
            <polygon
              fill="##000"
              points="107.764,410.942 118.854,410.942 118.854,455.077 130.547,455.077 130.547,410.942
			141.637,410.942 141.637,401.253 107.764,401.253 		"
            />
            <rect
              x="4.019"
              y="401.255"
              fill="##000"
              width="11.806"
              height="53.822"
            />
            <path
              fill="##000"
              d="M232.559,436.351c0,6.242-2.139,9.699-7.959,9.699c-5.767,0-8.04-3.523-8.04-9.699v-35.096h-11.704v35.531
			c0,12.912,6.647,19.227,19.715,19.227c12.922,0,19.568-6.314,19.568-19.227v-35.531h-11.58V436.351z"
            />
            <path
              fill="##000"
              d="M85.188,415.599c0-2.787,1.431-5.543,7.288-5.543c3.668,0,6.924,0.98,10.184,2.402l1.289-9.406
			c-3.731-1.721-7.598-2.654-12.479-2.654c-12.419,0-17.777,7.174-17.777,16.287c0,17.316,21.402,14.004,21.402,23.619
			c0,3.695-2.327,6.18-7.219,6.18c-4.813,0-8.897-1.625-12.893-3.885l-1.506,9.609c4.158,2.441,9.305,3.805,14.905,3.805
			c11.629,0,18.208-6.459,18.208-17.004C106.59,421.126,85.188,423.915,85.188,415.599z"
            />
            <polygon
              fill="##000"
              points="54.805,432.675 38.257,401.255 27.575,401.255 27.575,455.077 38.257,455.077 38.257,423.657
			54.805,455.077 65.49,455.077 65.49,401.255 54.805,401.255 		"
            />
            <polygon
              fill="##000"
              points="249.594,401.253 249.594,410.942 260.684,410.942 260.684,455.077 272.377,455.077
			272.377,410.942 283.466,410.942 283.466,401.253 		"
            />
            <rect
              x="147.617"
              y="401.255"
              fill="##000"
              width="11.807"
              height="53.822"
            />
            <polygon
              fill="##000"
              points="165.406,410.942 176.497,410.942 176.497,455.077 188.189,455.077 188.189,410.942
			199.28,410.942 199.28,401.253 165.406,401.253 		"
            />
          </g>
        </g>
      </svg>
    </a>
  </div>
)

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

const FB = () => (
  <IconWrap>
    <a
      style={{ width: '100%', height: '100%', display: 'block' }}
      target="_tab"
      href="https://www.facebook.com/gradskagerila/"
    >
      <svg width="100%" height="100%" viewBox="0 0 430.113 430.114">
        <path
          fill="white"
          d="M158.081,83.3c0,10.839,0,59.218,0,59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805
c0,0,5.601-34.721,8.316-72.685c-7.784,0-67.784,0-67.784,0s0-42.127,0-49.511c0-7.4,9.717-17.354,19.321-17.354
c9.586,0,29.818,0,48.557,0c0-9.859,0-43.924,0-75.385c-25.016,0-53.476,0-66.021,0C155.878-0.004,158.081,72.48,158.081,83.3z"
        />
      </svg>
    </a>
  </IconWrap>
)

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
