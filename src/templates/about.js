import React from 'react'
import { Grid, Cell } from '../components'

const AboutPage = ({ data }) => {
  const  { details } = { ...data.markdownRemark.frontmatter }

  return (
    <Grid>
      <Cell width={4} height={3}>
        <h2 style={{ fontSize: '27px', padding: '8px 30px 21px 21px' }}>
          hello we are city guerillas
        </h2>
      </Cell>

      <Cell width={2} height={4} top={2}>
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

      <Cell width={1} height={1} left={1} top={2}>
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          F
        </div>
      </Cell>

      <Cell width={1} height={1} left={10}>
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          F
        </div>
      </Cell>

      <Cell width={10} height={15} left={2} clear>
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

      <Cell width={7} height={17} top={-2} align="right">
        timeline
      </Cell>

      <Cell width={15} height={7} top={2} left={2} clear>
        PROJECT
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
      }
    }
  }
`
