<template>
    <div class="collapse multi-collapse" :id="divId">
        Songs
        <p></p>
        <button
            type="button"
            class="btn btn-secondary btn-sm custom-style"
            @click="setCurrentArtist()">
            refresh
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in currentArtistFiles">
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
import axios from 'axios';
import AddSongToPlaylist from './AddSongToPlaylist.vue';

export default {
    props: ['divId', 'currentArtist'],
    components: {
        AddSongToPlaylist
    },
    data: function() {
        return {
            currentArtistKey: 0,
            currentArtistFiles: []
        }
    },
    methods: {
        forceRerender: function() {
            this.currentArtistKey += 1; //updating the key will force Vue to rerender component, including computed values
        },
        setCurrentArtist() {
            let config = {
                headers : {
                'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
                }
            }
            axios
            .get('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/song/?search='+this.currentArtist, config)
            .then(response => {
                this.currentArtistFiles = response.data;
            })
            .catch(error => {
                console.log('setCurrentArtist:', error);
            })            
        }
    }
}
</script>

<style>
.custom-style {
    margin-left: 10px;
}
</style>
