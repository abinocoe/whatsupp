import * as React from "react"
import { shallow } from "enzyme"

import FilePicker from "./filePicker"

describe("FilePicker", () => {
  it("renders correctly", () => {
    const output = shallow(<FilePicker />)
    expect(output).toMatchSnapshot()
  })
})
