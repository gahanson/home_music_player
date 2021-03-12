<template>
    <div id="artists" v-if="$store.state.showArtists">
        <h2>Artists</h2>
        <button type="button" class="btn btn-outline-primary btn-sm" v-on:click="refreshSongs()">Refresh</button>
        <div class="alert alert-primary" role="alert" v-if="this.$store.state.refreshInprogress">
        This is a primary alert—check it out!
        </div>
        <ul>
            <li class="pointer" v-for="artist in this.$store.state.artistNames">
                <a @click="$store.dispatch('setCurrentArtist', artist.name); $store.dispatch('showSection', 'currentartist')" href="#">{{artist.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted: function() { 
        this.$store.dispatch('setArtistNames');       
    },
    methods: {
        refreshSongs: function() {
            this.$store.commit('setRefreshInprogress', true)
            let config = {
                headers : {
                'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
                }
            }
            // console.log('headers', config)
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
            axios
                .put('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/refresh/', '{}', config) //axios assumes second param is data for post and put
                .then(response => {
                    // console.log(response.data)
                    this.$store.dispatch('setArtistNames');
                    this.$store.commit('setRefreshInprogress', false)
                })
                .catch(error => {
                    console.log('refreshSongs', error)
                })
        }
    }
}
</script>

<style>

</style>
