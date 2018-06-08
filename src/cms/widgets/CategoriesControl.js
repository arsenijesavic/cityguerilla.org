import React, {Component} from 'react'

class CategoriesControl extends Component {

  handleChange = e =>
    this.props.onChange(e.target.value.split(',').map((e) => e.trim()));

  render() {
    console.log(this.props.entry)
    console.log(this.props)
    return (
      <input type='text' onChange={this.handleChange}  />
    )
  }
}

export default CategoriesControl