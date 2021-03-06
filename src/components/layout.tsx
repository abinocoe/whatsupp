/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

// @ts-ignore
import { graphql, StaticQuery } from "gatsby"
import React, { ReactNode } from "react"

import Header from "./header"
import "./layout.css"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: any) => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="main-wrapper">
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built by
            {` `}
            <a href="https://github.com/abinocoe">abinocoe</a>
          </footer>
        </div>
      </>
    )}
  />
)

export default Layout
