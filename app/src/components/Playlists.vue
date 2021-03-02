<template>
    <div id="playlists" v-if="$store.state.showPlaylists">
        <h2>Playlists</h2>
        <button type="button" class="btn btn-outline-dark btn-sm custom-style" @click="$store.dispatch('setShowAddPlaylistComponent', true);">+</button>
        <ul class="list-group">
            <li class="list-group-item" v-for="playlist in this.$store.state.playlistNames">
                <button
                  type="button"
                  class="btn btn-outline-dark btn-sm custom-style"
                  @click="$store.dispatch('setCurrentPlaylist', playlist.name); $store.dispatch('showSection', 'musicplayer')">
                  {{playlist.name}}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm custom-style"
                  @click="$store.dispatch('setShowPlaylistEditComponent', true); $store.dispatch('setPlaylistEditModalValue', playlist);">
                  edit
                </button>
            </li>
        </ul>
        <EditPlaylistName />
        <AddPlaylist />
    </div> 
</template>

<script>
import EditPlaylistName from './EditPlaylistName.vue';
import AddPlaylist from './AddPlaylist.vue';
export default {
    mounted: function() { 
        this.$store.dispatch('setPlaylistNames');       
    },
    components: {
        EditPlaylistName,
        AddPlaylist
    }
}
</script>

<style>
.custom-style {
    margin-left: 10px;
}
</style>