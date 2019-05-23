import React from "react"
import ResultItem from "./resultItem"

const Results = ({ results }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
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
