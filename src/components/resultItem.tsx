import React from "react"

import "./resultItem.css"

const resultItem = ({ name, messageCount, totals }: any) => {
  return (
    <div className="result-card">
      <h2>{name}</h2>
      <div>
        <p className="positive">Positive: {totals.positive}%</p>
        <p className="neutral">Neutral: {totals.neutral}%</p>
        <p className="negative">Negative: {totals.negative}%</p>
      </div>
      <p style={{ marginBottom: 0 }}>{messageCount} messages total</p>
    </div>
  )
}

export default resultItem
