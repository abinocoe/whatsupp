import axios from "axios"
jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

import {
  calculateTotals,
  populateMessageArrays,
  sendToAPI,
  splitIntoMessages,
} from "./chatManipulator"

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

const withMessageArrays = {
  "Big Ran": {
    count: 2,
    messages:
      "Message including colon: like this. Special characters? $%^&* - 678. ",
    totals: { positive: 0, neutral: 0, negative: 0 },
  },
  abigailcoe: {
    count: 2,
    messages: "Plain message. - :). ",
    totals: { positive: 0, neutral: 0, negative: 0 },
  },
}

const withAnalysisResponse = {
  "Big Ran": {
    analysisResponse: [
      {
        sentiment: { magnitude: 0.1, score: 0.1 },
        text: {
          beginOffset: 0,
          content: "Message including colon: like this",
        },
      },
      {
        sentiment: { magnitude: 0.1, score: -0.3 },
        text: { beginOffset: 0, content: "Special characters?" },
      },
      {
        sentiment: { magnitude: 0.1, score: 0.1 },
        text: { beginOffset: 0, content: "$%^&* - 678." },
      },
    ],
    count: 2,
    messages:
      "Message including colon: like this. Special characters? $%^&* - 678. ",
    totals: { negative: 0, neutral: 0, positive: 0 },
  },
  abigailcoe: {
    analysisResponse: [
      {
        sentiment: { magnitude: 0.1, score: 0.2 },
        text: { beginOffset: 0, content: "Plain message" },
      },
      {
        sentiment: { magnitude: 0.1, score: 0.3 },
        text: { beginOffset: 0, content: " - :)" },
      },
    ],
    count: 2,
    messages: "Plain message. - :). ",
    totals: { negative: 0, neutral: 0, positive: 0 },
  },
}

describe("splitIntoMessages", () => {
  it("should split the input into array of messages with date info removed", () => {
    const output = splitIntoMessages(example)
    expect(output).toEqual(messageAndNameArray)
  })
})

describe("populateMessageArrays", () => {
  it("should organise messages into objects by user name", () => {
    const output = populateMessageArrays(messageAndNameArray)
    expect(output).toEqual(withMessageArrays)
  })
})

describe("sendToAPI", () => {
  it("should send a post request for each person in the conversation", () => {
    sendToAPI(withMessageArrays)
    mockedAxios.post.mockResolvedValue({
      data: {
        sentences: [
          { magnitude: 0.1, sentiment: 0.1 },
          { magnitude: 0.1, sentiment: 0.1 },
          { magnitude: 0.1, sentiment: 0.1 },
        ],
      },
    })
    expect(mockedAxios.post).toHaveBeenCalledTimes(2)
  })

  it("should change the object properly", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        sentences: [
          {
            sentiment: { magnitude: 0.1, score: 0.1 },
            text: {
              beginOffset: 0,
              content: "Message including colon: like this",
            },
          },
          {
            sentiment: { magnitude: 0.1, score: -0.3 },
            text: { beginOffset: 0, content: "Special characters?" },
          },
          {
            sentiment: { magnitude: 0.1, score: 0.1 },
            text: { beginOffset: 0, content: "$%^&* - 678." },
          },
        ],
      },
    })
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        sentences: [
          {
            sentiment: { magnitude: 0.1, score: 0.2 },
            text: { beginOffset: 0, content: "Plain message" },
          },
          {
            sentiment: { magnitude: 0.1, score: 0.3 },
            text: { beginOffset: 0, content: " - :)" },
          },
        ],
      },
    })
    const output = await sendToAPI(withMessageArrays)
    expect(output["Big Ran"].analysisResponse).toEqual([
      {
        sentiment: { magnitude: 0.1, score: 0.1 },
        text: {
          beginOffset: 0,
          content: "Message including colon: like this",
        },
      },
      {
        sentiment: { magnitude: 0.1, score: -0.3 },
        text: { beginOffset: 0, content: "Special characters?" },
      },
      {
        sentiment: { magnitude: 0.1, score: 0.1 },
        text: { beginOffset: 0, content: "$%^&* - 678." },
      },
    ])
    expect(output.abigailcoe.analysisResponse).toEqual([
      {
        sentiment: { magnitude: 0.1, score: 0.2 },
        text: { beginOffset: 0, content: "Plain message" },
      },
      {
        sentiment: { magnitude: 0.1, score: 0.3 },
        text: { beginOffset: 0, content: " - :)" },
      },
    ])
  })
})

describe("calculateTotals", () => {
  it("returns percentages for each option", () => {
    const output = calculateTotals(withAnalysisResponse)
    expect(output["Big Ran"].totals).toEqual({
      negative: "33.3",
      neutral: "66.7",
      positive: "0.0",
    })
    expect(output.abigailcoe.totals).toEqual({
      negative: "0.0",
      neutral: "0.0",
      positive: "100.0",
    })
  })
})
