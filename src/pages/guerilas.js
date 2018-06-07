import React from 'react'
import { Grid, Cell } from '../components'

const GuerilasPage = () => {
  return (
    <Grid>
      <Cell width={20} height={1} bottom={1} background={false} >
        <Select />
      </Cell>

      <Grid>
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </Grid>
    </Grid>
  )
}

const Select = () => (
  <Grid>
    <Cell width={1} height={1} left={8} padding={false}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '30px',
          padding: '2.5px 0',
          margin: '0'
        }} >
        +
      </div>
    </Cell>
    <Cell width={3} height={1} padding={false}>
      <h4 style={{ padding: '10px 15px', textAlign: 'center' }}>all</h4>
    </Cell>
  </Grid>
)

const Member = () => (
  <Cell
    width={3}
    height={3}
    top={Math.floor(Math.random() * 2)}
    right={Math.floor(Math.random() * 2)}
    bottom={Math.floor(Math.random() * 2)}
    left={Math.floor(Math.random() * 2)}
    background={false}
    padding={false}>
    <Grid>
      <Cell width={2} height={2} padding={false}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src="http://cityguerilla.org/images/members/member_image265602.jpg"
          alt=""
        />
      </Cell>
      <Cell width={3} height={1} clear>
        <h5 style={{ padding: '12.5px 10px' }}>Dragana Krtinic</h5>
      </Cell>
    </Grid>
  </Cell>
)

export default GuerilasPage

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//         details
//       }
//     }
//   }
// `
