<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
     <div v-if="playlistdetail">
      <ListView :playlists="playlistdetail" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
    components: { ListView },
    setup(){
        const { user } = getUser()
        const { documents: playlistdetail } = getCollection(
        'playlists', 
        ['userid', '==', user.value.uid]
    
    )
    console.log(playlistdetail)

    return { playlistdetail }
    }
}
</script>
<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>