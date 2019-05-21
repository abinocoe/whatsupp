import React from "react"

import "./instructions.css"

const Instructions = () => {
  return (
    <div className="container">
      <div className="upload-instructions">
        <h2>iPhone</h2>
        <ol>
          <li>Select your desired chat</li>
          <li>Tap on their name at the top of the screen</li>
          <li>Scroll down </li>
          <li>Select 'Export Chat'</li>
          <li>Without Media</li>
          <li>Email the chat to yourself and upload below</li>
        </ol>
      </div>
      <div className="upload-instructions">
        <h2>Android</h2>
        <ol>
          <li>Select your desired chat</li>
          <li>Pick menu from top right corner - 3 dots</li>
          <li>Choose 'More'</li>
          <li>Email Chat</li>
          <li>Without Media</li>
          <li>Send the chat to yourself and upload below</li>
        </ol>
      </div>
    </div>
  )
}

export default Instructions
