<template>
 <div class="error" v-if="error" >{{ error }}</div>
 <div v-if="playlistdetail" class="playlist-details">
     <div class="playlist-info">
         <div class="cover">
             <img :src="playlistdetail.coverUrl" alt="">
         </div>
         <h2>
             {{playlistdetail.title}}
         </h2>
         <p class="username">
             {{playlistdetail.userName}}
         </p>
         <p class="description">
             {{playlistdetail.description}}
         </p>
         <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
     </div>
     <div class="song-list">
         <p>Songs list here</p>
     </div>
 </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import getDocument from "@/composables/getDocument"
import useDocument from "@/composables/useDocument"
import getUser from "@/composables/getUser"
import { computed } from "vue"
import { useRouter } from 'vue-router'

export default {
    props: ["id"],
    setup(props){

        // we can use 'playlistdetail' instand of 'document' -> just name refereance chnage.
        const { error, document: playlistdetail } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDoc } = useDocument('playlists', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()

        const ownership = computed(() => {
            return playlistdetail.value 
            && user.value 
            && user.value.uid == playlistdetail.value.userid
        })

        const handleDelete  = async () => {          
          await deleteImage(playlistdetail.value.filePath)
          await deleteDoc()
          router.push({ name: 'Home' })
        }
       
      return { error, playlistdetail, ownership, handleDelete}  
    }
}
</script>

<style>
 .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
</style>