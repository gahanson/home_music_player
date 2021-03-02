<template>
    <div id="currentplaylist" v-if="$store.state.showCurrentPlaylist">
        <div>
            <p style="background-color: blue;">{{ this.$store.state.currentPlaylistName }}</p>
            <ul class="list-group">
                <li class="list-group-item" v-for="item in this.$store.state.currentPlaylist">
                    <span>{{item.song.title}}</span>
                    <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    style="margin-left: 10px;"
                    @click="deletePlaylistSong(item)">
                    -
                    </button>
                </li>
            </ul>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        deletePlaylistSong: async function(playlistsong) {
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
            axios
                .delete(playlistsong.url)
                .then(response => {
                    this.$store.dispatch('setCurrentPlaylist', playlistsong.playlist.name)
                })
                .catch(error => {
                  console.log('deletePlaylistSong:', error)
                })
        }
    }

}
</script>

<style>
.playlist-div {
    justify-content: center;
    overflow: scroll;
    height: 300px;
}
</style>