import React from 'react'
import UploadApp from './upload-app'

export default class NavbarApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hiddenClass: 'hidden'
    }
    this.displayUpload = this.displayUpload.bind(this)
  }

  displayUpload() {
    if (this.state.hiddenClass === 'hidden') {
      this.setState({
        hiddenClass: ''
      })
    }
    else {
      this.setState({
        hiddenClass: 'hidden'
      })
    }
  }

  render() {
    return (
      <div id="navbar">
        <h1>WaveCave</h1>
        <button id="upload-button" onClick={this.displayUpload}>Upload</button>
        <UploadApp hiddenClass={this.state.hiddenClass} displayUpload={this.displayUpload} getSongs={this.props.getSongs}/>
      </div>
    )
  }
}
