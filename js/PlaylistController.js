export default class PlaylistController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.tempSongs = [];
    }

    init() {
        this.view.renderPlaylists(this.model.getPlaylists());

        this.view.bindAddSong(this.handleAddSong.bind(this));
        this.view.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.view.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.view.bindDeleteSong(this.handleDeleteSong.bind(this));
    }

    handleAddSong(song) {
        this.tempSongs.push(song);
        this.view.renderTempSongs(this.tempSongs);
        this.view.clearSongInputs();
    }

    handleCreatePlaylist(name) {
        if (this.tempSongs.length === 0) return;

        this.model.createPlaylist(name, this.tempSongs);
        this.tempSongs = [];
        this.view.clearForm();
        this.view.renderPlaylists(this.model.getPlaylists());
    }

    handleDeletePlaylist(id) {
        this.model.deletePlaylist(id);
        this.view.renderPlaylists(this.model.getPlaylists());
    }

    handleDeleteSong(playlistId, songTitle) {
        this.model.deleteSongFromPlaylist(playlistId, songTitle);
        this.view.renderPlaylists(this.model.getPlaylists());
    }
}