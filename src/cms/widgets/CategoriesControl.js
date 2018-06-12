import React, { Component } from 'react'

class CategoriesControl extends Component {
  handleChange = e =>
    this.props.onChange(e.target.value.split(',').map(e => e.trim()))

  render() {
    window.__widget = this.props
    return (
      <input
        type="text"
        class="nc-controlPane-widget"
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}

export default CategoriesControl

// import React, {Component} from 'react'

// class CategoriesControl extends Component {

//   handleChange = e =>
//     this.props.onChange(e.target.value.split(',').map((e) => e.trim()));

//   render() {
//     var entry = this.props.entry;
//     var posts = entry.getIn(['data', 'actions']);
//     var bg = this.props.getAsset(posts);

//     return (
//       <input type="text"  class="nc-controlPane-widget" value={this.props.value} onChange={this.handleChange}  />
//     )
//   }
// }

// export default CategoriesControl
