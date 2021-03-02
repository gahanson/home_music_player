<template>
    <nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" @click="$store.dispatch('showSection', 'artists')" href="#">Artists</a>
        <a class="navbar-brand" @click="$store.dispatch('showSection', 'playlists')" href="#">Playlists</a>
        <a class="navbar-brand" @click="$store.dispatch('showSection', 'musicplayer')" href="#">Music</a>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>