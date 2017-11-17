import React from 'react'
import SonglistApp from './songlist-app'
import NavbarApp from './navbar-app'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      songList: []
    }
    this.getSongs = this.getSongs.bind(this)
  }

  componentWillMount() {
    this.getSongs()
  }

  async getSongs() {
    const songsResponse = await fetch('/songs')
    const songs = await songsResponse.json()

    this.setState({
      songList: songs
    })
  }

  render() {
    return (
      <div>
        <NavbarApp getSongs={this.getSongs}/>,
        <SonglistApp songList={this.state.songList}/>
      </div>
    )
  }

}
