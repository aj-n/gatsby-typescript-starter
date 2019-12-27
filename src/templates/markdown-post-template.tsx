import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

/**
 * Result structure from our query
 */
type MarkdownProps = {
    data: {
        markdownRemark: {
            html: string;
            frontmatter: {
                title: string;
            };
            excerpt: string;
        };
    }
};

/**
 * Get the markdown data (lookup via slug)
 */
export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
            excerpt
        }
    }
`;

/**
 * Render the markdown page directly (with a title)
 */
export default ({ data }: MarkdownProps) => {
    const post = data.markdownRemark;
    return (
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
    );
};
