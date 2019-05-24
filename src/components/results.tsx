import React from "react"

import ResultItem from "./resultItem"

const Results = ({ results }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
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
