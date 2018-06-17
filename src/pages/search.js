import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Grid, Cell } from '../components'
import { Index } from 'elasticlunr'
import searchIcon from '../assets/svg/Search-icon.svg'
import styled from 'styled-components'
import moment from 'moment'

class SearchPage extends Component {
  state = {
    query: ``,
    results: [],
  }

  componentDidMount() {
    if (this.props.history.location.search) {
      const query = this.props.history.location.search.replace('?q=', '')
      this.search(query)
      this.setState({ query })
    }
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.data.siteSearchIndex.index)

  search = e => {
    const query = e.target ? e.target.value : e
    this.index = this.getOrCreateIndex()
    const results = this.index
      .search(query, {
        fields: {
          name: { boost: 2, bool: 'AND' },
        },
        bool: 'OR',
        expand: true,
      })
      .map(({ ref }) => this.index.documentStore.getDoc(ref))
    this.setState({
      query,
      results,
    })
  }

  render() {
    const { query, results } = this.state
    const actions = results.filter(v => v.template === 'action')
    const projects = results.filter(v => v.template === 'project')
    const members = results.filter(v => v.template === 'member')

    return (
      <Grid>
        <Cell width={12} height={2} top={1} left={1} background={false}>
          <input
            style={{
              background: ` white url(${searchIcon}) no-repeat 9px center`,
              backgroundSize: '20px 20px',
            }}
            value={query}
            onChange={this.search}
            type="search"
            placeholder="search"
          />
        </Cell>
        <Cell clear />


        <Cell width={8} top={2} left={1}>
          <CellTitle>Actions</CellTitle>
          <div style={{ padding: '15px 30px' }}>
            {actions &&
              actions
                .sort((a, b) => new Date(a.from) - new Date(b.from))
                .map((project, i) => (
                  <Link
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    to={project.url}
                  >
                    <p
                      style={{
                        margin: '7.5px 0',
                        whiteSpace: 'nowrap',
                        width: '19em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {moment(project.from, 'YYYY').year()}: {project.name}
                    </p>
                  </Link>
                ))}
          </div>
        </Cell>

        <Cell width={8} top={2} left={1}>
          <CellTitle>Projects</CellTitle>
          <div style={{ padding: '15px 30px' }}>
            {projects &&
              projects
                .sort((a, b) => new Date(a.from) - new Date(b.from))
                .map((project, i) => (
                  <Link
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    to={project.url}
                  >
                    <p
                      style={{
                        margin: '7.5px 0',
                        whiteSpace: 'nowrap',
                        width: '19em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {moment(project.from, 'YYYY').year()}: {project.name}
                    </p>
                  </Link>
                ))}
          </div>
        </Cell>

        <Cell width={18} top={2} left={1}>
          <CellTitle>Members</CellTitle>
          <div style={{ padding: '15px 30px' }}>
            {members &&
              members.map((member, i) => (
                <Link
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  to={member.url}
                >
                  <p
                    style={{
                      margin: '7.5px 0',
                      whiteSpace: 'nowrap',
                      width: '19em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {member.name}
                  </p>
                </Link>
              ))}
          </div>
        </Cell>

      </Grid>
    )
  }
}

export default SearchPage

export const query = graphql`
  query SearchQuery {
    siteSearchIndex {
      index
    }
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
