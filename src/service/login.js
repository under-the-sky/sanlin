import req from './api'

export function Login(phone, password) {
  console.log(2, phone, password)
  return req.post('api/v1/login', {
    data: {
      phone,
      password,
    }
  })
    .then((res) => {
      console.log(res)
      if (res.status == 400) {
        throw new Error(400);
      }
      return res;
    })
    .then(res => res.json())
    .catch((error) => error)
}