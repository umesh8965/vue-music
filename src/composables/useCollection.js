import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPanding = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPanding.value = true

    try {
      await projectFirestore.collection(collection).add(doc)
      isPanding.value = false
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPanding.value = false
    }
  }

  return { error, addDoc, isPanding }

}

export default useCollection