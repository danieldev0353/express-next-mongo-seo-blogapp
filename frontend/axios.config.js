import getConfig from 'next/config'
import axios from 'axios'
import { getCookie } from './actions/auth'

const { publicRuntimeConfig } = getConfig()
const instance = axios.create({
  baseURL: publicRuntimeConfig.API,
})

instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.common['Accept'] = 'application/json'

const token = getCookie('token')
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
