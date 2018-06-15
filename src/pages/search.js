import React, { Component } from 'react';
import { Grid, Cell } from '../components'
import { Index } from 'elasticlunr';
import searchIcon from '../assets/svg/Search-icon.svg'

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

  getOrCreateIndex = () => this.index
    ? this.index
    : Index.load(this.props.data.siteSearchIndex.index);

  search = e => {
    const query = e.target ? e.target.value : e;
    this.index = this.getOrCreateIndex();
    const results = this.index.search(query, {
      fields: {
        name: { boost: 2, bool: "AND" },
      },
      bool: "OR",
      expand: true
    })
      .map(({ ref }) => this.index.documentStore.getDoc(ref))
    this.setState({
      query,
      results
    });
  }

  render() {
    const { query, results } = this.state

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
        {results && results.map(page => (
          <Cell key={page.name} width={4} height={4}>
            {page.name}
          </Cell>
        ))}
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
