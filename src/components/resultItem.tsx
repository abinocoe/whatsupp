import React from "react"

const resultItem = ({ name, messageCount, totals }: any) => {
  return (
    <div
      style={{
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "papayawhip",
        padding: 20,
      }}
    >
      <h2>{name}</h2>
      <p>Positive: {totals.positive}%</p>
      <p>Neutral: {totals.neutral}%</p>
      <p>Negative: {totals.negative}%</p>
      <p>over {messageCount} messages</p>
    </div>
  )
}

export default resultItem
