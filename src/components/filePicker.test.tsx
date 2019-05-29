import { shallow } from "enzyme"
import * as React from "react"

import FilePicker from "./filePicker"

describe("FilePicker", () => {
  it("renders correctly", () => {
    const output = shallow(
      <FilePicker updateAnalysing={() => null} updateResults={() => null} />
    )
    expect(output).toMatchSnapshot()
  })
})
