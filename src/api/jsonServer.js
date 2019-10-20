import axios from 'axios';

export default axios.create({
  baseURL: 'http://cdc7d4ed.ngrok.io' //update ngrokURL everytime i re-run my app
});