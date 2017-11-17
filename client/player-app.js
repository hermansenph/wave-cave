import React from 'react'

export default class PlayerApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playPause: '',
      duration: 0,
      title: '',
      artist: '',
      song: '',
      id: ''
    }
    this.playAudio = this.playAudio.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.scrubTime = this.scrubTime.bind(this)
  }

  async componentDidMount() {

    setInterval(() => {
      this.time.value = this.audio.currentTime
    }, 15)

    this.audio.addEventListener('loadedmetadata', () => {
      this.setState({duration: this.audio.duration})
      this.audio.play()
    })

  }

  async componentWillReceiveProps(nextProps) {

    if (this.props.song.audio !== nextProps.song.audio) {
      this.audio.pause()
      if (this.props.song.audio !== undefined) {
        fetch('/songs/' + this.props.song.audio, {method: 'delete'})
      }
      await fetch('/songs-download/' + nextProps.song.audio)
      this.setState({
        title: nextProps.song.title,
        artist: nextProps.song.artist,
        song: nextProps.song.audio,
        playPause: nextProps.song.playPause,
        id: nextProps.song.id
      })
    }

    else {
      this.setState({
        playPause: nextProps.song.playPause
      })
      this.playAudio()
    }

  }

  playAudio() {
    if (this.state.playPause === './images/play-button.png') {
      this.audio.play()
    }

    else {
      this.audio.pause()
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
      <div id="song-player">
        <div id="song-player-play-div">
          <input
            id="song-player-play"
            onClick={ () => {
              this.props.playPause(this.state.id)
              this.playAudio()
            }}
            type="image"
            src={ this.state.playPause }
          >
          </input>
        </div>
        <div id="song-player-time-div">
          <div>
            <p className="player-song-info player-song-title">{this.state.title}</p>
            <p className="player-song-info">{' - '}</p>
            <p className="player-song-info player-song-artist">{this.state.artist}</p>
          </div>
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
          src={ '/songs/' + this.state.song }
          controls=""
          ref={audio => {
            this.audio = audio
          }}
        />
      </div>
    )
  }

}
