import React from 'react'
import ReactDOM from 'react-dom'
import UploadApp from './upload-app'
import PlayerApp from './player-app'

// ReactDOM.render(
//   <UploadApp/>,
//   document.querySelector('#upload-form')
// )

ReactDOM.render(
  <PlayerApp/>,
  document.querySelector('#song-player')
)
