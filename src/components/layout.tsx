import * as React from "react";

import { graphql, Link, useStaticQuery } from "gatsby";
import { rhythm } from "../utils/typography";

type LayoutQueryResult = {
    site: {
        siteMetadata: {
            title: string;
        };
    };
};

const MainLayout: React.FC = ({ children }) => {
    const data = useStaticQuery<LayoutQueryResult>(
        graphql`
            query {
                site {
                    siteMetadata {
                        title: siteName
                    }
                }
            }
        `,
    );

    return (
        <div
            style={{
                margin: `0 auto`,
                marginBottom: rhythm(1.5),
                marginTop: rhythm(1.5),
                maxWidth: 650,
                paddingLeft: rhythm(3 / 4),
                paddingRight: rhythm(3 / 4),
            }}
        >
            <Link to={`/`}>
                <h3>{data.site.siteMetadata.title}</h3>
            </Link>
            <Link to={`/about/`}>About</Link>
            {children}
        </div>
    );
};

export default MainLayout;
