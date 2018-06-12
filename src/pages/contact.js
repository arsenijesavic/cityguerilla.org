import React from 'react'
import { Grid, Cell } from '../components'
import cn from 'classnames'

const ContactPage = () => (
  <Grid>
    <Cell width={16} height={16} top={2} left={2}>
      <form style={{ width: '450px', margin: '0 auto' }} name="contact" method="POST" netlify>
        <Input type='text' label='First & Last Name' />
        <Input type='text' label='Email' />
        <Input type='text' label='Title' />
        <Input type='textarea' label=' your message...' />
        <div data-netlify-recaptcha />
        <button type='submit'>Submit</button>
      </form>
    </Cell>
  </Grid >
)

export default ContactPage

class Input extends React.Component {

  state = {
    isFocused: false
  }

  render() {
    const { isFocused } = this.state
    const { id, label, type } = this.props

    const types = {
      text: <input
        ref={node => this.input = node}
        type="text"
        id="first-name: "
        className="mat-input"
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />,
      textarea: <textarea
        ref={node => this.input = node}
        name="message"
        className="mat-input"
        rows="10"
        cols="40"
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />
    }
    return (
      <div className={cn('mat-div', { 'is-active': isFocused, 'is-completed': isFocused || this.input && this.input.value !== '' })}>
        <label htmlFor="first-name: " className="mat-label">
          {label}
        </label>
        {types[type]}
      </div>
    )
  }
}



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
