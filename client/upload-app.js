import React from 'react'
import UploadForm from './upload-form'

export default class UploadApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: './images/image-placeholder.png',
      imageDone: null,
      song: '',
      songDone: null
    }
    this.updateArt = this.updateArt.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    event.persist()
    const formData = new FormData(event.target)
    this.props.displayUpload()
    await fetch('/upload', {
      method: 'POST',
      body: formData
    })
    this.props.getSongs()
    event.target.reset()
    this.setState({image: './images/image-placeholder.png'})
  }

  updateArt(event) {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    })

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
  }

  render() {
    return (
      <UploadForm
        handleSubmit={ this.handleSubmit }
        updateArt={ this.updateArt }
        image={ this.state.image }
        hiddenClass={ this.props.hiddenClass }/>
    )
  }
}
