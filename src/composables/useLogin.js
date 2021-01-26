import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPanding = ref(false)

const login = async (email, password) => {
  error.value = null
  isPanding.value = true

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPanding.value = false
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
    isPanding.value = false
  }
}

const useLogin = () => {
  return { error, login, isPanding }
}

export default useLogin