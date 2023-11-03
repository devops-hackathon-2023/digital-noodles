import Axios from 'axios'

const token = process.env.NEXT_PUBLIC_API_KEY!
const url = process.env.NEXT_PUBLIC_BACKEND_URL!


const axiosInstance = Axios.create({
  baseURL: url,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: token
  }
})

export default axiosInstance