const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulWork query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulWork {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors);
      }

      // Resolve the paths to our template
      const workTemplate = path.resolve("./src/templates/work.js");

      // Then for each result we create a page.
      result.data.allContentfulWork.edges.forEach(edge => {
        createPage({
          path: `/blogpost/${edge.node.slug}/`,
          component: slash(workTemplate),
          context: {
                        slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};