import axios from '../utils/axios';
const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export const fetchSongsApi = async () => {
  const res = await fetch(`${BASE_URL}/songs`);
  const data = await res.json();

  return data;
};

// eslint-disable-next-line no-unused-vars
export const uploadSongApi = async (file) => {
  try {
    const formData = new FormData();
    const name = file.name;

    const exp = new RegExp(/\.mp([0-9]*$)/)

    const formattedName = name.replace(exp, "").replace("-", " ")
    formData.append('name', formattedName)
    formData.append('file', file)

    const res = axios.post('/songs', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

    return res.data

  } catch (error) {
    console.log(error);
  }
};


export const loginApi = async (creds) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email: creds.email, password: creds.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })    

    const data = await res.json();

    if(res.ok) {
      localStorage.setItem('musico_token', data.token)

      return data
    } else {
      throw new Error("Something went wrong")
    }


  } catch (error) {
    console.log(error)
  }
}


export const getCurrentUserApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/current-user`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('musico_token')}`
    }
  })
  const data = await res.json();

  if(res.ok) {
    return data
  } else {
   return new Error(data.message)
  }


}