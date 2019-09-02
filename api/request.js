import axios from 'axios'
import config from './config'

const instance = axios.create({
  baseURL: config.baseUrl
})
instance.defaults.timeout = config.timeout

export default instance
