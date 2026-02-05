export default class PlaylistView {
    constructor() {
        this.playlistForm = document.getElementById('playlist-form');
        this.playlistNameInput = document.getElementById('playlist-name');

        this.songsTitleInput = document.getElementById('song-title');
        this.songsArtistInput = document.getElementById('song-artist');
        this.songsGenreInput = document.getElementById('song-genre');

        this.addSongBtn = document.getElementById('add-song-btn');
        this.tempSongList = document.getElementById('temp-song-list');
        this.playlistList = document.getElementById('playlist-list');
    }

    bindAddSong(handler) {
        this.addSongBtn.addEventListener('click', () => {
            const title = this.songsTitleInput.value.trim();
            const artist = this.songsArtistInput.value.trim();
            const genre = this.songsGenreInput.value.trim();

            if (!title || !artist || !genre) return;

            handler({ title, artist, genre });
        });
    }

    bindCreatePlaylist(handler) {
        this.playlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.playlistNameInput.value.trim();
            if (!name) return;

            handler(name);
        });
    }

    clearSongInputs() {
        this.songsTitleInput.value = '';
        this.songsArtistInput.value = '';
        this.songsGenreInput.value = '';
        this.songsTitleInput.focus();
    }

    renderTempSongs(songs) {
        this.tempSongList.innerHTML = '';
        songs.forEach((song) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist} [${song.genre}]`;
            this.tempSongList.appendChild(li);
        });
    }

    clearForm() {
        this.playlistNameInput.value = '';
        this.tempSongList.innerHTML = '';
    }

    renderPlaylists(playlists, getGroupedDataFn) {
        this.playlistList.innerHTML = '';

        playlists.forEach((playlist) => {
            const card = document.createElement('article');
            card.className = 'playlist-card';

            const title = document.createElement('h3');
            title.textContent = playlist.name;
            card.appendChild(title);

            const ol = document.createElement('ol');

            playlist.songs.forEach((song) => {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist} [${song.genre}]`;
                ol.appendChild(li);
            });
            card.appendChild(ol);
            this.playlistList.appendChild(card);
        });
    }

   
}
