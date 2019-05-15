import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`application`, `react`]} />
    <h1>Whatsupp</h1>
  </Layout>
)

export default IndexPage
