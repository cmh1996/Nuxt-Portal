import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

//客户端的axios
export let clientAxios = axios.create(options);

//server端的axios
export let serverAxios = axios.create({});