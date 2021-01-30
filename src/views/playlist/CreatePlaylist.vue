<template>
 <form @submit.prevent="handleSubmit">
     <h4>Create a New Playlist</h4>
      <input type="text" required placeholder="Playlist title" v-model="title">
      <textarea required placeholder="Playlist description..." v-model="description"></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange">
      <div class="error">{{ fileerror }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
 </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from "@/composables/useStorage"
import useCollection from "@/composables/useCollection"
import getUser from "@/composables/getUser"
import {timestamp} from "@/firebase/config"

export default {
 setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileerror = ref(null)
    const { uploadImage, url, filePath } = useStorage()
    const { error, addDoc} = useCollection("playlists")
    const { user } = getUser()
    const isPending = ref(false)

    //allowd file type
    const filetype = ['image/png', 'image/jpeg']
    const handleSubmit =  async () => {
        if(file.value){
            isPending.value = true
            await uploadImage(file.value)
            await addDoc({
              title:title.value,
              description:description.value,
              userid: user.value.uid,
              userName: user.value.displayName,
              coverUrl: url.value,
              filePath: filePath.value,
              songs: [],
              createdAt: timestamp() 
            })
            isPending.value = false
            if(!error.value){
              console.log("playlist added")              
            }

        }     
    }

    const handleChange = (e) => {
        const selected = e.target.files[0]
        console.log(selected)
        if(selected && filetype.includes(selected.type)){
            file.value = selected
        } else{
            file.value = null
            fileerror.value = "Please Select image(png/jpeg)."
        }
    }
    
    return { title, description, handleSubmit, handleChange, fileerror }
  }
}
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>