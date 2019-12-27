import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import Source from "../components/source";

type MarkdownEdge = {
    node: MarkdownNode;
};

type MarkdownNode = {
    id: string;

    frontmatter: {
        title: string;
        date: string;
    };

    excerpt: string;
    fields: {
        slug: string;
    };
};

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                siteName: string;
            };
        };

        allMarkdownRemark: {
            totalCount: number;
            edges: MarkdownEdge[];
        };
    };
}

export default class IndexPage extends React.Component<IndexPageProps> {
    readonly hello = `Hello`;
    public render() {
        const { siteName } = this.props.data.site.siteMetadata;
        const { allMarkdownRemark } = this.props.data;
        return (
            <Layout>
                <h1>{this.hello} TypeScript world!</h1>
                <p>
                    This site is named <strong>{siteName}</strong>
                </p>
                <h4>{allMarkdownRemark.totalCount} Posts</h4>
                {allMarkdownRemark.edges.map(({ node }: MarkdownEdge) => (
                    <div key={node.id}>
                        <Link to={node.fields.slug}>
                            <h3>
                                {node.frontmatter.title}
                                {` `}
                                <span>— {node.frontmatter.date}</span>
                            </h3>
                            <p>{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </Layout>
        );
    }
}

/**
 * Get markdown pages to display
 */
export const query = graphql`
    query {
        site {
            siteMetadata {
                siteName
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    excerpt
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
