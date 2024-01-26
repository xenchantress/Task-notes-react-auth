import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-react-auth.herokuapp.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.get('/some-endpoint')
  .then(response => {
  })
  .catch(error => {
  });

  instance.post('/another-endpoint', { data: 'some data' })
  .then(response => {
  })
  .catch(error => {
  });

  export default instance;