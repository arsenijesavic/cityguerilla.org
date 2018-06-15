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
      {/* <Search /> */}
    </div>
    <nav className="header__nav">
      <div className="header__logo-wrap">
        <Link
          style={{ display: 'block', width: '100%', height: '100%' }}
          to="/"
        >
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
  { to: '/actions', name: 'Actions' },
  { to: '/creative-board', name: 'Creative Board' },
  { to: '/tag-cloud', name: 'Tag Cloud' },
  { to: '/about', name: 'About' },
  { to: '/guerilas', name: 'Guerilas' },
  { to: '/contact', name: 'Contact' },
]



class Search extends React.Component {

  state = {}

  handleClick = e => {
    this.input.focus()
    this.setState({ isActive: true })
  }

  render() {
    const { isActive } = this.state
    return (
      <div className="header__search">
        <input
          ref={node => this.input = node}
          type="text"
          placeholder="search"
          style={{ width: `${isActive ? '100px' : '0px'}` }}
          onBlur={() => this.setState({ isActive: false })}
        />
        <svg viewBox="0 0 375.11 457.42" width="20px" onClick={this.handleClick}>
          <polygon
            className="cls-1"
            fill="none"
            stroke="black"
            strokeWidth="10"
            strokeDashoffset={isActive ? '1000' : '0'}
            points="140.63 20.29 354.79 138.57 239.85 349.17 20.63 231.29 140.63 20.29"
          />
          <line
            className="cls-2"
            fill="none"
            stroke="black"
            strokeWidth="10" x1="126.89" y1="287.73" x2="39.89" y2="442.73"
            strokeDashoffset={isActive ? '1000' : '0'}
          />
        </svg>
      </div>
    )
  }
}

// $(".search-top svg").click(function (e) {
//   $(".cls-1").css('stroke-dashoffset', '1000')
//   $(".cls-2").css('stroke-dashoffset', '1000')
//   $(".search-top input").css('width', '100px');
//   setTimeout(function () {
//     $(".search-top .search-bar-toop").focus()
//   }, 100);
// })
// $(".search-top input").blur(function () {
//   $(".search-top input").css('width', '0px');
//   $(".cls-2").css('stroke-dashoffset', '0')
//   $(".cls-1").css('stroke-dashoffset', '0')
// })