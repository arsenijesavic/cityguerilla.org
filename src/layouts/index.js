import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import './index.css'
import grid from '../assets/svg/grid.svg'
const Layout = ({ children }) => (
  <div>
    <Helmet>
      {/* <title>{title}</title> */}
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />

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
        rel="shortcut icon"
        type="image/x-icon"
        href="http://media.cityguerilla.org/2015/10/cropped-logo-GERILA-72dpi-400_300px.png"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Heebo"
        rel="stylesheet"
      />
    </Helmet>
    <div style={{ margin: '0px auto', width: `${20 * 45 + 1}px` }}>
      <Header />
      <div
        style={{
          width: '100%',
          height: '100%',
          marginBottom: `${45 * 2}px`,
          paddingBottom: `${45.3 * 2}px`,
          background: `url(${grid})`,
        }}
      >
        {children()}
      </div>
      <footer style={{ margin: `${45 * 2}px auto`, textAlign: 'center' }}>
        <p style={{ padding: '11.25px 0' }}>cityguerilla@gmail.com</p>
        <div style={{ padding: '11.25px 0' }}>
          <a style={{ marginRight: '11.25px' }} href="">
            facebook
          </a>
          <a href="">instagram</a>
        </div>
        <p style={{ padding: '11.25px 0' }}>
          2017. CityGuerilla. All right reserved. ©
        </p>
      </footer>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

// export const query = graphql`
//   query SiteTitleQuery {
//       site {
//     siteMetadata {
//       title
//     }
//     }
//   }
// `
