import React from 'react'
import Link from 'gatsby-link'
import { Grid, Cell, Select } from '../components'
import moment from 'moment'

const GuerilasPage = ({ data }) => {
  const members = data.allMarkdownRemark.edges.map(v => ({
    ...v.node.frontmatter,
    url: v.node.fields.slug,
  }))

  const years = members
    .map(v => v.from)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => Number(b) - Number(a))
    .reduce((acc, cur, i) => {
      acc[cur] = []
      return acc
    }, {})

  members.forEach(v => {
    const active = getYearFromTo(v.from, v.to)
    active.forEach(x => (years[x] = [...years[x], ...v]))
  })

  return (
    <Grid>
      <Cell width={4} left={8} height={1} bottom={1}>
        <Select
          id="from"
          placeholder="Year"
          options={members
            .map(v => v.from)
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort((a, b) => Number(b) - Number(a))}
          onChange={() => console.log('chang')}
        />
      </Cell>

      {years &&
        Object.keys(years).map((v, i) => (
          <Grid key={i}>
            <Cell
              width={5}
              height={1}
              top={1}
              right={1}
              left={2}
              bottom={1}
              clear
            >
              <div style={{ background: 'black' }}>
                <h3
                  style={{
                    textAlign: 'center',
                    padding: '10px',
                    color: 'white',
                  }}
                >
                  {v}
                </h3>
              </div>
            </Cell>
            <Cell clear />
            {years[v] &&
              years[v].map((member, i) => <Member key={i} {...member} />)}
          </Grid>
        ))}
    </Grid>
  )
}

export default GuerilasPage

const getYearFromTo = (from, to) => {
  const Start = new Date(`June 26, ${from} 11:13:00`)
  const End = new Date(`June 26, ${to} 11:13:00`)
  var years = moment(End).diff(Start, 'years')
  var yearsBetween = []
  for (var year = 0; year < years; year++)
    yearsBetween.push(Start.getFullYear() + year)
  return yearsBetween
}

export const query = graphql`
  query GuerilasQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/member/" } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            image
            from
            to
          }
        }
      }
    }
  }
`

const Member = ({ name, image, url }) => (
  <Cell
    width={3}
    height={3}
    top={Math.floor(Math.random() * 2)}
    right={Math.floor(Math.random() * 2)}
    bottom={Math.floor(Math.random() * 2)}
    left={Math.floor(Math.random() * 2)}
    background={false}
    padding={false}
  >
    <Grid>
      <Link
        style={{ display: 'block', width: '100%', height: '100%' }}
        to={url || '/'}
      >
        <Cell width={2} height={2}>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={image}
            alt=""
          />
        </Cell>
        <Cell width={3} height={1} clear>
          <h5 style={{ padding: '12.5px 5px' }}>{name}</h5>
        </Cell>
      </Link>
    </Grid>
  </Cell>
)
