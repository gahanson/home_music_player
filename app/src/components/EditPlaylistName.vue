<template>
  <div v-if="$store.state.showPlaylistEditComponent">
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
              
              <form>
                <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Playlist Name"
                    v-model="playlistName"
                    required="required" >
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="updatePlaylistOnDatabase()">Update</button>
              </form>
              <p></p>
              <button class="btn btn-danger" v-on:click="deletePlaylistOnDatabase()">Delete</button>

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
    deletePlaylistOnDatabase: function() {
      let theurl = this.$store.state.playlistToEdit.url;
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      axios
        .delete(theurl)
        .then(response => {
            this.$store.dispatch('setPlaylistNames');
            this.$store.dispatch('setPlaylistEditModalValue', {});
        })
        .catch(error => {
          console.log('deletePlaylistOnDatabase', error)
        })
    },
    updatePlaylistOnDatabase: function() {
      let config = {
          headers : {
          'Content-Type' : 'multipart/form-data'
        }
      }
      var upload = new FormData();
      upload.append('name', this.$store.state.playlistToEdit.name);
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      axios
        .put(this.$store.state.playlistToEdit.url, upload, config)
        .then(response => {
          this.$store.dispatch('setPlaylistNames');
          this.$store.dispatch('setPlaylistEditModalValue', {});
        })
        .catch(error => {
            console.log(error)
        })
    },
    closeModal() {
      this.$store.dispatch('setPlaylistNames');
      this.$store.dispatch('setShowPlaylistEditComponent', false)
    }
  },
  computed: {
    playlistName: {
      get() {
        return this.$store.state.playlistToEdit.name },
      set(value) {
        this.$store.commit('updatePlaylistToEdit', value)
      }
    }
  }
  
}
</script>

<style>
@import '../assets/css/modal-playlist.css';
</style>