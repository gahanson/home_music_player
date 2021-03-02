<template>
    <div id="artists" v-if="$store.state.showArtists">
        <h2>Artists</h2>
        <ul>
            <li class="pointer" v-for="artist in this.$store.state.artistNames">
                <a @click="$store.dispatch('setCurrentArtist', artist.name); $store.dispatch('showSection', 'currentartist')" href="#">{{artist.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    mounted: function() { 
        this.$store.dispatch('setArtistNames');       
    }
}
</script>

<style>

</style>