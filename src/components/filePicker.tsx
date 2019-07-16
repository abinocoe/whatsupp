import React, {
  FormEvent,
  FunctionComponent,
  SyntheticEvent,
  useState,
} from "react"

import chatManipulator from "../lib/chatManipulator"

import "./filePicker.css"

interface HTMLInputEvent extends SyntheticEvent {
  target: HTMLInputElement & EventTarget
}

const FilePicker: FunctionComponent<{
  updateResults: (results: any) => void
  updateAnalysing: (isAnalysing: boolean) => void
}> = ({ updateAnalysing, updateResults }) => {
  let fileReader: FileReader
  if (typeof window !== `undefined`) {
    fileReader = new FileReader()
  }

  const [file, setFile] = useState<File>()

  // tslint:disable-next-line: variable-name
  const handleFileRead = async (_event: Event) => {
    const result = fileReader.result
    let manipulatedResult
    if (typeof result === "string") {
      updateAnalysing(true)
      manipulatedResult = await chatManipulator(result)
      updateResults(manipulatedResult)
      updateAnalysing(false)
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
    <div className="file-picker-container">
      <form onSubmit={onFormSubmit} className="form">
        <h1 className="form-title">File upload</h1>
        <div className="form-container">
          <label htmlFor="file_upload" className="label">
            Choose file
          </label>
          <input
            id="file_upload"
            className="file-input"
            type="file"
            accept=".txt"
            onChange={onChange}
          />
          {file && <span className="file-name">{file.name}</span>}
        </div>

        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  )
}

export default FilePicker
