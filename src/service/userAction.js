import req from './api'

export function Login(phone, password) {
  return req.post('api/v1/login', {
    data: {
      phone,
      password,
    }
  })
    .then((res) => {
      if (res.status == 400) {
        throw new Error(400);
      }
      return res;
    })
    .then(res => res.json())
    .catch((error) => error)
}

export function Signup(nickname, phone, password) {
  console.log(nickname, phone, password)
  return req.post('api/v1/signup', {
    data: {
      nickname,
      phone,
      password,
    }
  })
    .then((res) => {
      if (res.status == 400) {
        throw new Error(400);
      }
      return res;
    })
    .then(res => res.json())
    .catch((error) => error)
}