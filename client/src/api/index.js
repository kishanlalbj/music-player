export const BASE_URL = "http://192.168.86.1:5000/api";

export const fetchSongsApi = async () => {
  const res = await fetch(`${BASE_URL}/songs`);
  const data = await res.json();

  return data;
};
