export default class playlistView {
    constructor() {
        this.playlistForm = document.getElementById('playlist-form');
        this.playlistNameInput = document.getElementById('playlist-name');
        this.songsTitleInput = document.getElementById('songs-title');
        this.songsArtistInput = document.getElementById('songs-artist');
        this.songsGenreInput = document.getElementById('songs-genre');
        this.addSongBtn = document.getElementById('add-song-btn');
        this.tempSongList = document.getElementById('temp-song-list');
        this.playlistList = document.getElementById('playlist-list');
    }

    bindAddSong(handler) {
        this.addSongBtn.addEventListener('click', () => {
            const title = this.songsTitleInput.value.trim();
            const artist = this.songsArtistInput.value.trim();
            const genre = this.songsGenreInput.value.trim();

            if (title || artist || genre) return; // Prevent adding empty songs

            handler({ title, artist, genre });
        });
    }

    bindCreatePlaylist(handler) {
        this.playlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.playlistNameInput.value.trim();
            if (!name) return; // Prevent creating playlist without a name
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
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist} [${song.genre}]`;
            li.dataset.index = index;
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
            const card = document.createElement('articlee');
            card.className = 'playlist-card';
            const title = document.createElement('h3');
            title.textContent = playlist.name;
            card.appendChild(title);

            const {byGenre, byArtist, byTitle} = getGroupedDataFn(playlist);

            const genreSection = this.createGroupedSection('By Genre', byGenre);
            const artistSection = this.createGroupedSection('By Artist', byArtist);
            const titleSection = this.createGroupedSection('By Title', byTitle);

            this.playlistList.appendChild(card);
        });
    }   

    createGroupElement(label, groupObject) {
        const wrapper = document.createElement('div');
        wrapper.className = 'playlist-group';

        const heading = document.createElement('h4');
        heading.textContent = label;
        wrapper.appendChild(heading);

        const list = document.createElement('ul');
        Object.keys(groupObject).forEach((key) => {
            const li = document.createElement('li');
            const songs = groupObject[key].map(song => `${song.title} - ${song.artist} [${song.genre}]`).join(', ');
            li.textContent = `${key}: ${songs}`;
            list.appendChild(li);
        });
        wrapper.appendChild(list);
        return wrapper;
    }
}

