export default class PlaylistModel {
  constructor() {
    this.playlists = this.load() || [];
  }

  createPlaylist(name, songs) {
    const playlist = {
      id: Date.now().toString(),
      name,
      songs: [...songs], // [{titlem, artist, genre}]
    };
    this.playlists.push(playlist);
    this.save();
    return playlist;
  }

  getPlaylists() {
    return this.playlists;
  }

  deletePlaylist(id) {
    this.playlists = this.playlists.filter((p) => p.id !== id);
    this.save();
  }

   deleteSongFromPlaylist(playlistId, songIndex) {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (!playlist) return;
    playlist.songs.splice(songIndex, 1);
    this.save();
  }

  save() {
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }
  load() {
    const data = localStorage.getItem('playlists');
    return data ? JSON.parse(data) : null;
  }

}
