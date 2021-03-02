<template>
    <div id="currentartist" v-if="$store.state.showCurrentArtist">
        <h2>Current Artist</h2>
        <p></p>
        {{ this.$store.state.currentArtistName }}
        <p></p>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in this.$store.state.currentArtistFiles">
                <span class="custom-style">{{ item.title }}</span>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm custom-style"
                  @click="$store.dispatch('setShowAddSongToPlaylistComponent', true); $store.dispatch('setSongToAddToPlaylist', item);">
                  +
                </button>
            </li>
        </ul>
        <AddSongToPlaylist />
    </div>
</template>

<script>
import AddSongToPlaylist from './AddSongToPlaylist.vue';

export default {
    components: {
        AddSongToPlaylist
    }
}
</script>

<style>
.custom-style {
    margin-left: 10px;
}
</style>