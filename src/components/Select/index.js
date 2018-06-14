import React, { Component } from 'react'
import styled from 'styled-components'

class Select extends Component {

  state = {}

  openOptions = () => {
    this.setState({ isOptionsOpen: true })
  }

  closeOptions = () => {
    this.setState({ isOptionsOpen: false })
  }

  onSelect = selected => {
    this.setState({ selected, isOptionsOpen: false })
    this.props.onChange && this.props.onChange({ id: this.props.id, value: selected })
  }

  render() {
    const { placeholder, options } = this.props
    const { isOptionsOpen, selected } = this.state

    return (
      <Wrap>
        <Icon>+</Icon>
        <Selected onMouseLeave={isOptionsOpen && this.closeOptions}>
          <p onMouseEnter={!isOptionsOpen && this.openOptions}>
            {selected ? selected : placeholder}
          </p>
          <Options isOpen={isOptionsOpen}>
            {options && options.map((option, i) =>
              <Option key={i} onClick={() => this.onSelect(option)}>
                {option}
              </Option>
            )}
          </Options>
        </Selected>
      </Wrap>
    )
  }
}

export default Select

const Wrap = styled.div`
  z-index: 800;
  &:after {
    display: table;
    content: "";
    clear: both;
  }
`

const Icon = styled.div`
  width: 45px;
  height: 44px;
  float: left;
  padding: 2.5px 0;
  margin: 0;
  background: black;
  color: white;
  text-align: center;
  font-size: 30px;
`

const Selected = styled.div`
  width: 134px;
  height: 45px;
  display: block;
  float: left;
  padding: 12px 15px;
  text-align: center;
  position: relative;

  > p {
    cursor: pointer;
  }
`

const Options = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 135px;
  height: ${props => !props.isOpen && '0'};
  max-height: 270px;
  background: black;
  transition: all 0.3s ease-in-out;
  overflow: ${props => props.isOpen ? 'scroll' : 'hidden'};
`

const Option = styled.p`
  font-size: 15px;
  color: white;
  cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
`
