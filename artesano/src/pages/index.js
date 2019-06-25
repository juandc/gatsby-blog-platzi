import React from 'react'
import { Link, graphql } from 'gatsby'

export const listQuery = graphql`
query ListQuery {
  allMarkdownRemark {
    edges {
      node {
        fields{
          slug
        }
        frontmatter {
          title
          description
          date
        }
      }
    }
  }
}
`;

export default function IndexPage(props) {
  const postList = props.data.allMarkdownRemark;

  return (
    <>
      <h1>Home!</h1>
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} className="link" >
          <div className="post-list">
            <h3>{node.frontmatter.title}</h3>
            <i>
              {node.frontmatter.description}
            </i> - <small>{node.frontmatter.date}</small>
          </div>
        </Link>
      ))}
    </>
  );
}
