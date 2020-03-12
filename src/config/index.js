import axios from "axios";

const setHeader = () => {
  return {
    headers: { secret_token: localStorage.getItem("secret_key") }
  };
};

export const BaseUrl = "https://backend-onlinestore-100.herokuapp.com/";

export const Post = (path, body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseUrl + path, body, setHeader())
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const Get = path => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseUrl + path, setHeader())
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const Delete = path => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseUrl + path, setHeader())
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const Put = (path, body) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseUrl + path, body, setHeader())
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
