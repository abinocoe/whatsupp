import React from "react"

import ResultItem from "./resultItem"
import "./results.css"

const Results = ({ results }: any) => {
  return (
    <div className="results-container">
      {Object.entries(results).map(([key, value]: any) => {
        return (
          <ResultItem
            key={key}
            name={key}
            messageCount={value.count}
            totals={value.totals}
          />
        )
      })}
    </div>
  )
}

export default Results
