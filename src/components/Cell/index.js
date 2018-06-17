import React from 'react'

const Cell = class extends React.Component {
  state = {}

  componentDidMount() {
    const autoHeight = Math.ceil(this.node.clientHeight / 45)
    this.setState({ autoHeight, isMounted: true })
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
    const { isMounted } = this.state
    const autoHeight = Math.ceil(this.node.clientHeight / 45) + 1
    console.log(autoHeight)
    return (
      <div
        ref={node => (this.node = node)}
        style={{
          width: `${45 * width}px`,
          height: height ? `${45 * height}px` : `${45 * autoHeight}px`,
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
          //overflow: 'hidden',
          position: 'relative',
          zIndex: index ? index : 'auto',
        }}
      >
        <div
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
