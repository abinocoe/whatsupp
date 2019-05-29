import { splitIntoMessages } from "./chatManipulator"

const example = `22/05/2014, 15:47 - abigailcoe: Plain message
22/05/2014, 15:48 - Big Ran: Message including colon: like this
22/05/2014, 15:48 - Big Ran: Special characters? $%^&* - 678
22/05/2014, 15:51 - abigailcoe: - :)`

const messageAndNameArray = [
  "abigailcoe: Plain message",
  "Big Ran: Message including colon: like this",
  "Big Ran: Special characters? $%^&* - 678",
  "abigailcoe: - :)",
]

// const exampleResult = {
//   "Big Ran": {
//     count: 0,
//     messages:
//       "Message including colon: like thisSpecial characters? $%^&* - 678",
//     totals: { positive: 0, neutral: 0, negative: 0 },
//   },
//   abigailcoe: {
//     count: 0,
//     messages: "Plain message- :)",
//     totals: { positive: 0, neutral: 0, negative: 0 },
//   },
// }

describe("splitIntoMessages", () => {
  it("should split the input into array of messages with date info removed", () => {
    const output = splitIntoMessages(example)
    expect(output).toEqual(messageAndNameArray)
  })
})
