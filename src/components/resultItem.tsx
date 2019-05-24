import React from "react"

const resultItem = ({ name, messageCount, totals }: any) => {
  return (
    <div
      style={{
        backgroundColor: "papayawhip",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        maxWidth: "30%",
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
