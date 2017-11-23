import React from 'react'
import PlayerApp from './player-app'

export default class SonglistApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      songList: [],
      imageList: {},
      playPauseList: {},
      selectedSong: ''
    }

    this.renderSong = this.renderSong.bind(this)
    this.playPause = this.playPause.bind(this)
    this.newSongList = this.newSongList.bind(this)
  }

  componentWillMount() {

    this.newSongList(this.props.songList)

  }

  componentWillReceiveProps(nextProps) {
    this.newSongList(nextProps.songList)
  }

  async newSongList(songs) {

    const urls = songs.map(song => {
      return song.image
    })

    await Promise.all(urls.map(async (url) => {
      await fetch('/images-download/' + url)
    }))

    const imageList = urls.map(url => {
      return './images/' + url
    })
      .reduce((imageList, url, index) => {
        return Object.assign(imageList, { ['song-' + index]: url })
      }, {})

    const playPauseList = songs.reduce((playPauseList, songs, index) => {
      return Object.assign(playPauseList, { ['song-' + index]: './images/play-button.png' })
    }, {})

    await this.setState({
      imageList: imageList,
      songList: songs,
      playPauseList: Object.assign({}, playPauseList),
      newPlayPauseList: Object.assign({}, playPauseList)
    })
  }

  renderSong({ artist, audio, image, title }, index) {

    const id = 'song-' + index

    return (
      <div className="song">
        <input
          className="song-play"
          onClick={ () => {
            this.playPause(id)
            this.setState({
              selectedSong: {
                artist: artist,
                title: title,
                audio: audio,
                playPause: this.state.playPauseList[id],
                id: id
              }
            })
          }}
          type="image"
          src={this.state.playPauseList[id]}
        ></input>
        <img className="song-image" src={ this.state.imageList[id] }/>
        <div className="song-info">
          <p className="title">{ title }</p>
          <p className="artist">{ artist }</p>
        </div>
      </div>
    )
  }

  async playPause(id) {

    const currentPlayPause = this.state.playPauseList
    const currentSelectedSong = this.state.selectedSong

    if (this.state.playPauseList[id] === './images/play-button.png') {
      currentPlayPause[id] = './images/pause-button.png'
      if (currentSelectedSong.id !== id) {
        currentPlayPause[this.state.selectedSong.id] = './images/play-button.png'
      }
      this.setState({
        playPauseList: currentPlayPause
      })

      if (currentSelectedSong.playPause) {
        currentSelectedSong.playPause = this.state.playPauseList[id]
        this.setState({
          selectedSong: currentSelectedSong
        })
      }
    }

    else {
      currentPlayPause[id] = './images/play-button.png'
      this.setState({
        playPauseList: currentPlayPause
      })
      currentSelectedSong.playPause = this.state.playPauseList[id]
      this.setState({
        selectedSong: currentSelectedSong
      })
    }

  }

  render() {
    if (!this.state.songList.length) return null
    return (

      <div>
        <div id="songs">
          {this.state.songList.map(this.renderSong)}
        </div>
        <PlayerApp song={this.state.selectedSong} playPause={this.playPause} />
      </div>

    )
  }
}
