import React, {
  FormEvent,
  FunctionComponent,
  SyntheticEvent,
  useState,
} from "react"

import chatManipulator from "../lib/chatManipulator"

interface HTMLInputEvent extends SyntheticEvent {
  target: HTMLInputElement & EventTarget
}

const FilePicker: FunctionComponent = () => {
  const fileReader = new FileReader()
  const [file, setFile] = useState<File>()

  // tslint:disable-next-line: variable-name
  const handleFileRead = async (_event: Event) => {
    const result = fileReader.result
    let manipulatedResult
    if (typeof result === "string") {
      manipulatedResult = await chatManipulator(result)
      console.log(manipulatedResult)
    }
  }

  const onChange = (event: HTMLInputEvent) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    fileReader.onloadend = handleFileRead
    if (file) {
      fileReader.readAsText(file)
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" accept=".txt" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default FilePicker
