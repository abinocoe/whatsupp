import axios from "axios"

import { NLKEY } from "../../config"

interface MessageObject {
  messages: string
  count: number
  analysisResponse?: SentenceResponse[]
  totals: { positive: number; neutral: number; negative: number }
}

interface SentenceResponse {
  sentiment: { magnitude: number; score: number }
  text: { beginOffset: number; content: string }
}

const chatManipulator = async (text: string) => {
  const messages = splitIntoMessages(text)
  const chatsObject = populateMessageArrays(messages)
  const withResponses = await sendToAPI(chatsObject)
  const withPercentages = calculateTotals(withResponses)
  return withPercentages
}

export const splitIntoMessages = (chat: string) => {
  const array = chat.toString().split(/\n/)

  const result = array.map(message => {
    const [, ...withoutDate] = message.split(/\-\s/)
    const messageString =
      withoutDate.length > 1 ? withoutDate.join("- ") : withoutDate[0]
    return messageString
  })
  return result
}

export const populateMessageArrays = (messageArray: string[]) => {
  const messagesByNames: { [key: string]: MessageObject } = {}

  messageArray.forEach(message => {
    const initialMessagesObject = {
      count: 0,
      messages: "",
      totals: { positive: 0, neutral: 0, negative: 0 },
    }
    if (message === undefined || message[0] === "+") {
      return
    }
    const [messageSenderName, ...messageSenderMessage] = message.split(/\:\s/)
    if (messageSenderMessage[0] !== undefined) {
      if (!messagesByNames.hasOwnProperty(messageSenderName)) {
        messagesByNames[messageSenderName] = initialMessagesObject
      }
      messagesByNames[messageSenderName].messages = messagesByNames[
        messageSenderName
      ].messages.concat(`${messageSenderMessage.join(": ")}. `)
      ++messagesByNames[messageSenderName].count
    }
  })

  return messagesByNames
}

export const sendToAPI = async (object: { [key: string]: MessageObject }) => {
  const array = Object.entries(object).map(([key, value]) => {
    return axios
      .post(
        `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${NLKEY}`,
        {
          document: {
            content: value.messages,
            type: "PLAIN_TEXT",
          },
          encodingType: "UTF8",
        }
      )
      .then(
        (response: any) =>
          (object[key].analysisResponse = response.data.sentences)
      )
  })

  await Promise.all(array)
  return object
}

export const calculateTotals = (object: { [key: string]: MessageObject }) => {
  Object.entries(object).forEach(([key, value]) => {
    if (value.analysisResponse) {
      value.analysisResponse.forEach((sentence: SentenceResponse) => {
        if (sentence.sentiment.score >= 0.2) {
          ++object[key].totals.positive
        } else if (sentence.sentiment.score <= -0.2) {
          ++object[key].totals.negative
        } else {
          ++object[key].totals.neutral
        }
      })
      const totalResults = Object.values(object[key].totals).reduce(
        (acc, curr) => acc + curr,
        0
      )
      Object.entries(object[key].totals).forEach(([k, v]) => {
        // @ts-ignore
        object[key].totals[k] = ((v / totalResults) * 100).toFixed(1)
      })
    }
  })
  return object
}

export default chatManipulator
