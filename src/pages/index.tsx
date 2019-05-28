import React, { useState } from "react"

import AnalysingAnimation from "../components/analysingAnimation"
import FilePicker from "../components/filePicker"
import Instructions from "../components/instructions"
import Layout from "../components/layout"
import Results from "../components/results"
import SEO from "../components/seo"

const IndexPage = () => {
  const [results, setResult] = useState(null)
  const [analysing, setAnalysing] = useState(false)
  return (
    <Layout>
      <SEO title="Home" keywords={[`application`, `react`]} />
      <div style={{ display: "flex", minHeight: 380 }}>
        {!results && !analysing && <Instructions />}
        {analysing && <AnalysingAnimation />}
        {results && !analysing && <Results results={results} />}
      </div>
      <FilePicker updateResults={setResult} updateAnalysing={setAnalysing} />
    </Layout>
  )
}

export default IndexPage
