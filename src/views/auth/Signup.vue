<template>
   <form @submit.prevent="handleSubmit">
      <h3>Sign up form</h3>
      <input type="text" placeholder="Display Name" v-model="displayName">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
      <button>Sign up</button>
  </form>
</template>

<script>

import { ref } from 'vue'
import useSignup from "@/composables/useSignup"

export default {
  setup(){
    const email = ref('')
    const displayName = ref('')
    const password = ref('')
    const { error, signup, isPanding } = useSignup()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)

      if(!error.value){
        console.log("User signed up")
      }
    } 

    return { error, email, password, displayName, isPanding, handleSubmit}
  }
}
</script>

<style>

</style>