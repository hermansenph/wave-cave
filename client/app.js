import React from 'react'
import UploadForm from './upload-form'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { image: './images/image-placeholder.png' }
    this.updateArt = this.updateArt.bind(this)
  }

  updateArt(event) {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    })

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
    console.log(event.target.files[0])
  }

  render() {
    return (
      <UploadForm handleChange={ this.updateArt } updateArt={ this.updateArt } image={ this.state.image }/>
    )
  }
}
