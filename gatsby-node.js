/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Configuration constants
const markdownPageTemplatePath = `./src/templates/markdown-post-template.tsx`;

/**
 * Inject the 'slug' field into markdown nodes (so we can refrence it as a path)
 * @param {Object} parameters Contains the current node as well as actions on it
 */
function injectMarkdownSlugField({ node, getNode, actions }) {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
        node,
        name: `slug`,
        value: slug,
    });
}

/**
 * Called when a new node is created. Plugins wishing to extend or transform
 * nodes created by other plugins should implement this API.
 * @param {Object} parameters Contains the current node as well as actions on it
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
    switch (node.internal.type) {
        case `MarkdownRemark`: {
            injectMarkdownSlugField({ node, getNode, actions });
            break;
        }

        default: {
            // Do nothing
        }
    }
}

/**
 * Tell plugins to add pages. This extension point is called only after the initial
 * sourcing and transformation of nodes plus creation of the GraphQL schema are
 * complete so you can query your data in order to create pages.
 * @param {Object} parameters Contains the actions and graphql querier
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Get all of the markdwon pages (by their slugs)
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    // Convert each markdown page into an actual page
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(markdownPageTemplatePath),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug,
            },
        });
    });
}
