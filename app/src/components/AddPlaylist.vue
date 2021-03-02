<template>
  <div v-if="$store.state.showAddPlaylistComponent">
      <transition name="modal-playlist">
    <div class="modal-mask-playlist">
      <div class="modal-wrapper-playlist">
        <div class="modal-container-playlist">
          <div class="modal-body-playlist">
            <slot name="body-playlist">
            </slot>
          </div>
          <hr>

          <div>
          
          <form v-on:submit.prevent="addPlaylist()">
            <div class="form-group">
            <label for="name">Name</label>
            <input
                type="text"
                class="form-control"
                ref="newplaylistname"
                placeholder="Enter Playlist Name"
                required="required" >
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>

          </div>

          <div class="modal-footer-playlist">
            <slot name="footer-playlist">
              <button class="modal-default-button-playlist" @click="closeModal()">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    closeModal() {
      this.$store.dispatch('setPlaylistNames');
      this.$store.dispatch('setShowAddPlaylistComponent', false)
    },
    addPlaylist: function() {
      let config = {
          headers : {
          'Content-Type' : 'multipart/form-data'
      }
      }
      var upload = new FormData();
      upload.append('name', this.$refs.newplaylistname.value);
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      axios
          .post('http://192.168.0.58:9070/songapi/playlist/', upload, config)
          .then(response => {
            this.$store.dispatch('setPlaylistNames');
          })
          .catch(error => {
            console.log('addPlaylist:', error)
              
          })
    }
  }

}
</script>

<style>
@import '../assets/css/modal-playlist.css';
</style>