import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const instance = axios.create({
  baseURL: publicRuntimeConfig.API,
})

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

export default instance
