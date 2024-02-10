import axios from 'axios'

const http=axios.create({
    baseURL:process.env.REACT_APP_baseURL,
    header:{"content-type":"application/json"}
})
export default http
