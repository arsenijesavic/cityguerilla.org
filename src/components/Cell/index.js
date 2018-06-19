import React from 'react'

class Cell extends React.Component {

  state = {}

  componentDidMount() {
    this.setState({ isMounted: true })
    this.updateHeight()
  }

  componentDidUpdate() {
    this.updateHeight()
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.children !== nextProp.children)
      this.setState({ autoHeight: 'auto' })
  }

  updateHeight() {
    const autoHeight = Math.ceil(this.node.clientHeight / 45)
    if (this.state.autoHeight !== autoHeight)
      this.setState({ autoHeight })
  }

  render() {
    const {
      width,
      height,
      top,
      right,
      bottom,
      left,
      align = 'left',
      clear,
      background = true,
      padding = true,
      index,
      animation = true,
      children,
    } = this.props

    const { isMounted, autoHeight } = this.state


    return (
      <div
        ref={node => (this.node = node)}
        style={{
          width: `${45 * width}px`,
          height: height ? `${45 * height}px` : autoHeight === 'auto' ? 'auto' : `${45 * autoHeight}px`,
          marginTop: top && `${45 * top}px`,
          marginRight: right && `${45 * right}px`,
          marginBottom: bottom && `${45 * bottom}px`,
          marginLeft: left && `${45 * left}px`,
          float: align,
          clear: clear && 'both',
          padding: padding
            ? align === 'left'
              ? '1px 0px 0px 1px'
              : '1px 1px 0px 0px'
            : 'wtf',
          transition: 'all 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
          ...(animation && { transform: `scale(${isMounted ? 1 : 0})` }),
          position: 'relative',
          zIndex: index ? index : 'auto',
        }}
      >
        <div
          ref={node => (this.child = node)}
          style={{
            width: '100%',
            height: '100%',
            background: background && 'white',
            position: 'relative',
            zIndex: '1',
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default Cell
