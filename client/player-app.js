import React from 'react'

export default class PlayerApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      songList: [{
        Title: 'Man Not Hot',
        Artist: 'Big Shaq',
        Song: 'songs/man.mp3',
        Image: './images/image-placeholder.png'
      }],
      playPause: './images/play-button.svg',
      duration: 0,
      audio: ''
    }
    this.playAudio = this.playAudio.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.scrubTime = this.scrubTime.bind(this)
    this.setAudio = this.setAudio.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.time.value = this.audio.currentTime
    }, 15)
  }

  async setAudio(song) {
    await this.setState({
      audio: song
    })
    this.audio.src = this.state.audio
    this.audio.addEventListener('loadedmetadata', () => {
      this.state.duration = this.audio.duration
      this.playAudio()
    })
  }

  async playAudio() {

    if (this.state.playPause === './images/play-button.svg') {
      await this.setState({
        playPause: './images/pause-button.png',
        duration: this.audio.duration
      })
      this.audio.play()
    }

    else {
      this.audio.pause()
      this.setState({playPause: './images/play-button.svg'})
    }

  }

  setVolume() {
    this.audio.volume = this.volume.value
  }

  scrubTime() {
    this.audio.currentTime = this.time.value
  }

  render() {
    return (
      <div id="songs">
        <div id="song-list">
          <div className="song">
            <input
              id="song-list-play"
              onClick={ () => this.setAudio(this.state.songList[0].Song) }
              type="image"
              src={ this.state.playPause }
            >
            </input>
            <img className="song-image" src={ this.state.songList[0].Image }/>
            <p> Title: { this.state.songList[0].Title }<br/> Artist: { this.state.songList[0].Artist }</p>
          </div>
        </div>
        <div id="audio-player">
          <div id="song-player-play-div">
            <input
              id="song-player-play"
              onClick={ this.playAudio }
              type="image"
              src={ this.state.playPause }
            >
            </input>
          </div>
          <div id="song-player-time-div">
            <input
              id="song-player-time"
              onChange={ this.scrubTime }
              type="range" min="0" max={ this.state.duration } step="any"
              ref={time => {
                this.time = time
              }}
            />
          </div>
          <div id="song-player-volume-div">
            <input
              id="song-player-volume"
              onChange={ this.setVolume }
              type="range" min="0" max="1" step="any"
              ref={volume => {
                this.volume = volume
              }}
            />
          </div>
          <audio
            src={ this.state.audio }
            controls=""
            ref={audio => {
              this.audio = audio
            }}
          />
        </div>
      </div>
    )
  }

}
