module.exports = {
  siteMetadata: {
    title: `Platzi Blog with Gatsby`,
    author: `JuanDC (tu nombre)`,
    description: `Este es un blog bien chevere.`,
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
