import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const host = 'http://localhost:8000/api';

const userRequester = {
  register: (username,password,avatar) => {
    axios
      .post(`${host}/user/register`, {
        username,
        password,
        avatar
        // repeatPass
      })
      .then(() => {
        toast.success('Successfully registered');
      })
      .catch(err => {
        toast.error(err);
      });
  },

  login: (username, password) => {
   return axios
    .post(`${host}/user/login`, {
      username,
      password
    })
  },

  logout: () => {
    return axios.post(`${host}/user/logout`);
  }
}

export default userRequester;