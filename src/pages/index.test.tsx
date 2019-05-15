import * as React from "react"
import { shallow } from "enzyme"

import IndexPage from "./index"

describe("IndexPage", () => {
  it("renders correctly", () => {
    const tree = shallow(<IndexPage />)
    expect(tree).toMatchSnapshot()
  })
})
