<template>
    <div id="musicplayer" v-if="$store.state.showMusicPlayer" :key="musicPlayerKey">
      <button type="button" class="btn btn-outline-dark btn-sm" @click="$store.dispatch('showSection', 'currentplaylist')">Loaded Playlist</button>
      <button type="button" class="btn btn-outline-dark btn-sm" @click="forceRerender()">refresh</button>
        <p></p>
        <div class="row bg-purple justify-content-center" style="height: 150px;">
          <div>
            
            <div class="track-name">{{ currentSongInfo.title }}</div> 
            <div class="track-artist">{{ currentSongInfo.artist }}</div> 
            
            <!-- Define the section for displaying the seek slider-->
            <div class="slider_container" style="display: table-row"> 
              <div class="currentTime" ref="currentTime" id="currentTime" style="display: table-cell;">00:00</div> 
              <input
                type="range"
                ref="progressBar"
                id="progress-bar"
                min="0"
                max=""
                value="0"
                v-on:change="changeProgressBar()"
                style="display: table-cell;"
                /> 
              <div class="durationTime" ref="durationTime" id="durationTime" style="display: table-cell;">00:00</div> 
              &nbsp;&nbsp;
            </div> 
            
          </div>  
        </div>

        <div class="row bg-grey justify-content-center" style="height: 100px;">
          <div class="well">
               
            <i class="fa fa-step-backward fa-2x" v-on:click="previousSong()" id="previous-song"></i> 
            <i :class="playPauseClass" v-on:click="playPause()" id="play-pause"></i> 
            <i class="fa fa-step-forward fa-2x" v-on:click="nextSong()" id="next-song"></i> 

            <input class="custom-style" id="shuffle" type="checkbox" v-model="shuffle" label="shuffle">
            <label class="custom-style" for="shuffle">shuffle</label>

          </div>                      
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    
      return {
        musicPlayerKey: 0,
        playIcon: 'fa fa-play-circle fa-5x',
        pauseIcon: 'fa fa-pause-circle fa-5x',
        playPauseClass: 'fa fa-play-circle fa-5x',
        currentSong: new Audio(),
        currentSongInfo: {'title':'---','artist':'---'},
        shuffle: false,
        songPlaying: false,
      }

  },
  mounted: function() {
      this.loadSong(this.playOrder[0])
  },
  methods: {
    forceRerender: function() {
        this.musicPlayerKey += 1; //updating the key will force Vue to rerender component, including computed values
    },
    loadSong: function(playlistIndex) {
        let selectedItem = this.currentPlaylist[playlistIndex];
        if (selectedItem) {

            this.currentSong = new Audio(selectedItem.remote_url);
            this.currentSongInfo.artist = selectedItem.artist.name;
            this.currentSongInfo.title = selectedItem.title;
            this.playing = false;
            this.$refs.progressBar.value = 0; 
            this.$refs.currentTime.innerHTML = (this.formatTime(Math.floor(0)));
            this.$refs.durationTime.innerHTML = (this.formatTime(Math.floor(0)));
            // this.currentSong.onended = (event) => {
            //     if (this.songIndex == (this.currentPlaylist.length - 1) ) {
            //         this.resetPlayer();
            //     } else {
            //         this.nextSong();
            //     };
            // };
            
        }
        
    },
    playPause: function() {
        if (this.songPlaying == true) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    },
    playSong: function() {
        this.playPauseClass = this.pauseIcon;
        this.currentSong.play();
        this.playing = true;
        this.startInterval();
    },
    pauseSong: function() {
        this.playPauseClass = this.playIcon;
        this.currentSong.pause();
        this.playing = false; 
        this.stopInterval();
    },
    nextSong: function() {
        
        this.songIndex++;
        
        if (this.songIndex > (this.currentPlaylist.length - 1) ) {
            this.songIndex = 0;
            return
        };
        
        this.loadSong();

    },
    previousSong: function() {

        this.songIndex--;
        if (this.songIndex < 0) {
            this.songIndex = (this.currentPlaylist.length - 1);
        };
        
        this.loadSong();

    },
    updateProgressValue: function() {
        this.$refs.progressBar.max = this.currentSong.duration;
        this.$refs.progressBar.value = this.currentSong.currentTime;
        this.$refs.currentTime.innerHTML = (this.formatTime(Math.floor(this.currentSong.currentTime)));
        if (this.$refs.durationTime.innerHTML === "NaN:NaN") {
            this.$refs.durationTime.innerHTML = "0:00";
        } else {
            this.$refs.durationTime.innerHTML = (this.formatTime(Math.floor(this.currentSong.duration)));
        }
    },
    formatTime: function(seconds) {
        let min = Math.floor((seconds / 60));
        let sec = Math.floor(seconds - (min * 60));
        if (sec < 10){ 
            sec  = `0${sec}`;
        };
        return `${min}:${sec}`;
    },
    changeProgressBar: function() {
        this.currentSong.currentTime = this.$refs.progressBar.value;
        this.$refs.currentTime.innerHTML = (this.formatTime(Math.floor(this.currentSong.currentTime)));
    },
    startInterval: function() {
        this.intervalNum = setInterval(this.updateProgressValue, 500);            
    },
    stopInterval: function() {
        clearInterval(this.intervalNum);
    }
  },
  computed: {
    currentPlaylist() {

        //   element<Object>:
        //     album<Object>: id, name, url
        //     artist<Object>: id, name, url
        //     id
        //     remote_url
        //     title
        //     url
         
        let returnData = []
        this.$store.state.currentPlaylist.forEach(element => {
            returnData.push(element.song)
        });

        return returnData;

    },
    playOrder() {

        try {

            let returnData = []
            if (this.shuffle) {

                for (var i = 0; i <= (this.currentPlaylist.length - 1); i++) {
                    returnData.push(i);
                }

                //randomly sort shuffle array using Fisher-Yates Algorithm
                for (let i = (returnData.length - 1); i > 0; i--) {
                    const j = Math.floor(Math.random() * i);
                    const temp = returnData[i];
                    returnData[i] = returnData[j];
                    returnData[j] = temp;
                }
                
            } else {
                
                for (var i = 0; i <= (this.currentPlaylist.length - 1); i++) {
                    returnData.push(i);
                }

            }
            
            return returnData
            
        } catch (error) {

            return error
            
        }

    }
  }
    
}
</script>

<style>
@import '../assets/css/font-awesome.css';

.custom-style {
    margin-left: 10px;
}
</style>