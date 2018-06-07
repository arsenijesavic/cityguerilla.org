import React from 'react'
import Link from 'gatsby-link'
import './index.css'
import logo from '../../assets/images/logo.jpg'

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="header__top">
      <div className="header__lng">
        <a href="">en</a>
        <span> | </span>
        <a href="">sr</a>
      </div>
    </div>
    <nav className="header__nav">
      <div className="header__logo-wrap">
        <Link to="/">
          <img
            className="header__logo"
            //src="static/images/logo.jpg"
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      <ul className="header__nav-items">
        {navigation.map(({ to, name }) => (
          <li key={name} className="header__nav-item">
            <Link className="header__nav-link" to={to}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Header

const navigation = [
  { to: 'actions', name: 'Actions' },
  { to: 'creative-board', name: 'Creative Board' },
  { to: 'tag-cloud', name: 'Tag Cloud' },
  { to: 'about', name: 'About' },
  { to: 'guerilas', name: 'Guerilas' },
  { to: 'contact', name: 'Contact' },
]
