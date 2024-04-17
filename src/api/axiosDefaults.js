import axios from "axios";

axios.defaults.baseURL = "https://greenthumb-back-4bd145d8f205.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;