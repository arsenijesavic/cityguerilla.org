import React, { Component, Children } from 'react'
import { Grid, Cell } from '../components'

const ActionPage = ({ data }) => {
  const { title, description, images, tags, members } = { ...data.markdownRemark.frontmatter }
  return (
    <Grid>
      <Cell width={6} height={6} top={1} left={1}>
        <div style={{ padding: '15px' }}>
          <h1 style={{ fontSize: '24px', minHeight: `${4 * 45}px` }}>{title}</h1>
          <h3 style={{ fontWeight: '300', paddingBottom: '5px' }}>Workshop</h3>
          <h5 style={{ fontWeight: '300' }}>2015</h5>
          <h5 style={{ fontWeight: '300' }}>Savamala, Beograd</h5>
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
        <div style={{ padding: '15px', background: 'black', textAlign: 'center' }}>
          <p style={{ color: 'white', textTransform: 'uppercase', fontSize: '0.707em', fontWeight: 'bold' }}>
            The Symphony of Savamala
          </p>
        </div>
      </Cell>

      <Cell width={1} height={1} left={11} >
        <div style={{ background: 'black', width: '100%', height: '100%' }}>
          F
        </div>
      </Cell>

      <Cell width={1} height={1} >
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
            padding: '30px'
          }}
        >
          <p>{description}</p>
        </div>
      </Cell>


      <Cell width={7} top={2} left={1}>
        <div style={{ width: '45px', height: '45px', background: 'black' }}>
          <h1 style={{ fontSize: '27px', padding: '2.5px 15px', color: 'white', fontWeight: '100', }}>#</h1>
        </div>
        <div style={{ padding: '2.5px 30px' }}>
          {tags && tags.map((tag, i) =>
            <span key={i}
              style={{ marginRight: '5px', display: 'inline-block', fontSize: '0.707em', textTransform: 'uppercase' }}>
              {tag
              }</span>
          )}
        </div>
      </Cell>

      <Cell width={7} top={2} left={1}>
        <div style={{ width: '135px', height: '45px', background: 'black' }}>
          <h1 style={{
            fontSize: '20px', padding: '8px 15px', color: 'white', fontWeight: '100',
            textTransform: 'lowercase', textAlign: 'center'

          }}>
            Members
          </h1>
        </div>
        <ul style={{ padding: '5px 10px' }}>
          {members && members.map((member, i) =>
            <li style={{ display: 'block', marginBottom: '5px' }}>
              <img
                style={{ width: '35px', height: '35px', objectFit: 'cover', float: 'left' }}
                src="http://cityguerilla.org/images/members/member_image409246.jpg"
                alt="" />
              <h5 style={{ float: 'left', padding: '10px', fontWeight: '700' }}>{member}</h5>
              <br style={{ clear: 'both' }} />
            </li>
          )}
        </ul>

        {/* http://cityguerilla.org/images/members/member_image409246.jpg */}
        {console.log(members)}
      </Cell>

    </Grid>
  )
}

export default ActionPage

export const ActionQuery = graphql`
  query ActionBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        dateFrom
        tags
        members
        images {
          image
        }
      }
    }
  }
`

