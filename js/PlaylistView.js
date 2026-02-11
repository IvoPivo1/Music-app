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
            const genre = this.songsGenreInput.value;

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

    renderPlaylists(playlists) {
        this.playlistList.innerHTML = '';

        playlists.forEach((playlist) => {
            const card = document.createElement('article');
            card.className = 'playlist-card';

            const title = document.createElement('h3');
            title.textContent = playlist.name;
            card.appendChild(title);

            const deletePlaylistBtn = document.createElement('button');
            deletePlaylistBtn.textContent = 'Delete Playlist';
            deletePlaylistBtn.className = 'delete-playlist-btn';
            deletePlaylistBtn.dataset.playlistId = playlist.id;
            card.appendChild(deletePlaylistBtn);

            const grouped = {};
            playlist.songs.forEach((song, index) => {
                if (!grouped[song.genre]) grouped[song.genre] = [];
                grouped[song.genre].push({...song, index});
            });

            Object.keys(grouped).forEach((genre) => {
                const genreTitle = document.createElement('h4')
                genreTitle.textContent = genre;
                card.appendChild(genreTitle);

                const ol = document.createElement('ol');

                grouped[genre].forEach((songObj) => {
                    const li = document.createElement('li');
                    li.textContent = `${songObj.title} - ${songObj.artist}`;

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Remove';
                    deleteBtn.className = 'delete-song-btn';
                    deleteBtn.dataset.playlistId = playlist.id;
                    deleteBtn.dataset.songIndex = songObj.index;

                    li.appendChild(deleteBtn);
                    ol.appendChild(li);

                });

                card.appendChild(ol);
            });
            
            this.playlistList.appendChild(card);
        });
    }

    bindDeletePlaylist(handler) {
        this.playlistList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-playlist-btn')) {
                const playlistId = e.target.dataset.playlistId;
                handler(playlistId);
            }
        });
    }

    bindDeleteSong(handler) {
        this.playlistList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-song-btn')) {
                const playlistId = e.target.dataset.playlistId;
                const songIndex = parseInt(e.target.dataset.songIndex, 10);
                handler(playlistId, songIndex);
            }
        });
    }

   
}
