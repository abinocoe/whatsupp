import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilePicker from "../components/filePicker"
import Instructions from "../components/instructions"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`application`, `react`]} />
    <h1>Whatsupp</h1>
    <Instructions />
    <FilePicker />
  </Layout>
)

export default IndexPage
