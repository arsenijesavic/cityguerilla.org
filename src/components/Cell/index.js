import React from 'react'

const Cell = ({
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
  children,
}) => (
  <div
    style={{
      width: `${45 * width}px`,
      height: `${45 * height}px`,
      marginTop: top && `${45 * top}px`,
      marginRight: right && `${45 * right}px`,
      marginBottom: bottom && `${45 * bottom}px`,
      marginLeft: left && `${45 * left}px`,
      float: align,
      clear: clear && 'both',
      padding: padding
        ? align === 'left'
          ? '1px 0px 0px 1px'
          : '1px 1px 0px 1px'
        : 'wtf',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: background && 'white',
      }}
    >
      {children}
    </div>
  </div>
)

export default Cell
