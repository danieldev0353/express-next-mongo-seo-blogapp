import axios from './../axios.config'

export const signup = (user) => {
  axios.post('/signup', user).catch((e) => {
    console.error(e)
  })
}
