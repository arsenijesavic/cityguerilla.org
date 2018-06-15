import React, { Component } from 'react'
import { Grid, Cell } from '../components'
import cn from 'classnames'
import Recaptcha from 'react-google-recaptcha'

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY
console.log(process.env)
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactPage extends Component {
  state = {
    name: '',
    email: '',
    title: '',
    message: '',
  }

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => {
    const { id, value } = e.target
    const data = { ...this.state }
    data[id] = value
    this.setState({ ...data })
  }

  handleRecaptcha = value => {
    this.setState({ 'g-recaptcha-response': value })
  }

  render() {
    const { name, email, title, message } = this.state

    return (
      <Grid>
        <Cell width={16} height={16} top={2} left={2}>
          <form
            style={{ width: '450px', margin: '0 auto' }}
            onSubmit={this.handleSubmit}
          >
            <Input
              type="text"
              label="First & Last Name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              label="Email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              label="Title"
              id="title"
              value={title}
              onChange={this.handleChange}
            />
            <Input
              type="textarea"
              label=" your message..."
              id="message"
              value={message}
              onChange={this.handleChange}
            />
            {/* <Recaptcha
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            /> */}
            <button type="submit">Submit</button>
          </form>
        </Cell>
      </Grid>
    )
  }
}

export default ContactPage

class Input extends React.Component {
  state = {
    isFocused: false,
  }

  render() {
    const { isFocused } = this.state
    const { id, type, label, value, onChange } = this.props

    const types = {
      text: (
        <input
          ref={node => (this.input = node)}
          type="text"
          id={id}
          name={id}
          value={value}
          className="mat-input"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          onChange={onChange}
        />
      ),
      textarea: (
        <textarea
          ref={node => (this.input = node)}
          id={id}
          name={id}
          value={value}
          className="mat-input"
          rows="10"
          cols="40"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          onChange={onChange}
        />
      ),
    }
    return (
      <div
        className={cn('mat-div', {
          'is-active': isFocused,
          'is-completed': isFocused || (this.input && this.input.value !== ''),
        })}
      >
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
