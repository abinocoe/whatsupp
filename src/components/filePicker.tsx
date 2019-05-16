import React, { Component, FormEvent, SyntheticEvent } from "react"

interface State {
  file?: File
  uploading: boolean
}

interface HTMLInputEvent extends SyntheticEvent {
  target: HTMLInputElement & EventTarget
}

class FilePicker extends Component<{}, State> {
  private fileReader = new FileReader()

  private handleFileRead = (_event: Event) => {
    this.setState({ uploading: false })
    const result = this.fileReader.result
    console.log(result)
  }

  private onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.fileReader.onloadstart = () => this.setState({ uploading: true })
    this.fileReader.onloadend = this.handleFileRead
    if (this.state.file) this.fileReader.readAsText(this.state.file)
  }

  private onChange = (event: HTMLInputEvent) => {
    if (event.target.files) {
      this.setState({ file: event.target.files[0] })
    }
  }

  public render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" accept=".txt" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    )
  }
}

export default FilePicker
