module.exports = {
  siteMetadata: {
    title: 'City Guerilla',
    author: 'Arsenije Savic',
    description: `https://cityguerilla.org/`,
    homepage: `https://cityguerilla.org/`,
    keywords: 'art, ngo',
    image: 'https://https://v3.cityguerilla.org/assets/cover.jpg',
  },

  mapping: {
    'SitePluginConnection.packageJson.author': `MarkdownRemark`,
  },

  plugins: [
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: ['name'],
        resolvers: {
          MarkdownRemark: {
            name: node => node.frontmatter.name,
            images: node => node.frontmatter.images,
            template: node => node.frontmatter.templateKey,
          },
        },
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-92678589-1',
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/assets/images/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
