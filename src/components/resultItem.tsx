import React from "react"

import "./resultItem.css"

const resultItem = ({ name, messageCount, totals }: any) => {
  return (
    <div className="result-card">
      <h2 style={{ color: "#5b5259" }}>{name}</h2>
      <div>
        <p style={{ color: "green" }}>Positive: {totals.positive}%</p>
        <p style={{ color: "orange" }}>Neutral: {totals.neutral}%</p>
        <p style={{ color: "red" }}>Negative: {totals.negative}%</p>
      </div>
      <p style={{ marginBottom: 0 }}>{messageCount} messages total</p>
    </div>
  )
}

export default resultItem
