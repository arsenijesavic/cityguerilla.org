import React from 'react'
import { Grid, Cell } from '../components'

const NotFoundPage = () => (
  <Grid>
    <Cell width={8} height={2}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Cell>
  </Grid>
)

export default NotFoundPage
