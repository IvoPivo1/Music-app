export default class PlaylistModel {
  constructor() {
    this.playlists = [];
  }

  createPlaylist(name, songs) {
    const playlist = {
      id: Date.now().toString(),
      name,
      songs: [...songs], // [{titlem, artist, genre}]
    };
    this.playlists.push(playlist);
    return playlist;
  }

  getPlaylists() {
    return this.playlists;
  }

  // Helping method to group songs by genre, artist, or title
  getGroupedData(playlist) {
    const byGenre = {};
    const byArtist = {};
    const byTitle = {};
    playlist.songs.forEach((song) => {
      if (!byGenre[song.genre]) byGenre[song.genre] = [];
      byGenre[song.genre].push(song);
      if (!byArtist[song.artist]) byArtist[song.artist] = [];
      byArtist[song.artist].push(song);
      if (!byTitle[song.title]) byTitle[song.title] = [];
      byTitle[song.title].push(song);
    });
    return { byGenre, byArtist, byTitle };
  }
}
