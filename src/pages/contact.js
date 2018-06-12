import React, { Component } from 'react'
import { Grid, Cell } from '../components'
import cn from 'classnames'

class ContactPage extends Component {

  state = {}

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, title, message } = this.state
    return (
      <Grid>
        <Cell width={16} height={16} top={2} left={2}>
          <form style={{ width: '450px', margin: '0 auto' }} onSubmit={this.handleSubmit}>
            <Input type='text' label='First & Last Name' value={name} name='name' onChange={this.handleChange} />
            <Input type='text' label='Email' name='email' value={email} onChange={this.handleChange} />
            <Input type='text' label='Title' name='title' value={title} onChange={this.handleChange} />
            <Input type='textarea' label=' your message...' value={message} name='message' onChange={this.handleChange} />
            <div data-netlify-recaptcha />
            <button type='submit'>Submit</button>
          </form>
        </Cell>
      </Grid >
    );
  }
}

export default ContactPage

class Input extends React.Component {

  state = {
    isFocused: false
  }

  render() {
    const { isFocused } = this.state
    const { id, type, label, value, onChange } = this.props

    const types = {
      text: <input
        ref={node => this.input = node}
        type="text"
        name={id}
        value={value}
        className="mat-input"
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
        onChange={onChange}
      />,
      textarea: <textarea
        ref={node => this.input = node}
        name={id}
        value={value}
        className="mat-input"
        rows="10"
        cols="40"
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
        onChange={onChange}
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
