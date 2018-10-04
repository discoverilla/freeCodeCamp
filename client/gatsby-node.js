require('dotenv').config();

const { createFilePath } = require('gatsby-source-filesystem');

const { dasherize } = require('./utils');
const { blockNameify } = require('./utils/blockNameify');
const {
  createChallengePages,
  createBlockIntroPages,
  createSuperBlockIntroPages,
  createGuideArticlePages
} = require('./utils/gatsby');

const createByIdentityMap = {
  guideMarkdown: createGuideArticlePages,
  blockIntroMarkdown: createBlockIntroPages,
  superBlockIntroMarkdown: createSuperBlockIntroPages
};

exports.onCreateNode = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;
  if (node.internal.type === 'ChallengeNode') {
    const { tests = [], block, title, superBlock } = node;
    const slug = `/learn/${dasherize(superBlock)}/${dasherize(
      block
    )}/${dasherize(title)}`;
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'blockName', value: blockNameify(block) });
    createNodeField({ node, name: 'tests', value: tests });
  }

  if (node.internal.type === 'MarkdownRemark') {
    let slug = createFilePath({ node, getNode });
    if (!slug.includes('LICENSE')) {
      createNodeField({ node, name: 'slug', value: slug });
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // Query for all markdown 'nodes' and for the slug we previously created.
    resolve(
      graphql(`
        {
          allChallengeNode(
            sort: { fields: [superOrder, order, challengeOrder] }
          ) {
            edges {
              node {
                block
                challengeType
                fields {
                  slug
                }
                id
                order
                required {
                  link
                  src
                }
                challengeOrder
                superBlock
                superOrder
                template
              }
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  block
                  superBlock
                  title
                }
                htmlAst
                id
                excerpt
                internal {
                  identity
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create challenge pages.
        result.data.allChallengeNode.edges.forEach(
          createChallengePages(createPage)
        );

        // Create intro pages
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const {
            node: {
              internal: { identity },
              frontmatter,
              fields
            }
          } = edge;
          if (!fields) {
            return null;
          }
          const { slug } = fields;
          if (slug.includes('LICENCE')) {
            return null;
          }
          try {
            const pageBuilder = createByIdentityMap[identity](createPage);
            return pageBuilder(edge);
          } catch (e) {
            console.log(`
            ident: ${identity} does not belong to a function

            ${frontmatter ? JSON.stringify(edge.node) : 'no frontmatter'}


            `);
          }
        });

        return;
      })
    );
  });
};

const RmServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, rules, plugins, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        rules.js({
          /* eslint-disable max-len */
          exclude: modulePath => {
            return (
              (/node_modules/).test(modulePath) &&
              !(/(ansi-styles|chalk|strict-uri-encode|react-freecodecamp-search)/).test(
                modulePath
              )
            );
          }
          /* eslint-enable max-len*/
        })
      ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      plugins.define({
        HOME_PATH: JSON.stringify(
          process.env.HOME_PATH || 'http://localhost:3000'
        ),
        STRIPE_PUBLIC_KEY: JSON.stringify(process.env.STRIPE_PUBLIC_KEY || '')
      }),
      new RmServiceWorkerPlugin()
    ]
  });
  if (stage !== 'build-html') {
    actions.setWebpackConfig({
      plugins: [new MonacoWebpackPlugin()]
    });
  }
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      plugins: [
        plugins.normalModuleReplacement(
          /react-monaco-editor/,
          require.resolve('./src/__mocks__/monacoEditorMock.js')
        )
      ]
    });
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-function-bind'
  });
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from'
  });
  actions.setBabelPlugin({
    name: 'babel-plugin-transform-imports',
    options: {
      '@freecodecamp/react-bootstrap': {
        transform: '@freecodecamp/react-bootstrap/lib/${member}',
        preventFullImport: true
      },
      lodash: {
        transform: 'lodash/${member}',
        preventFullImport: true
      }
    }
  });
};
