import { api } from "../utils";

export const BASE_URL = "/api";

export const fetchAllSongsApi = async () => {
  try {
    const res = await api.get(`${BASE_URL}/songs`);

    return res.data.results;
  } catch (error) {
    throw new Error("Error Fetching songs");
  }
};

export const loginApi = async (creds) => {
  try {
    const res = await api.post("/api/auth/login", creds);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerApi = async (data) => {
  try {
    const res = await api.post("/api/auth/register", data);

    return res.data;
  } catch (error) {
    throw new Error("Error registering user");
  }
};

export const uploadSongApi = async ({ file, onSuccess }) => {
  try {
    const formData = new FormData();

    console.log("API", file);
    console.log("NAME", file.name);

    formData.append("name", file.name);
    formData.append("file", file, file.name);

    const res = await fetch(`${BASE_URL}/songs`, {
      method: "POST",
      body: formData
    });

    await res.json();

    onSuccess("ok");
  } catch (error) {
    console.log(error);
  }
};
