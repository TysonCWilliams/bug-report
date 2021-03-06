import Axios from 'axios'

const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000/api/' : '/'
export const api = Axios.create({
  baseURL,
  timeout: 10000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
