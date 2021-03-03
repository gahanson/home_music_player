import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showCurrentArtist: false,
    showCurrentPlaylist: false,
    showArtists: false,
    showPlaylists: false,
    showMusicPlayer: true,
    showPlaylistEditComponent: false,
    showAddPlaylistComponent: false,
    showAddSongToPlaylistComponent: false,
    playlistNames: [],
    currentPlaylistName: '---',
    currentPlaylist: [],
    artistNames: [],
    currentArtistName: 'default',
    currentArtistFiles: [],
    playlistToEdit: {},
    songToAddToPlaylist: {}

  },
  mutations: {
    showSection: function(state, sectionName) {
      switch (sectionName) {
        case 'artists':
          state.showCurrentArtist = false
          state.showCurrentPlaylist = false
          state.showArtists = true
          state.showPlaylists = false
          state.showMusicPlayer = false
          break;
        case 'playlists':
          state.showCurrentArtist = false
          state.showCurrentPlaylist = false
          state.showArtists = false
          state.showPlaylists = true
          state.showMusicPlayer = false
          break;
        case 'musicplayer':
          state.showCurrentArtist = false
          state.showCurrentPlaylist = true
          state.showArtists = false
          state.showPlaylists = false
          state.showMusicPlayer = true
          break;
        case 'currentartist':
          state.showCurrentArtist = true
          state.showCurrentPlaylist = false
          state.showArtists = false
          state.showPlaylists = false
          state.showMusicPlayer = false
          break;
        case 'currentplaylist':
          state.showCurrentArtist = false
          state.showCurrentPlaylist = true
          state.showArtists = false
          state.showPlaylists = false
          state.showMusicPlayer = false
          break;
      
        default:
          break;
      }
    },
    setShowPlaylistEditComponent(state, newValue) {
      state.showPlaylistEditComponent = newValue
    },
    setShowAddPlaylistComponent(state, newValue) {
      state.showAddPlaylistComponent = newValue
    },
    setShowAddSongToPlaylistComponent(state, newValue) {
      state.showAddSongToPlaylistComponent = newValue
    },
    setPlaylistNames(state, newList) {
      state.playlistNames = newList
    },
    setArtistNames(state, newList) {
      state.artistNames = newList
    },
    setCurrentPlaylist(state, newList) {
      state.currentPlaylist = newList
    },
    setCurrentPlaylistName(state, name) {
      state.currentPlaylistName = name
    },
    setCurrentArtistFiles(state, newList) {
      state.currentArtistFiles = newList
    },
    setCurrentArtistName(state, name) {
      state.currentArtistName = name
    },
    setPlaylistEditModalValue(state, value) {
      state.playlistToEdit = value
    },
    updatePlaylistToEdit(state, value) {
      state.playlistToEdit.name = value
    },
    setSongToAddToPlaylist(state, value) {
      state.songToAddToPlaylist = value
    }
    
  },
  actions: {
    showSection({commit}, sectionName) {
      commit('showSection', sectionName)
    },
    setShowPlaylistEditComponent({commit}, newValue) {
      switch (newValue) {
        case true:
          commit('setShowPlaylistEditComponent', true)
          break;

        case false:
          commit('setShowPlaylistEditComponent', false)
          break;
      
        default:
          break;
      }
      
    },
    setShowAddPlaylistComponent({commit}, newValue) {
      switch (newValue) {
        case true:
          commit('setShowAddPlaylistComponent', true)
          break;

        case false:
          commit('setShowAddPlaylistComponent', false)
          break;
      
        default:
          break;
      }
      
    },
    setShowAddSongToPlaylistComponent({commit}, newValue) {
      switch (newValue) {
        case true:
          commit('setShowAddSongToPlaylistComponent', true)
          break;

        case false:
          commit('setShowAddSongToPlaylistComponent', false)
          break;
      
        default:
          break;
      }
      
    },
    setPlaylistNames({commit}) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/playlist/', config)
      .then(response => {
        commit('setPlaylistNames', response.data);
      })
      .catch(error => {
          console.log('setPlaylistNames:', error);
      })            
    },
    setArtistNames({commit}) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/artist/', config)
      .then(response => {
        commit('setArtistNames', response.data);
      })
      .catch(error => {
          console.log('setArtisttNames:', error);
      })            
    },
    setCurrentPlaylist({commit}, name) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/playlistsong/?search='+name, config)
      .then(response => {
        commit('setCurrentPlaylist', response.data);
        commit('setCurrentPlaylistName', name);
      })
      .catch(error => {
          console.log('setCurrentPlaylist:', error);
      })            
    },
    setCurrentArtist({commit}, name) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_SONG_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_SONG_API_IPADDRESS+'/songapi/song/?search='+name, config)
      .then(response => {
        commit('setCurrentArtistFiles', response.data);
        commit('setCurrentArtistName', name);
      })
      .catch(error => {
          console.log('setCurrentArtist:', error);
      })            
    },
    setPlaylistEditModalValue({commit}, value) {
      commit('setPlaylistEditModalValue', value)
    },
    setSongToAddToPlaylist({commit}, value) {
      commit('setSongToAddToPlaylist', value)
    }

  },
  modules: {
  }
})
