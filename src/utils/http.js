import axios from 'axios'
import { message } from 'antd'
const GET = (url, config) => {
  const params = config.params || {}
  const timeout = config.timeout || 60000
  return new Promise((res, rej) => {
    axios
      .get(url, {
        params,
        timeout
      })
      .then(response => {
        const datatotal = response.data
        const { state, data } = datatotal
        if (state === 1) {
          res(data)
        } else {
          rej(datatotal.message)
          message.error(datatotal.message)
        }
      })
      .catch(err => {
        const str = err.toString()
        message.error(str)
        rej(str)
      })
  })
}

const POST = (url, config) => {
  const data = config.data || {}
  const timeout = config.timeout || 60000
  return new Promise((res, rej) => {
    axios
      .post(url, data, {
        timeout
      })
      .then(response => {
        const datatotal = response.data
        const { state, data } = datatotal
        if (state === 1) {
          res(data)
        } else {
          rej(datatotal.message)
          message.error(datatotal.message)
        }
      })
      .catch(err => {
        const str = err.toString()
        message.error(str)
        rej(str)
      })
  })
}

export default {
  GET,
  POST
}
