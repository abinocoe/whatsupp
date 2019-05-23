import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilePicker from "../components/filePicker"
import Instructions from "../components/instructions"
import Results from "../components/results"

const IndexPage = () => {
  const [results, setResult] = useState(null)
  const [analysing, setAnalysing] = useState(false)
  console.log(results)
  return (
    <Layout>
      <SEO title="Home" keywords={[`application`, `react`]} />
      <h1>Whatsupp</h1>
      {!results && !analysing && <Instructions />}
      {analysing && !results && <h1>Analysing data...</h1>}
      {results && <Results results={results} />}
      <FilePicker updateResults={setResult} updateAnalysing={setAnalysing} />
    </Layout>
  )
}

export default IndexPage
