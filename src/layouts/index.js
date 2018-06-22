import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import './index.css'
import grid from '../assets/svg/grid.svg'

const Layout = ({ data, children }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:url" content={homepage} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:see_also" content={homepage} />

      <meta name="twitter:card" content={description} />
      <meta name="twitter:url" content={homepage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} /> */}

      <link
        href="https://fonts.googleapis.com/css?family=Heebo:300,400,700"
        rel="stylesheet"
      />
    </Helmet>

    <div style={{ margin: '0px auto', width: `${20 * 45 + 1}px` }}>
      <Header />
      <div
        style={{
          width: '100%',
          height: '100%',
          marginBottom: `${45}px`,
          paddingBottom: `${45.3 * 2}px`,
          background: `url(${grid})`,
          position: 'relative',
        }}
      >
        <GridOverlay />
        {children()}
      </div>
      <Footer />
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const GridOverlay = () => (
  <div
    style={{
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* <rect className='rect' width='45px' height='45px' x='45px' y='270px' /> */}
    </svg>
  </div>
)

const Footer = () => (
  <footer style={{ margin: `0px auto`, textAlign: 'center' }}>
    <a
      style={{ padding: '11.25px 0' }}
      target="_top"
      href="mailto:cityguerilla@gmail.com?Subject=Hello"
    >
      cityguerilla@gmail.com
    </a>
    <div style={{ padding: '11.25px 0' }}>
      <a
        style={{ marginRight: '11.25px' }}
        target="_tab"
        href="https://www.facebook.com/gradskagerila/"
      >
        facebook
      </a>
      <a target="_tab" href="https://www.instagram.com/city.guerilla/">
        instagram
      </a>
    </div>
    <p style={{ padding: '11.25px 0' }}>
      2017. CityGuerilla. All right reserved. ©
    </p>
  </footer>
)
