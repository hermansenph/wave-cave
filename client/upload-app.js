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
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
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
      <UploadForm handleSubmit={ this.handleSubmit } updateArt={ this.updateArt } image={ this.state.image }/>
    )
  }
}
