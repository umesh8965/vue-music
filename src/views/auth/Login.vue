<template>
  <form @submit.prevent="handleSubmit">
      <h3>Login form</h3>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <div ></div>
      <button v-if="!isPanding">Log in</button>
      <button v-if="isPanding" disabled>Loading</button>
  </form>
</template>

<script>

import useLogin from "@/composables/useLogin"
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { error, login, isPanding } = useLogin()
        const email = ref('')
        const password = ref('')
        const route = useRouter()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if(!error.value){
                route.push({ name: "UserPlayList" })
                console.log("User logged in")
            }
        }

        return { email, password, handleSubmit, error, isPanding}
    }
}
</script>

<style>

</style>