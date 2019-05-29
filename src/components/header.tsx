// @ts-ignore
import { Link } from "gatsby"
import React from "react"

import "./header.css"

interface Props {
  siteTitle: string
}

const Header = ({ siteTitle = "" }: Props) => (
  <header className="semantic-header">
    <div className="content-container">
      <h1 className="header-title">
        <Link to="/" className="header-link">
          {siteTitle}
        </Link>
      </h1>
      <h3 className="header-subtitle">
        {"Analyse your whatsapp chats for positivity :)"}
      </h3>
    </div>
  </header>
)

export default Header
