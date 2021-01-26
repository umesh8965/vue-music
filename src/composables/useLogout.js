import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null)
const isPanding  =ref(false)

// logout function
const logout = async () => {
  error.value = null

  try {
    await projectAuth.signOut()
    isPanding.value = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPanding.value = false
  }
}

const useLogout = () => {
  return { error, logout, isPanding }
}

export default useLogout