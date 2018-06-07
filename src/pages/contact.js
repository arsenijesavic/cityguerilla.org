import React from 'react'
import styled from 'styled-components'

const AboutPage = () => (
  <Grid>
    <Cell width={16} height={16} top={2} left={2}>
      <div className="wrap">
        <div className="mat-div">
          <label htmlFor="first-name" className="mat-label">
            First & Last Name
          </label>
          <input type="text" className="mat-input" id="first-name" />
        </div>

        <div className="mat-div">
          <label htmlFor="first-name" className="mat-label">
            Email
          </label>
          <input type="text" className="mat-input" id="last-name" />
        </div>

        <div className="mat-div">
          <label htmlFor="address" className="mat-label">
            Title
          </label>
          <input type="text" className="mat-input" id="address" />
        </div>
        <div className="mat-div">
          <label htmlFor="address" className="mat-label">
            your message...
          </label>
          <textarea name="message" className="mat-input" rows="10" cols="40" />
        </div>
        <button>Submit</button>
      </div>
    </Cell>
  </Grid>
)

export default AboutPage

// function contactFormAnimation() {
//   $(".mat-input").focus(function () {
//     $(this).parent().addClass("is-active is-completed");
//   });
//   $(".mat-input").focusout(function () {
//     if ($(this).val() === "")
//       $(this).parent().removeClass("is-completed");
//     $(this).parent().removeClass("is-active");
//   })
// }

const Grid = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`

const Cell = ({
  width,
  height,
  top,
  right,
  left,
  align = 'left',
  clear,
  children,
}) => (
  <div
    style={{
      width: `${45 * width}px`,
      height: `${45 * height}px`,
      marginTop: top && `${45 * top}px`,
      marginRight: right && `${45 * right}px`,
      marginLeft: left && `${45 * left}px`,
      float: align,
      clear: clear && 'both',
      padding: '1px',
    }}
  >
    <div style={{ width: '100%', height: '100%', background: 'white' }}>
      {children}
    </div>
  </div>
)
