import axios from 'axios';

const handleHeader = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

handleHeader.interceptors.request.use(config => {
  const access_token = window.localStorage.getItem("access_token");
  console.log("inside handleheader")
  if (access_token) {
    config.headers = Object.assign({
      Authorization: `Bearer ${access_token}`
    }, config.headers)
  }

  return config;
});

export default handleHeader;
